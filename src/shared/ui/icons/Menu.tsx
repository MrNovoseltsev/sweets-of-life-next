import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { open?: boolean };

export default function Menu({ open = false, ...rest }: Props) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <rect
        className={`transition-all duration-300 [transform-box:fill-box] [transform-origin:center] ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
        width="22"
        height="2"
        rx="1"
        y="0"
      />
      <rect
        className={`transition-all duration-300 ${open ? "opacity-0" : ""}`}
        width="22"
        height="2"
        rx="1"
        y="7"
      />
      <rect
        className={`transition-all duration-300 [transform-box:fill-box] [transform-origin:center] ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
        width="22"
        height="2"
        rx="1"
        y="14"
      />
    </svg>
  );
}
