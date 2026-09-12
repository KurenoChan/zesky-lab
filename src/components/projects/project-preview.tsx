"use client";

import { useRef, useState } from "react";
import { FiArrowUpRight, FiExternalLink, FiLock, FiMonitor, FiPlay, FiRefreshCw, FiX } from "react-icons/fi";

/** Cross-origin preview, explicitly launched. Never proxy around embedding restrictions. */
export function ProjectPreview({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const launch = useRef<HTMLButtonElement>(null);
  let address: URL;
  try { address = new URL(url); } catch { return null; }
  if (address.protocol !== "https:") return null;
  return <section className="project-preview shell" aria-labelledby="preview-title">
    <div className="preview-heading"><div><p className="eyebrow">Go beyond the screenshots</p><h2 id="preview-title">Open a window into the build.</h2></div><FiMonitor aria-hidden="true" /></div>
    <div className="preview-terminal" data-open={open} data-native-cursor data-lenis-prevent>
      <div className="preview-toolbar"><span><FiLock aria-hidden="true" />{address.host}</span><div>{open && <><button type="button" className="icon-button" aria-label="Reload project preview" onClick={() => setRevision((value) => value + 1)}><FiRefreshCw aria-hidden="true" /></button><button type="button" className="icon-button" aria-label="Close project preview" onClick={() => { setOpen(false); requestAnimationFrame(() => launch.current?.focus()); }}><FiX aria-hidden="true" /></button></>}<a className="icon-button" href={url} target="_blank" rel="noreferrer" aria-label="Open project in a new tab"><FiExternalLink aria-hidden="true" /></a></div></div>
      {open ? <iframe key={revision} src={url} title={`${title} live preview`} sandbox="allow-scripts allow-forms allow-same-origin allow-popups" referrerPolicy="no-referrer" allow="camera 'none'; microphone 'none'; geolocation 'none'; usb 'none'; serial 'none'" /> : <div className="preview-launch"><FiMonitor aria-hidden="true" /><h3>The real interface. Your own pace.</h3><p>Launch the deployed application here. This connects to its external services; authentication or an active session may be required.</p><button ref={launch} type="button" className="connect-button" onClick={() => setOpen(true)}><FiPlay aria-hidden="true" /> Launch live preview</button></div>}
    </div>
    <p className="preview-note">This is the live project, not a simulated demo. Please don’t submit personal or biometric information. Scanner, camera, download, and backend-dependent workflows may not work inside this frame. If it won’t display, <a href={url} target="_blank" rel="noreferrer">open the project separately <FiArrowUpRight aria-hidden="true" /></a>.</p>
  </section>;
}
