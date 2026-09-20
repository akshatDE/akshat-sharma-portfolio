"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes earns its place here: it writes the theme class before first
 * paint via an inline script, which is what prevents the white flash on a dark
 * reload. Reimplementing that correctly is more code than the dependency.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
