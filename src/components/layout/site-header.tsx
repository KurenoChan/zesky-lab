import Link from "next/link";
import { navigation } from "@/data/portfolio";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/" aria-label="Zesky Lab home"><span className="brand-mark">Z</span><span>Zesky Lab<small>Digital atelier · KL / MY</small></span></Link><nav className="desktop-nav" aria-label="Primary navigation">{navigation.slice(0, 4).map((item) => <Link key={item.href} href={`/${item.href}`}>{item.label}</Link>)}<Link className="nav-contact" href="/#contact">Make contact <span aria-hidden="true">↗</span></Link></nav><MobileNav items={navigation} /></header>;
}
