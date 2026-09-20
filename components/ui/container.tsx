import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** `prose` narrows to a comfortable measure for long-form reading. */
  width?: "default" | "prose";
}

export function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        width === "prose" ? "max-w-3xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
