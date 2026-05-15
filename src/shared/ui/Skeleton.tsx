export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[8px] bg-brand/[0.08] ${className ?? ""}`}
    />
  );
}
