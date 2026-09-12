import Image from "next/image";
import { FiArrowUpRight, FiBox, FiLock, FiMoon } from "react-icons/fi";
import { futureDestinations } from "@/data/ecosystem";

export function FutureDestinations() {
  return <section className="future-section shell" aria-label="Future destinations">
    {futureDestinations.map((destination) => <article className={`destination-card destination-${destination.id}`} key={destination.id} aria-labelledby={`${destination.id}-title`}>
      <div className="destination-scene" aria-hidden="true">{destination.id === "labground" ? <><div className="spatial-orbit" /><div className="spatial-cube"><i /><i /><i /></div><div className="spatial-sphere" /><FiBox className="scene-symbol" /></> : <><Image className="studio-art" src="/images/anime-lab-city-hero.png" alt="" fill sizes="(max-width: 800px) 90vw, 30vw" /><div className="studio-portal" /><div className="studio-moon" /><FiMoon className="scene-symbol" /></>}</div>
      <div className="destination-copy"><p className="eyebrow">{destination.label}</p><h2 id={`${destination.id}-title`}>{destination.name}</h2><p>{destination.summary}</p><div className="destination-actions"><button type="button" className="locked-button" disabled><FiLock aria-hidden="true" /> Coming soon</button><span>{destination.id === "labground" ? "A future 3D portfolio" : "A future collaborative world"}</span></div>
      <details className="destination-vision"><summary>Explore the vision <FiArrowUpRight aria-hidden="true" /></summary><p>{destination.vision}</p></details></div>
    </article>)}
  </section>;
}
