import Image from "next/image";

/** The application monogram, decorative beside the wordmark. */
export function BrandLogo({ className = "" }: { className?: string }) {
  return <Image className={`brand-logo ${className}`} src="/icon.svg" width={48} height={48} alt="" aria-hidden="true" />;
}
