import { LuArrowLeftRight } from "react-icons/lu";
/** Authored system illustration, not a screenshot or a real biometric record. */
export function CaptureIllustration() {
  return <div className="capture-art" aria-hidden="true">
    <div className="capture-frame"><svg viewBox="0 0 160 190" fill="none"><path d="M24 106V83a56 56 0 0 1 112 0v33M37 132V82a43 43 0 0 1 86 0v57M50 151V83a30 30 0 0 1 60 0v62M64 158V83a16 16 0 0 1 32 0v75M80 78v93M22 122v10M136 130v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg><i className="scan-line" /></div>
    <span>DMIT / CAPTURE WORKFLOW</span><div className="capture-nodes"><span>Browser</span><LuArrowLeftRight /><span>Bridge</span><LuArrowLeftRight /><span>Scanner</span></div><small>System illustration · Not a live scan</small>
  </div>;
}
