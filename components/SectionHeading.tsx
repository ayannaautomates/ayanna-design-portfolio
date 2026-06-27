import type { ReactNode } from "react";

type SectionHeadingProps = {
  level: 1 | 2 | 3;
  id: string;
  className?: string;
  children: ReactNode;
};

export default function SectionHeading({
  level,
  id,
  className,
  children,
}: SectionHeadingProps) {
  if (level === 1) {
    return (
      <h1 id={id} className={className}>
        {children}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h2 id={id} className={className}>
        {children}
      </h2>
    );
  }
  return (
    <h3 id={id} className={className}>
      {children}
    </h3>
  );
}
