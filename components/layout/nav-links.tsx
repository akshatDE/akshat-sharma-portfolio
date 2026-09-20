"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors",
                  active
                    ? "text-fg"
                    : "text-fg-muted hover:bg-bg-muted hover:text-fg",
                )}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-2 -bottom-px h-px bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
