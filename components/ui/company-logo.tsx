import Image from "next/image";

/**
 * Company wordmark on a light plate.
 *
 * The source artwork is transparent with navy and black lettering, drawn for
 * white backgrounds — on this site's dark background it would be almost
 * invisible. Rather than recolour someone else's logo, it sits on a white
 * plate, the way a printed letterhead would.
 */
export function CompanyLogo({
  src,
  company,
}: {
  src: string;
  company: string;
}) {
  return (
    <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
      <Image
        src={src}
        alt={`${company} logo`}
        width={2000}
        height={361}
        sizes="240px"
        className="h-auto w-[180px] sm:w-[220px]"
      />
    </span>
  );
}
