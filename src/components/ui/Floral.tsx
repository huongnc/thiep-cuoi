/**
 * Trang trí hoa sen — ảnh vintage watercolor (public/florals/lotus.png).
 * Nguồn: rawpixel remix từ tranh Megata Morikaga (tranh gốc thuộc phạm vi công cộng),
 * tải qua magnific.com. Đã tách nền trong suốt.
 */

interface CornerProps {
  className?: string
  flip?: boolean
  opacity?: number
}

export function CornerFloral({ className = '', flip = false, opacity = 1 }: CornerProps) {
  return (
    <img
      src="/florals/lotus.png"
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity }}
    />
  )
}

/**
 * Dải "hồ sen" full-width: nền xanh lá đậm + lá sen. Đặt height qua className (vd h-24).
 */
export function DecorBar({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`w-full overflow-hidden ${className || 'h-20'}`}>
      <svg
        viewBox="0 0 1200 130"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <rect width="1200" height="130" fill="#4f6b45" />
        {[80, 300, 560, 820, 1080].map((x, i) => (
          <ellipse
            key={x}
            cx={x}
            cy={70 + (i % 2) * 16}
            rx={95}
            ry={36}
            fill={i % 2 ? '#5c7c50' : '#688a5b'}
            opacity="0.85"
          />
        ))}
        {[180, 440, 700, 960].map((x, i) => (
          <ellipse
            key={`s${x}`}
            cx={x}
            cy={40 + (i % 2) * 20}
            rx={55}
            ry={22}
            fill="#749763"
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  )
}
