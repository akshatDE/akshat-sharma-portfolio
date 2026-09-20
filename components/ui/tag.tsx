import { cn } from "@/lib/utils";

/** Monospace chip used for technologies and metadata. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[0.6875rem] tracking-tight text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({
  items,
  className,
  limit,
}: {
  items: readonly string[];
  className?: string;
  /** Truncate with a "+N" chip; useful on dense cards. */
  limit?: number;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  const overflow = limit ? items.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {overflow > 0 && (
        <li>
          <Tag className="text-fg-subtle">+{overflow}</Tag>
        </li>
      )}
    </ul>
  );
}
