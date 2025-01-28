

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-emerald-800"
      >
        <path
          d="M8 8H24V24H8V8Z"
          className="fill-current"
          transform="rotate(45 16 16)"
        />
      </svg>
      <span className="text-2xl font-semibold text-emerald-800">Saduru</span>
    </div>
      </Link>
  );
} 