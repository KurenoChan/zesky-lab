import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { BrandLogo } from "@/components/ui/brand-logo";
import { navigation } from "@/data/portfolio";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/"><BrandLogo /><span>Zesky Lab<small>Digital atelier · KL / MY</small></span></Link><nav className="desktop-nav" aria-label="Primary navigation">{navigation.slice(0, 4).map((item) => <Link key={item.href} href={`/${item.href}`}>{item.label}</Link>)}<Link className="nav-contact" href="/#contact">Make contact <FiArrowUpRight aria-hidden="true" /></Link></nav><MobileNav items={navigation} /></header>;
}
