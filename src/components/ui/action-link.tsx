import Link from "next/link";
import { ArrowIcon } from "./icons";

export function ActionLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return <Link className={`action-link action-${variant}`} href={href}><span>{children}</span><ArrowIcon /></Link>;
}
