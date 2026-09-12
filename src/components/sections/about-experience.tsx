import { FiCompass, FiCode, FiSearch, FiBookOpen, FiRefreshCw } from "react-icons/fi";
import { workingPrinciples } from "@/data/ecosystem";
import { PortraitFrame } from "@/components/sections/portrait-frame";

const icons = [FiCompass, FiCode, FiSearch, FiBookOpen, FiRefreshCw];

export function AboutExperience() {
  return <div className="about-workbench">
    <div className="about-composition"><PortraitFrame /><div className="about-grid"><p className="about-lead">I&apos;m interested in the space where <em>clear systems</em> meet <em>memorable experiences.</em></p><div><p>This lab documents more than finished screens. It follows the reasoning, experiments, constraints, and changes that shape the work.</p><p>The aim is growing ownership: understand the architecture, trace the data, question trade-offs, and keep refining what ships.</p></div></div></div>
    <div className="principle-heading"><span className="eyebrow">Working principle</span><span>A practice, not a finish line</span></div>
    <ol className="principle-loop">{workingPrinciples.map((step, index) => { const Icon = icons[index]; return <li key={step.title}><div className="principle-step"><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.detail}</p></li>; })}</ol>
  </div>;
}
