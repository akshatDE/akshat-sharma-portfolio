import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-fg/88",
  secondary:
    "border border-border bg-bg text-fg hover:border-border-strong hover:bg-bg-muted",
  ghost: "text-fg-muted hover:text-fg",
};

/**
 * One link primitive for every call to action. External links get the correct
 * rel attributes automatically so no call site has to remember them.
 */
export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
