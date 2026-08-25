<?php
/**
 * C-Water — lead intake.
 *
 * The site is a static export, so this is the only server-side code in the
 * deployment. It replaces the Next.js route handler used on a Node host and
 * mirrors its rules exactly: the same field constraints, the same upload
 * policy, the same rate limit, the same honeypot behaviour and the same JSON
 * response shape, so nothing in the browser had to change beyond the URL.
 *
 * Requires PHP 7.4+ (cPanel's default is newer). No Composer, no extensions
 * beyond the standard build.
 *
 * ---------------------------------------------------------------------------
 * Addresses below were written by scripts/build-deploy.mjs for the "staging"
 * target. To change them, edit deploy.targets.json and rebuild — editing this
 * copy works, but the next deploy overwrites it.
 * ---------------------------------------------------------------------------
 */

/* ========================================================================== *
 *  CONFIGURATION
 * ========================================================================== */

/**
 * Where enquiries are delivered.
 *
 * Two inboxes, routed by what the enquiry actually is:
 *
 *   COMMERCIAL  quote requests, sales enquiries, general enquiries
 *   TECHNICAL   solution requests, engineer enquiries, support enquiries
 *
 * Both currently point at the published company address. Replace them with the
 * real sales and engineering inboxes before going live — until then every
 * enquiry lands in one place.
 */
const LEAD_TO_COMMERCIAL = 'info@cw-eg.com';
const LEAD_TO_TECHNICAL  = 'info@cw-eg.com';

/** Optional: addresses copied on every enquiry. Leave empty to disable. */
const LEAD_CC = '';

/**
 * The From address.
 *
 * MUST be a mailbox on this domain. Sending as the visitor's own address makes
 * the message fail SPF/DKIM and land in spam — the visitor's address goes in
 * Reply-To instead, so hitting Reply in the mail client still works.
 *
 * Create this mailbox in cPanel → Email Accounts before going live.
 */
const LEAD_FROM_EMAIL = 'website@nsd-eg.com';
const LEAD_FROM_NAME  = 'C-Water Website';

/**
 * Private storage directory for submissions and attachments.
 *
 * Defaults to a sibling of the document root, which on a standard cPanel
 * account means /home/<user>/cwater-leads — outside public_html, so nothing
 * here is reachable over the web. Set an absolute path to override.
 */
const LEAD_STORAGE_DIR = '';

/** Attachments are emailed when the batch is under this size; always stored. */
const MAIL_ATTACH_LIMIT_BYTES = 8 * 1024 * 1024; // 8 MB

/* ========================================================================== *
 *  POLICY — mirrors src/lib/leads.ts. Change both or neither.
 * ========================================================================== */

const MAX_FILE_BYTES = 10485760; // 10 MB
const MAX_FILES      = 5;
const RATE_WINDOW    = 60;       // seconds
const RATE_MAX       = 5;        // submissions per window per IP

