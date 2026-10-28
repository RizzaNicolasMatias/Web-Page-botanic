import React from "react";

export function BotanicalBranchSvg({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 170C65 135 110 85 170 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M65 135C45 120 35 95 50 80C65 65 85 85 65 135Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M95 103C115 118 145 120 155 102C165 84 135 72 95 103Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M115 80C95 62 90 38 106 26C122 14 136 38 115 80Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M142 52C162 64 185 62 190 46C195 30 170 25 142 52Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MonsteraLeafSvg({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 105V20M60 20C32 20 15 45 20 75C23 92 42 102 60 102C78 102 97 92 100 75C105 45 88 20 60 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M60 45L32 38M60 65L25 60M60 82L35 80M60 45L88 38M60 65L95 60M60 82L85 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OrganicDividerSvg({ className = "w-full h-10 text-[#EFF3EE]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 24C240 74 480 74 720 38C960 2 1200 2 1440 42V74H0V24Z"
        fill="currentColor"
      />
    </svg>
  );
}