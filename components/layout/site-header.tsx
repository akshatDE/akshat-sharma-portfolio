import Link from "next/link";
import { profile, socialLinks } from "@/data/profile";
import { SocialIcon } from "@/components/ui/social-icon";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

/**
 * Server component. Only the three interactive pieces — nav highlighting,
 * the mobile panel and the theme toggle — ship JavaScript.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-sm font-medium tracking-tight text-fg transition-opacity hover:opacity-70"
        >
          {profile.name}
          <span className="ml-2 hidden font-mono text-[0.6875rem] font-normal text-fg-subtle sm:inline lg:hidden xl:inline">
            {profile.title}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLinks />

          <span
            className="mx-2 hidden h-4 w-px bg-border lg:block"
            aria-hidden="true"
          />

          <ul className="hidden items-center gap-0.5 sm:flex">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
                >
                  <SocialIcon name={link.icon} />
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
