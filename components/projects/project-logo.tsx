import { LogoTile } from "@/components/ui/logo-tile";

/** Logo tile for an external project. Thin alias over the shared tile. */
export function ProjectLogo({
  src,
  name,
  size,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return <LogoTile src={src} name={name} size={size} className={className} />;
}
