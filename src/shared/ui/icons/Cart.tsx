import type { SVGProps } from "react";

export default function Cart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 2l-2 4v15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6l-2-4Z" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
