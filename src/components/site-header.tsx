import Link from "next/link";
import { navigation } from "@/data/portfolio";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Zesky Lab home"><span className="brand-mark">Z</span><span>Zesky Lab<small>Software / Systems / Interfaces</small></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.slice(0, 4).map((item) => <Link key={item.href} href={`/${item.href}`}>{item.label}</Link>)}
        <Link className="nav-contact" href="/#contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
      </nav>
      <MobileNav items={navigation} />
    </header>
  );
}
