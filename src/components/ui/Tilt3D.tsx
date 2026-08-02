import { useRef, useState, type ReactNode } from 'react'

interface Tilt3DProps {
  children: ReactNode
  className?: string
  baseRotate?: number // độ nghiêng tĩnh (rotateZ)
  max?: number // biên độ nghiêng 3D tối đa
}

/**
 * Nghiêng 3D theo vị trí con trỏ (perspective). Trên di động (không hover)
 * ảnh giữ nguyên độ nghiêng tĩnh baseRotate.
 */
export function Tilt3D({ children, className = '', baseRotate = 0, max = 12 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rest = `perspective(800px) rotateZ(${baseRotate}deg)`
  const [transform, setTransform] = useState(rest)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTransform(
      `perspective(800px) rotateZ(${baseRotate}deg) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.04)`,
    )
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTransform(rest)}
      style={{ transform, transition: 'transform 0.25s ease-out', transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </div>
  )
}
