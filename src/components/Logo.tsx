import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  const dim = size === "sm" ? 40 : size === "lg" ? 80 : 52;

  return (
    <Image
      src="/logo.svg"
      alt="Sandvika Gjenbruk"
      width={dim}
      height={dim}
      className={`shrink-0 rounded-full object-contain ${className}`}
      priority
      unoptimized
    />
  );
}
