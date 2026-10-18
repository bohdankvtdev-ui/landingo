type BadgeQuestionProps = {
  className?: string;
};

/** Decorative wavy badge with “?” — stands in for the example icon. */
export function BadgeQuestionMark({ className = "" }: BadgeQuestionProps) {
  return (
    <svg
      className={`hero-badge-q ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M60 6c8 0 14 5 20 7 7 2 15-1 20 5 5 6 3 14 5 21 2 6 8 12 8 21s-6 15-8 21c-2 7 0 15-5 21-5 6-13 3-20 5-6 2-12 8-20 8s-14-6-20-8c-7-2-15 1-20-5-5-6-3-14-5-21-2-6-8-12-8-21s6-15 8-21c2-7 0-15 5-21 5-6 13-3 20-5 6-2 12-7 20-7Z"
        fill="currentColor"
      />
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fontSize="62"
        fontWeight="700"
        fill="#f3f5f9"
        fontFamily="var(--font-dm), system-ui, sans-serif"
      >
        I
      </text>
    </svg>
  );
}
