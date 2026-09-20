export interface NavItem {
  label: string;
  href: string;
  /** External links open in a new tab and render an indicator. */
  external?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Open Source", href: "/open-source" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];
