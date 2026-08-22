/**
 * Tekstura poziomicowa — leśny akcent na ciemnych panelach.
 * Osobny moduł, bo używa jej i karta produktu, i stopka; import stopki
 * z `ProductPage` zrobiłby cykl (ProductPage sam importuje Footer).
 */
export default function ContourTexture({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 1200 600"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <ellipse
            key={`a-${i}`}
            cx={310}
            cy={250}
            rx={90 + i * 62}
            ry={54 + i * 38}
            transform={`rotate(${-18 + i * 2} 310 250)`}
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse
            key={`b-${i}`}
            cx={980}
            cy={420}
            rx={70 + i * 74}
            ry={44 + i * 46}
            transform={`rotate(${12 - i * 3} 980 420)`}
          />
        ))}
      </g>
    </svg>
  )
}
