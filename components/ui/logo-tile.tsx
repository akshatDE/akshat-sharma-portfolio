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
 *
 * `muted` softens a mark whose own background is bright: a white seal at full
 * opacity is the loudest thing on a near-black page and pulls attention away
 * from the text beside it. Lowering opacity lets the dark background show
 * through, which dims the artwork without touching its colours.
 */
export function LogoTile({
  src,
  name,
  size = 44,
  muted = false,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  /** Soften a mark with a bright background so it sits back on the page. */
  muted?: boolean;
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
        muted && "opacity-70",
        className,
      )}
    />
  );
}
