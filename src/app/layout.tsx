import type { ReactNode } from 'react';
import './globals.css';

/**
 * Root layout.
 *
 * Deliberately minimal: <html> and <body> are emitted by the locale layout so
 * that `lang` and `dir` are set from the route segment rather than patched on
 * the client. This root only carries the global stylesheet.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
