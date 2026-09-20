import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Square logo tile.
 *
 * Source marks ship with their own background baked in — LangChain's is dark
 * navy, the university seals are white — so the tile deliberately adds no
 * background of its own and just crops to a rounded square with a hairline
 * border. That is the same treatment an app icon gets, and it avoids
 * recolouring artwork that is not ours to change.
 */
export function LogoTile({
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
