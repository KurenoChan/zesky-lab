import Link from "next/link";
import type { NavItem } from "@/types/portfolio";

const descriptions: Record<string, string> = {
  Work: "The systems. The decisions. The story.", About: "The person behind the interface.",
  Experience: "From learning to taking ownership.", Skills: "A toolkit, grounded in practice.",
  Experiments: "A little room for the unfinished.", Contact: "Every good build starts somewhere.",
};

export function LabField({ items }: { items: NavItem[] }) {
  return <nav className="lab-field" aria-label="Explore the lab">
    {items.map((item) => <Link className="field-node" href={item.href} key={item.href}>
      <span>{item.index} /</span><strong>{item.label}</strong><p>{descriptions[item.label]}</p><i aria-hidden="true">↗</i>
    </Link>)}
  </nav>;
}
