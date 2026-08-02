export function LeafDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-sage ${className}`}>
      <span className="h-px w-10 bg-sage-light/60" />
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M24 6c6 6 6 14 0 20-6-6-6-14 0-20Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M24 22c4 4 4 10 0 20-4-10-4-16 0-20Z"
          fill="currentColor"
          opacity="0.55"
        />
        <path d="M12 20c6 1 10 5 12 10-7 0-11-4-12-10Z" fill="currentColor" opacity="0.7" />
        <path d="M36 20c-6 1-10 5-12 10 7 0 11-4 12-10Z" fill="currentColor" opacity="0.7" />
      </svg>
      <span className="h-px w-10 bg-sage-light/60" />
    </div>
  )
}
