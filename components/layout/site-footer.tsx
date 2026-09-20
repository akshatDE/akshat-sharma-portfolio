import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { primaryNav } from "@/data/navigation";
import { profile, socialLinks } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-bg-subtle">
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-medium text-fg">{profile.name}</p>
            <p className="mt-1 font-mono text-xs text-fg-subtle">
              {profile.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Building data platforms and agentic AI systems. Open to
              conversations about either.
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <div>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle">
                Pages
              </h2>
              <ul className="mt-4 space-y-2.5">
                {primaryNav.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle">
                Elsewhere
              </h2>
              <ul className="mt-4 space-y-2.5">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.icon === "mail" ? undefined : "_blank"}
                      rel={
                        link.icon === "mail" ? undefined : "noopener noreferrer"
                      }
                      className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <SocialIcon name={link.icon} className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-fg-subtle">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-xs text-fg-subtle">
            Next.js · TypeScript · Tailwind CSS · Vercel
          </p>
        </div>
      </Container>
    </footer>
  );
}
