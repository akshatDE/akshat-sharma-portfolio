import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo tile for an external project.
 *
 * The source marks ship with their own background baked in, so this renders a
 * fixed tile with a hairline border rather than trying to make the artwork
 * adapt to the theme — the same treatment an app icon gets.
 */
export function ProjectLogo({
  src,
  name,
  size = 44,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={size * 2}
      height={size * 2}
      sizes={`${size}px`}
      style={{ width: size, height: size }}
      className={cn(
        "shrink-0 rounded-xl border border-border object-cover",
        className,
      )}
    />
  );
}
