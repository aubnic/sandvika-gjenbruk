export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 32 : size === "lg" ? 56 : 40;

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: dim, height: dim }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full bg-primary shadow-md"
        style={{ boxShadow: "0 2px 8px rgba(30,58,95,0.25)" }}
      />
      <svg
        viewBox="0 0 40 40"
        width={dim * 0.72}
        height={dim * 0.72}
        className="relative z-10"
        fill="none"
      >
        <ellipse cx="20" cy="18" rx="14" ry="10" fill="#c9a227" />
        <ellipse cx="20" cy="16.5" rx="12" ry="8" fill="#d4af37" />
        <ellipse cx="16" cy="14" rx="4" ry="2.5" fill="#e8c84a" opacity="0.55" />
        <path
          d="M6 18 Q20 28 34 18"
          stroke="#a6851a"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M10 17 Q20 22 30 17"
          stroke="#1e3a5f"
          strokeWidth="0.6"
          fill="none"
          opacity="0.25"
          strokeDasharray="1.5 1.5"
        />
      </svg>
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logo size="md" />
      <span className="leading-tight">
        <span className="block font-semibold tracking-tight text-foreground">
          Sandvika Gjenbruk
        </span>
        <span className="hidden text-xs text-muted sm:block">
          Skatter med historie
        </span>
      </span>
    </span>
  );
}
