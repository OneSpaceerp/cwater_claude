'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { fileExtension, isAllowedUpload, MAX_FILES, MAX_FILE_BYTES } from '@/lib/leads';
import { t, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Form primitives.
 *
 * Every field is explicitly labelled, errors are announced through
 * `aria-describedby` and `aria-invalid`, and the required marker is a word
 * rather than an asterisk so it reads correctly to a screen reader in both
 * languages.
 */

function Label({
  htmlFor,
  children,
  required,
  locale,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  locale: Locale;
  hint?: string;
}) {
  return (
    <span className="mb-2 flex flex-wrap items-baseline gap-x-2.5">
      <label htmlFor={htmlFor} className="text-[0.875rem] font-medium text-white">
        {children}
      </label>
      <span className="u-label text-ink-400">
        {required ? t(D.form.required, locale) : t(D.form.optional, locale)}
      </span>
      {hint ? <span className="w-full text-[0.8125rem] leading-snug text-ink-400">{hint}</span> : null}
    </span>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="mt-2 flex items-start gap-2 text-[0.8125rem] text-alert-400">
      <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-alert-500" />
      {message}
    </span>
  );
}

const inputBase =
  'w-full rounded-sm border bg-ink-950/60 px-3.5 py-3 text-[0.9375rem] text-white outline-none transition-colors ' +
  'placeholder:text-ink-600 focus-visible:border-signal-400';

export function TextField({
  label,
  value,
  onChange,
  locale,
  required,
  error,
  type = 'text',
  placeholder,
  hint,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  locale: Locale;
  required?: boolean;
  error?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} required={required} locale={locale} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputBase, error ? 'border-alert-500' : 'border-white/15 hover:border-white/30')}
      />
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  locale,
  required,
  error,
  rows = 5,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  locale: Locale;
  required?: boolean;
  error?: string;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} required={required} locale={locale} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputBase, 'resize-y', error ? 'border-alert-500' : 'border-white/15 hover:border-white/30')}
      />
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  locale,
  required,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: { value: string; label: string }[];
  locale: Locale;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} required={required} locale={locale}>
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputBase, error ? 'border-alert-500' : 'border-white/15 hover:border-white/30')}
      >
        <option value="">{placeholder ?? '—'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

/** A group of toggleable options rendered as an accessible checkbox/radio set. */
export function ChoiceGroup({
  legend,
  options,
  selected,
  onToggle,
  locale,
  multiple = true,
  required,
  error,
}: {
  legend: string;
  options: { value: string; label: string; icon?: Parameters<typeof Icon>[0]['name'] }[];
  selected: string[];
  onToggle: (value: string) => void;
  locale: Locale;
  multiple?: boolean;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="mb-1 text-[0.875rem] font-medium text-white">{legend}</legend>
      <p className="mb-4 text-[0.8125rem] text-ink-400">
        {multiple ? t(D.form.selectAllThatApply, locale) : t(D.form.selectOne, locale)}
        {required ? ` · ${t(D.form.required, locale)}` : ''}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={isSelected}
              onClick={() => onToggle(option.value)}
              className={cn(
                'flex items-center gap-2.5 rounded-sm border px-3.5 py-2.5 text-[0.875rem] transition-colors duration-250',
                isSelected
                  ? 'border-signal-400 bg-signal-500/14 text-white'
                  : 'border-white/14 text-ink-200 hover:border-white/34 hover:text-white',
              )}
            >
              {option.icon ? (
                <Icon name={option.icon} size={17} className={isSelected ? 'text-signal-300' : 'text-ink-400'} />
              ) : null}
              {option.label}
            </button>
          );
        })}
      </div>
      <ErrorText id={errorId} message={error} />
    </fieldset>
  );
}

export function ConsentCheckbox({
  checked,
  onChange,
  locale,
  error,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  locale: Locale;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-signal-500)]"
        />
        <label htmlFor={id} className="text-[0.875rem] leading-relaxed text-ink-200">
          {t(D.form.consent, locale)}
        </label>
      </div>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

/** Attachment field with client-side type and size checks. */
export function FileField({
  files,
  onChange,
  locale,
  error,
}: {
  files: File[];
  onChange: (next: File[]) => void;
  locale: Locale;
  error?: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const add = (incoming: FileList | null) => {
    if (!incoming) return;
    const accepted: File[] = [...files];
    let message: string | null = null;

    for (const file of Array.from(incoming)) {
      if (accepted.length >= MAX_FILES) {
        message = t(D.form.errors.tooManyFiles, locale);
        break;
      }
      if (!isAllowedUpload(file.name, file.type)) {
        message = t(D.form.errors.fileType, locale);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        message = t(D.form.errors.fileSize, locale);
        continue;
      }
      accepted.push(file);
    }

    setLocalError(message);
    onChange(accepted);
    if (inputRef.current) inputRef.current.value = '';
  };

  const shown = error ?? localError ?? undefined;

  return (
    <div>
      <Label htmlFor={id} locale={locale} hint={t(D.form.attachmentsHelp, locale)}>
        {t(D.form.attachments, locale)}
      </Label>
      <input
        ref={inputRef}
        id={id}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
        onChange={(e) => add(e.target.files)}
        aria-invalid={shown ? true : undefined}
        className="block w-full text-[0.875rem] text-ink-300 file:me-4 file:rounded-sm file:border file:border-white/20 file:bg-transparent file:px-4 file:py-2.5 file:text-[0.875rem] file:font-medium file:text-white hover:file:border-signal-400"
      />

      {files.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center gap-3 border border-white/12 px-3.5 py-2.5">
              <Icon name="clipboard" size={16} className="shrink-0 text-signal-400" />
              <span className="min-w-0 flex-1 truncate text-[0.875rem] text-ink-100">{file.name}</span>
              <span className="u-label shrink-0 text-ink-400">{fileExtension(file.name)}</span>
              <span className="tnum shrink-0 font-mono text-[0.6875rem] text-ink-400">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, index) => index !== i))}
                aria-label={`${t(D.form.removeFile, locale)}: ${file.name}`}
                className="shrink-0 rounded-sm p-1 text-ink-400 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path d="m4 4 8 8M12 4l-8 8" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <ErrorText id={`${id}-error`} message={shown} />
    </div>
  );
}

/** Error summary announced when a step fails validation. */
export function ErrorSummary({
  errors,
  locale,
}: {
  errors: Record<string, string | undefined>;
  locale: Locale;
}) {
  const list = Object.entries(errors).filter(([, message]) => Boolean(message));
  if (list.length === 0) return null;
  return (
    <div role="alert" className="border border-alert-500/40 bg-alert-500/10 p-4">
      <p className="text-[0.875rem] font-medium text-white">{t(D.form.errorSummary, locale)}</p>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {list.map(([field, message]) => (
          <li key={field} className="flex items-start gap-2 text-[0.8125rem] text-ink-200">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-alert-500" />
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
