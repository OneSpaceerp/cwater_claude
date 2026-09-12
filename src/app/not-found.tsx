import Link from 'next/link';
import './globals.css';

/** Root-level 404 for paths outside any locale segment. */
export default function NotFound() {
  return (
    <html lang="en">
      <body className="theme-dark flex min-h-screen items-center justify-center bg-ink-950 px-6">
        <div className="max-w-md text-center">
          <p className="u-label text-signal-300">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white">
            That page could not be found.
          </h1>
          <p className="mt-3 text-ink-300">
            The address may have changed. Start from the homepage, or search for what you need.
          </p>
          <Link
            href="/en"
            className="mt-7 inline-flex h-11 items-center rounded-full bg-signal-400 px-7 text-[0.9375rem] font-semibold text-signal-950 transition-colors hover:bg-signal-300"
          >
            Go to C-Water
          </Link>
        </div>
      </body>
    </html>
  );
}
