import type { HTMLAttributes } from "react";

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className = "",
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={
        orientation === "vertical"
          ? `hero-separator hero-separator-v ${className}`
          : `hero-separator ${className}`
      }
      {...props}
    />
  );
}
