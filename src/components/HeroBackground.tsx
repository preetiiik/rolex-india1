export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* soft steel-toned drifting blobs, standing in for the Swirl / ChromaFlow shader layers */}
      <div
        className="blob-1 absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(240,240,240,0.2) 60%, transparent 70%)",
        }}
      />
      <div
        className="blob-2 absolute top-0 right-0 w-[60%] h-[60%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(242,101,34,0.35), rgba(242,101,34,0.05) 55%, transparent 70%)",
        }}
      />
      <div
        className="blob-3 absolute bottom-0 left-1/4 w-[55%] h-[55%] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 70%, rgba(255,255,255,0.8), rgba(230,230,230,0.1) 60%, transparent 70%)",
        }}
      />
      {/* film grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] grain-layer" xmlns="http://www.w3.org/2000/svg">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
}
