// RTIFN Official Logo — exact brand image, never altered
export default function Logo({ size = 48, className = '' }) {
  return (
    <img
      src="/logo.jpeg"
      alt="RTIFN Osun State Chapter"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  )
}