/** Extension => MIME types the browser may legitimately declare for it. */
function allowed_file_types(): array {
    return [
        'pdf'  => ['application/pdf'],
        'jpg'  => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png'  => ['image/png'],
        'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        'xlsx' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ];
}

/** What finfo actually reports for those formats. DOCX/XLSX are ZIP containers. */
function sniffed_file_types(): array {
    return [
        'pdf'  => ['application/pdf'],
        'jpg'  => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png'  => ['image/png'],
        'docx' => ['application/zip', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        'xlsx' => ['application/zip', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ];
}

/* --------------------------------------------------------------------------
 * mbstring is present on every current cPanel build, but a missing extension
 * would fatal the script rather than degrade it — and a fatal error on a form
 * endpoint loses the enquiry silently. These fall back to byte semantics,
 * which are stricter for Arabic input, never looser.
 * ------------------------------------------------------------------------ */
if (!function_exists('mb_strlen')) {
    function mb_strlen($value, $encoding = null) { return strlen((string) $value); }
}
if (!function_exists('mb_substr')) {
    function mb_substr($value, $start, $length = null, $encoding = null) {
        return $length === null ? substr((string) $value, $start) : substr((string) $value, $start, $length);
    }
}

/* ========================================================================== *
 *  Response helpers
 * ========================================================================== */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(int $status, string $error, array $extra = []): void {
    respond($status, array_merge(['ok' => false, 'error' => $error], $extra));
}

/* ========================================================================== *
 *  Method and size guards
 * ========================================================================== */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method_not_allowed');
}

/*
 * When the upload exceeds php.ini's post_max_size, PHP discards the whole body
 * and hands the script an empty $_POST with no warning. Detecting it here turns
 * a baffling "missing_payload" into an honest size error.
 */
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
$postMax = ini_bytes(ini_get('post_max_size'));
if ($postMax > 0 && $contentLength > $postMax && empty($_POST)) {
    fail(413, 'file_too_large');
}

/* ========================================================================== *
 *  Rate limit
 * ========================================================================== */

$ip = client_ip();
if (rate_limited($ip)) {
    header('Retry-After: 60');
    fail(429, 'rate_limited');
}

/* ========================================================================== *
 *  Payload
 * ========================================================================== */

$rawPayload = $_POST['payload'] ?? null;
if (!is_string($rawPayload) || $rawPayload === '') {
    fail(400, 'missing_payload');
}

$lead = json_decode($rawPayload, true);
if (json_last_error() !== JSON_ERROR_NONE || !is_array($lead)) {
    fail(400, 'invalid_json');
}

$issues = validate_lead($lead);
if (!empty($issues)) {
    fail(422, 'validation_failed', ['issues' => $issues]);
}

$kind = $lead['kind'];

/*
 * Honeypot. A real visitor never fills this field. Respond exactly as a
 * successful submission would, so a bot cannot tell the trap fired.
 */
if (!empty($lead['website'])) {
    respond(200, ['ok' => true, 'reference' => reference_for($kind)]);
}

/* ========================================================================== *
 *  Attachments
 * ========================================================================== */

$files = normalise_uploads($_FILES['files'] ?? null);

if (count($files) > MAX_FILES) {
    fail(422, 'too_many_files');
}

foreach ($files as $file) {
    if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
        fail(422, 'file_too_large', ['file' => $file['name']]);
    }
    if ($file['error'] !== UPLOAD_ERR_OK) {
        fail(400, 'upload_failed', ['file' => $file['name']]);
    }
    if ($file['size'] > MAX_FILE_BYTES) {
        fail(422, 'file_too_large', ['file' => $file['name']]);
    }
    if (!is_uploaded_file($file['tmp_name'])) {
        fail(400, 'upload_failed', ['file' => $file['name']]);
    }
    if (!is_allowed_upload($file['name'], $file['type'], $file['tmp_name'])) {
        fail(422, 'unsupported_file_type', ['file' => $file['name']]);
    }
}

/* ========================================================================== *
 *  Store, then deliver
 * ========================================================================== */

$reference = reference_for($kind);
$storage   = storage_dir();
$stored    = [];

if ($storage !== null) {
    foreach ($files as $i => $file) {
        $safe = safe_filename($file['name']);
        $target = $storage . '/attachments/' . $reference . '-' . ($i + 1) . '-' . $safe;
        if (move_uploaded_file($file['tmp_name'], $target)) {
            $stored[] = ['path' => $target, 'name' => $file['name'], 'size' => $file['size']];
        }
    }
    /* The submission log is the safety net: if mail() is misconfigured, no
       enquiry is lost — it is on disk, one JSON object per line. */
    append_log($storage, [
        'reference' => $reference,
        'at'        => gmdate('c'),
        'ip'        => $ip,
        'lead'      => $lead,
        'files'     => array_map(static fn($f) => basename($f['path']), $stored),
    ]);
}

$recipient = route_for($lead);
$sent = send_lead_mail($recipient, $reference, $lead, $stored, count($files));

if (!$sent && $storage !== null) {
    /* Delivery failed but the enquiry is safely on disk. Reporting an error
       here would only make the visitor submit again. */
    append_log($storage, [
        'reference' => $reference,
        'at'        => gmdate('c'),
        'event'     => 'MAIL_FAILED',
        'recipient' => $recipient,
    ]);
}

if (!$sent && $storage === null) {
    /* Nothing was delivered and nothing was written. This is a real failure. */
    fail(500, 'delivery_failed');
}

respond(200, ['ok' => true, 'reference' => $reference]);

/* ========================================================================== *
 *  Validation — mirrors the Zod schemas in src/lib/leads.ts
 * ========================================================================== */

/**
 * Returns a map of field => [messages]. An empty map means the lead is valid.
 * The shape matches Zod's `flatten().fieldErrors` so the client handles both
 * identically.
 */
function validate_lead(array $lead): array {
    $issues = [];

    $add = static function (string $field, string $message) use (&$issues): void {
        $issues[$field][] = $message;
    };

    $kind = $lead['kind'] ?? null;
    if (!in_array($kind, ['solution', 'quote', 'contact'], true)) {
        return ['kind' => ['invalid']];
    }

    /* ---- Shared contact block ---- */
    check_string($lead, 'name', 2, 120, true, $add);
    check_string($lead, 'company', 1, 160, true, $add);
    check_string($lead, 'jobTitle', 0, 120, false, $add);
    check_string($lead, 'country', 0, 80, false, $add);
    check_string($lead, 'city', 0, 80, false, $add);

    $email = trim((string) ($lead['email'] ?? ''));
    if ($email === '' || mb_strlen($email) > 200 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $add('email', 'invalid');
    }

    $phone = trim((string) ($lead['phone'] ?? ''));
    if ($phone !== '') {
        if (mb_strlen($phone) > 40 || !preg_match('/^[+()\d\s.\-]{6,24}$/u', $phone)) {
            $add('phone', 'invalid');
        }
    }

    if (($lead['consent'] ?? null) !== true) {
        $add('consent', 'required');
    }

    if (!in_array($lead['locale'] ?? null, ['en', 'ar'], true)) {
        $add('locale', 'invalid');
    }

    /* The honeypot is deliberately permissive — see the note in leads.ts. */
    if (isset($lead['website']) && mb_strlen((string) $lead['website']) > 200) {
        $add('website', 'too_long');
    }

    /* ---- Per-kind ---- */
    if ($kind === 'solution') {
        check_tags($lead, 'needs', 1, 10, $add);
        check_tags($lead, 'problems', 0, 12, $add);
        check_tags($lead, 'objectives', 0, 12, $add);
        check_string($lead, 'systemType', 0, 80, false, $add);
        check_string($lead, 'systemDetail', 0, 4000, false, $add);
        check_string($lead, 'industry', 0, 80, false, $add);
        check_string($lead, 'projectStage', 0, 80, false, $add);
        check_string($lead, 'requiredBy', 0, 40, false, $add);
        check_string($lead, 'message', 0, 4000, false, $add);
    } elseif ($kind === 'quote') {
        $items = $lead['items'] ?? [];
        if (!is_array($items) || count($items) > 30) {
            $add('items', 'invalid');
        } else {
            foreach ($items as $item) {
                if (!is_array($item)
                    || mb_strlen((string) ($item['slug'] ?? '')) > 80
                    || mb_strlen((string) ($item['name'] ?? '')) > 160) {
                    $add('items', 'invalid');
                    break;
                }
                $qty = $item['quantity'] ?? 1;
                if (!is_numeric($qty) || (int) $qty < 1 || (int) $qty > 9999) {
                    $add('items', 'invalid');
                    break;
                }
            }
        }
        check_string($lead, 'application', 0, 120, false, $add);
        check_string($lead, 'industry', 0, 80, false, $add);
        check_string($lead, 'projectStage', 0, 80, false, $add);
        check_string($lead, 'requiredBy', 0, 40, false, $add);
        check_string($lead, 'message', 0, 4000, false, $add);
    } else {
        if (!in_array($lead['intent'] ?? null, ['sales', 'engineer', 'support', 'general'], true)) {
            $add('intent', 'invalid');
        }
        check_string($lead, 'message', 10, 4000, true, $add);
    }

    return $issues;
}

function check_string(array $lead, string $field, int $min, int $max, bool $required, callable $add): void {
    $value = $lead[$field] ?? '';
    if (!is_string($value)) {
        $add($field, 'invalid');
        return;
    }
    $value = trim($value);
    if ($value === '') {
        if ($required) $add($field, 'required');
        return;
    }
    $length = mb_strlen($value);
    if ($length < $min) $add($field, 'too_short');
    if ($length > $max) $add($field, 'too_long');
}

function check_tags(array $lead, string $field, int $min, int $max, callable $add): void {
    $value = $lead[$field] ?? [];
    if (!is_array($value) || count($value) < $min || count($value) > $max) {
        $add($field, 'invalid');
        return;
    }
    foreach ($value as $tag) {
        if (!is_string($tag) || mb_strlen($tag) > 60) {
            $add($field, 'invalid');
            return;
        }
    }
}

/* ========================================================================== *
 *  Uploads
 * ========================================================================== */

/**
 * PHP delivers `files[]` as parallel arrays rather than a list of files.
 * Transposes it into one record per file, and tolerates a single-file post.
 */
function normalise_uploads($entry): array {
    if (!is_array($entry) || !isset($entry['name'])) return [];

    if (!is_array($entry['name'])) {
        return $entry['error'] === UPLOAD_ERR_NO_FILE ? [] : [$entry];
    }

    $out = [];
    foreach ($entry['name'] as $i => $name) {
        if (($entry['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) continue;
        $out[] = [
            'name'     => (string) $name,
            'type'     => (string) ($entry['type'][$i] ?? ''),
            'tmp_name' => (string) ($entry['tmp_name'][$i] ?? ''),
            'error'    => (int) ($entry['error'][$i] ?? UPLOAD_ERR_NO_FILE),
            'size'     => (int) ($entry['size'][$i] ?? 0),
        ];
    }
    return $out;
}

function file_extension(string $name): string {
    $parts = explode('.', strtolower($name));
    return count($parts) > 1 ? array_pop($parts) : '';
}

/**
 * Three checks, all of which must pass: the extension is on the list, the MIME
 * type the browser declared agrees with it, and — where the server can sniff —
 * the actual bytes agree too. Trusting any one of the three alone is how a
 * renamed executable gets through.
 */
function is_allowed_upload(string $name, string $mime, string $tmpPath): bool {
    $ext = file_extension($name);
    $allowed = allowed_file_types();
    if (!isset($allowed[$ext])) return false;

    if ($mime === '') {
        /* Some browsers send no type for Office documents. */
        if ($ext !== 'docx' && $ext !== 'xlsx') return false;
    } elseif (!in_array($mime, $allowed[$ext], true)) {
        return false;
    }

    if (function_exists('finfo_open') && is_readable($tmpPath)) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo !== false) {
            $sniffed = finfo_file($finfo, $tmpPath);
            finfo_close($finfo);
            $expected = sniffed_file_types()[$ext];
            if (is_string($sniffed) && !in_array($sniffed, $expected, true)) return false;
        }
    }

    return true;
}

function safe_filename(string $name): string {
    $name = basename($name);
    $name = preg_replace('/[^A-Za-z0-9._-]+/', '_', $name) ?? 'file';
    $name = ltrim($name, '.');
    if ($name === '') $name = 'file';
    return mb_substr($name, 0, 80);
}

/* ========================================================================== *
 *  Storage
 * ========================================================================== */

/** Creates the private storage directory on first use. Null if unavailable. */
function storage_dir(): ?string {
    $base = LEAD_STORAGE_DIR !== ''
        ? LEAD_STORAGE_DIR
        : dirname(rtrim($_SERVER['DOCUMENT_ROOT'] ?? __DIR__, '/')) . '/cwater-leads';

    foreach ([$base, $base . '/attachments'] as $dir) {
        if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) return null;
    }
    if (!is_writable($base)) return null;

    /* If the host ignores the path and the directory ends up inside the web
       root anyway, this keeps Apache from serving it. */
    $guard = $base . '/.htaccess';
    if (!file_exists($guard)) {
        @file_put_contents($guard, "Require all denied\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
    }

    return $base;
}

function append_log(string $storage, array $record): void {
    $line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($line === false) return;
    @file_put_contents($storage . '/leads.jsonl', $line . "\n", FILE_APPEND | LOCK_EX);
}

/* ========================================================================== *
 *  Rate limit
 * ========================================================================== */

function client_ip(): string {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'] as $key) {
        $value = $_SERVER[$key] ?? '';
        if ($value === '') continue;
        $first = trim(explode(',', $value)[0]);
        if (filter_var($first, FILTER_VALIDATE_IP)) return $first;
    }
    return 'unknown';
}

/**
 * A sliding window kept in a per-IP file under the system temp directory.
 * Enough to stop casual abuse of a public form; it is not a defence against a
 * distributed flood, which belongs at the host level.
 */
function rate_limited(string $ip): bool {
    $dir = sys_get_temp_dir() . '/cwater-rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) return false;

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now  = time();

    $recent = [];
    if (is_readable($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $recent = array_values(array_filter(
                $decoded,
                static fn($ts) => is_int($ts) && ($now - $ts) < RATE_WINDOW,
            ));
        }
    }

    $recent[] = $now;
    @file_put_contents($file, json_encode($recent), LOCK_EX);

    /* Opportunistic cleanup so the directory does not accumulate stale files. */
    if (random_int(1, 50) === 1) {
        foreach ((array) glob($dir . '/*.json') as $stale) {
            if (is_string($stale) && @filemtime($stale) < $now - 3600) @unlink($stale);
        }
    }

    return count($recent) > RATE_MAX;
}

/* ========================================================================== *
 *  Delivery
 * ========================================================================== */

/** Commercial enquiries to one inbox, technical to the other. */
function route_for(array $lead): string {
    if ($lead['kind'] === 'solution') return LEAD_TO_TECHNICAL;
    if ($lead['kind'] === 'quote') return LEAD_TO_COMMERCIAL;

    $intent = $lead['intent'] ?? 'general';
    if ($intent === 'engineer' || $intent === 'support') return LEAD_TO_TECHNICAL;
    return LEAD_TO_COMMERCIAL;
}

function reference_for(string $kind): string {
    $prefix = $kind === 'quote' ? 'RFQ' : ($kind === 'solution' ? 'SOL' : 'ENQ');
    $stamp  = gmdate('ymd');
    $chars  = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $random = '';
    for ($i = 0; $i < 4; $i++) $random .= $chars[random_int(0, 35)];
    return $prefix . '-' . $stamp . '-' . $random;
}

function encode_header(string $value): string {
    return preg_match('/[^\x20-\x7E]/', $value)
        ? '=?UTF-8?B?' . base64_encode($value) . '?='
        : $value;
}

function send_lead_mail(string $to, string $reference, array $lead, array $stored, int $uploaded = 0): bool {
    $kindLabel = ['solution' => 'Solution request', 'quote' => 'Quote request', 'contact' => 'Enquiry'][$lead['kind']];
    $subject = sprintf('[%s] %s — %s', $reference, $kindLabel, (string) $lead['company']);

    $body = build_lead_body($reference, $lead, $stored, $uploaded);

    $attachTotal = array_sum(array_column($stored, 'size'));
    $attach = $attachTotal > 0 && $attachTotal <= MAIL_ATTACH_LIMIT_BYTES ? $stored : [];

    $boundary = 'cw' . bin2hex(random_bytes(12));

    $headers = [
        'MIME-Version: 1.0',
        'From: ' . encode_header(LEAD_FROM_NAME) . ' <' . LEAD_FROM_EMAIL . '>',
        'Reply-To: ' . encode_header((string) $lead['name']) . ' <' . $lead['email'] . '>',
        'X-C-Water-Reference: ' . $reference,
        'X-Mailer: C-Water website',
    ];
    if (LEAD_CC !== '') $headers[] = 'Cc: ' . LEAD_CC;

    if (empty($attach)) {
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $headers[] = 'Content-Transfer-Encoding: base64';
        $message = chunk_split(base64_encode($body));
    } else {
        $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
        $message = "This is a multi-part message in MIME format.\r\n\r\n";
        $message .= '--' . $boundary . "\r\n";
        $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $message .= chunk_split(base64_encode($body)) . "\r\n";

        foreach ($attach as $file) {
            $data = @file_get_contents($file['path']);
            if ($data === false) continue;
            $name = safe_filename($file['name']);
            $message .= '--' . $boundary . "\r\n";
            $message .= 'Content-Type: application/octet-stream; name="' . $name . "\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= 'Content-Disposition: attachment; filename="' . $name . "\"\r\n\r\n";
            $message .= chunk_split(base64_encode($data)) . "\r\n";
        }
        $message .= '--' . $boundary . "--\r\n";
    }

    /* -f sets the envelope sender, which is what most shared hosts check
       before handing the message to the outside world. */
    return @mail(
        $to,
        encode_header($subject),
        $message,
        implode("\r\n", $headers),
        '-f' . LEAD_FROM_EMAIL,
    );
}

function build_lead_body(string $reference, array $lead, array $stored, int $uploaded = 0): string {
    $lines = [];
    $row = static function (string $label, $value) use (&$lines): void {
        if ($value === null || $value === '' || $value === []) return;
        if (is_array($value)) $value = implode(', ', $value);
        $lines[] = str_pad($label . ':', 16) . $value;
    };

    $lines[] = 'C-WATER WEBSITE ENQUIRY';
    $lines[] = str_repeat('=', 60);
    $row('Reference', $reference);
    $row('Type', $lead['kind']);
    $row('Received', gmdate('Y-m-d H:i') . ' UTC');
    $row('Language', $lead['locale'] === 'ar' ? 'Arabic' : 'English');
    $lines[] = '';

    $lines[] = 'CONTACT';
    $lines[] = str_repeat('-', 60);
    $row('Name', $lead['name'] ?? '');
    $row('Job title', $lead['jobTitle'] ?? '');
    $row('Company', $lead['company'] ?? '');
    $row('Email', $lead['email'] ?? '');
    $row('Phone', $lead['phone'] ?? '');
    $row('City', $lead['city'] ?? '');
    $row('Country', $lead['country'] ?? '');
    $lines[] = '';

    $lines[] = 'REQUEST';
    $lines[] = str_repeat('-', 60);

    if ($lead['kind'] === 'solution') {
        $row('Needs', $lead['needs'] ?? []);
        $row('System type', $lead['systemType'] ?? '');
        $row('Problems', $lead['problems'] ?? []);
        $row('Objectives', $lead['objectives'] ?? []);
        $row('Industry', $lead['industry'] ?? '');
        $row('Stage', $lead['projectStage'] ?? '');
        $row('Required by', $lead['requiredBy'] ?? '');
        if (!empty($lead['systemDetail'])) {
            $lines[] = '';
            $lines[] = 'System detail:';
            $lines[] = $lead['systemDetail'];
        }
    } elseif ($lead['kind'] === 'quote') {
        $row('Application', $lead['application'] ?? '');
        $row('Industry', $lead['industry'] ?? '');
        $row('Stage', $lead['projectStage'] ?? '');
        $row('Required by', $lead['requiredBy'] ?? '');
        if (!empty($lead['items'])) {
            $lines[] = '';
            $lines[] = 'Items:';
            foreach ($lead['items'] as $item) {
                $lines[] = sprintf(
                    '  %s x %s  (%s)',
                    (int) ($item['quantity'] ?? 1),
                    (string) ($item['name'] ?? ''),
                    (string) ($item['slug'] ?? ''),
                );
            }
        }
    } else {
        $row('Intent', $lead['intent'] ?? '');
    }

    if (!empty($lead['message'])) {
        $lines[] = '';
        $lines[] = 'Message:';
        $lines[] = $lead['message'];
    }

    $lines[] = '';
    $lines[] = 'ATTACHMENTS';
    $lines[] = str_repeat('-', 60);
    if (empty($stored)) {
        /* Files can be uploaded and still not stored — an unwritable storage
           directory is the usual cause. Saying "none" there would hide it. */
        $lines[] = $uploaded > 0
            ? sprintf('%d file(s) were uploaded but COULD NOT BE SAVED. Ask the sender to resend them.', $uploaded)
            : 'None.';
    } else {
        foreach ($stored as $file) {
            $lines[] = sprintf('  %s  (%s KB)  stored as %s',
                $file['name'], number_format($file['size'] / 1024, 0), basename($file['path']));
        }
        $lines[] = '';
        $lines[] = 'Files are also kept on the server outside the web root.';
    }

    $lines[] = '';
    $lines[] = str_repeat('=', 60);
    $lines[] = 'Sent by the C-Water website. Reply to this message to answer the sender.';

    return implode("\r\n", $lines);
}

/* ========================================================================== *
 *  Misc
 * ========================================================================== */

/** Converts a php.ini shorthand size ("8M", "512K") to bytes. */
function ini_bytes($value): int {
    $value = trim((string) $value);
    if ($value === '') return 0;
    $unit = strtolower(substr($value, -1));
    $number = (int) $value;
    switch ($unit) {
        case 'g': return $number * 1024 * 1024 * 1024;
        case 'm': return $number * 1024 * 1024;
        case 'k': return $number * 1024;
        default:  return $number;
    }
}
