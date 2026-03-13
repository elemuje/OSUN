// RTIFN Logo — reproduced from official brand mark
// Gear/cog with infinity-wrench symbol and "RELAX TINUBU IS FIXING NIGERIA" text

export default function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer gear ring */}
      <circle cx="100" cy="100" r="90" fill="#006400" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="white" strokeWidth="2.5" />
      
      {/* Gear teeth — 16 teeth around the perimeter */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        const rad = (angle * Math.PI) / 180
        const x = 100 + 88 * Math.sin(rad)
        const y = 100 - 88 * Math.cos(rad)
        return (
          <rect
            key={i}
            x={x - 5}
            y={y - 8}
            width="10"
            height="16"
            rx="2"
            fill="white"
            transform={`rotate(${angle}, ${x}, ${y})`}
          />
        )
      })}

      {/* Inner white circle */}
      <circle cx="100" cy="100" r="58" fill="white" />
      <circle cx="100" cy="100" r="54" fill="#006400" />

      {/* Infinity/wrench symbol — simplified */}
      {/* Left loop */}
      <ellipse cx="85" cy="100" rx="16" ry="11" fill="none" stroke="white" strokeWidth="5" />
      {/* Right loop */}
      <ellipse cx="115" cy="100" rx="16" ry="11" fill="none" stroke="white" strokeWidth="5" />
      {/* Center cross */}
      <rect x="97" y="93" width="6" height="14" rx="3" fill="white" />

      {/* Wrench handle going up-right */}
      <line x1="120" y1="94" x2="134" y2="80" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <circle cx="135" cy="79" r="5" fill="white" />

      {/* Letters R T I F N around inner ring */}
      <text
        x="100" y="72"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
        fontFamily="serif"
        letterSpacing="18"
      >
        R  T  I  F  N
      </text>

      {/* Bottom arc text placeholder */}
      <path
        id="bottomArc"
        d="M 30 110 A 70 70 0 0 0 170 110"
        fill="none"
      />
    </svg>
  )
}
