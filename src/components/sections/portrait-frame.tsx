import Image from "next/image";
import { FiImage } from "react-icons/fi";
import { portrait } from "@/data/portrait";

export function PortraitFrame() {
  return <figure className="portrait-frame" aria-label="Zesky portrait">
    {portrait.src ? <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 25vw, 280px" /> : <div className="portrait-empty"><FiImage aria-hidden="true" /><span>A face behind the code.</span><small>Portrait coming soon</small></div>}
    {!portrait.src && <figcaption className="portrait-caption">Zesky / Software engineer</figcaption>}
  </figure>;
}
