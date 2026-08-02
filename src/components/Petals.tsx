import { useMemo } from 'react'

const COUNT = 16

/** Hiệu ứng rơi cánh hoa sen nhẹ nhàng trên toàn trang. */
export function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 14,
        fall: 5 + Math.random() * 5,
        sway: 2.5 + Math.random() * 2.5,
        delay: -Math.random() * 12,
        pink: Math.random() > 0.5,
        opacity: 0.5 + Math.random() * 0.35,
      })),
    [],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-[10vh]"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.fall}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span
            className="petal-inner block"
            style={{
              width: p.size,
              height: p.size,
              animationDuration: `${p.sway}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path
                d="M12 2C6.5 8 6.5 16 12 22C17.5 16 17.5 8 12 2Z"
                fill={p.pink ? '#e2879a' : '#f3c6d0'}
                opacity={p.opacity}
              />
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}
