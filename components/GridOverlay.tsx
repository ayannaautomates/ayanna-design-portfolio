export default function GridOverlay() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(#7DF9FF08 1px, transparent 1px),
            linear-gradient(90deg, #7DF9FF08 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(125, 249, 255, 0.025) 2px,
            rgba(125, 249, 255, 0.025) 4px
          )`,
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
