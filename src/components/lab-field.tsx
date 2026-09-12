import Link from "next/link";
import { FiArrowUpRight, FiLayers, FiUser, FiBriefcase, FiCode, FiZap, FiMessageCircle } from "react-icons/fi";
import type { NavItem } from "@/types/portfolio";

const descriptions: Record<string, string> = {
  Work: "The systems. The decisions. The story.", About: "The person behind the interface.",
  Experience: "From learning to taking ownership.", Skills: "A toolkit, grounded in practice.",
  Experiments: "A little room for the unfinished.", Contact: "Every good build starts somewhere.",
};
const icons = { Work: FiLayers, About: FiUser, Experience: FiBriefcase, Skills: FiCode, Experiments: FiZap, Contact: FiMessageCircle };

export function LabField({ items }: { items: NavItem[] }) {
  return <nav className="lab-field" aria-label="Explore the lab">
    {items.map((item) => { const Icon = icons[item.label as keyof typeof icons] ?? FiLayers; return <Link className="field-node" href={item.href} key={item.href}>
      <div className="field-node-content"><div className="field-node-top"><Icon aria-hidden="true" /><span>{item.index}</span></div><strong>{item.label}</strong><p>{descriptions[item.label]}</p><FiArrowUpRight className="field-arrow" aria-hidden="true" /></div>
    </Link>; })}
  </nav>;
}
