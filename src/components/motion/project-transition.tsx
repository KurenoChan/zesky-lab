"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiCircle, FiX, FiArrowUpRight } from "react-icons/fi";
import { AnimatedDialog } from "@/components/ui/animated-dialog";

type Destination = { href: string; title: string };
type OpenProject = (event: MouseEvent<HTMLAnchorElement>, destination: Destination) => void;
const TransitionContext = createContext<OpenProject>(() => {});

export function ProjectTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const safety = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const busy = useRef(false);
  const close = useCallback(() => {
    clearTimeout(timer.current); clearTimeout(safety.current); busy.current = false; setOpen(false);
  }, []);

  useEffect(() => {
    if (pathname !== destination?.href) return;
    const done = setTimeout(() => {
      close();
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 80);
    const focus = setTimeout(() => { const main = document.getElementById("main"); main?.setAttribute("tabindex", "-1"); main?.focus({ preventScroll: true }); }, 420);
    return () => { clearTimeout(done); clearTimeout(focus); };
  }, [pathname, destination, close]);
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(safety.current); }, []);

  const openProject: OpenProject = (event, next) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setDestination(next); setOpen(true);
    timer.current = setTimeout(() => router.push(next.href), 450);
    // Never strand visitors behind an overlay if navigation fails or stalls.
    safety.current = setTimeout(close, 6500);
  };

  return <TransitionContext.Provider value={openProject}>{children}
    <AnimatedDialog open={open} onDismiss={close} label="Opening project case study" className="project-transition">
      <div className="transition-terminal">
        <div className="terminal-chrome"><span className="terminal-lights" aria-hidden="true"><FiCircle /><FiCircle /><FiCircle /></span><span>ZESKY LAB / CASE FILE</span><button onClick={close} aria-label="Dismiss project transition"><FiX aria-hidden="true" /></button></div>
        <p className="eyebrow" data-dialog-item>From interface to engineering</p><h2 data-dialog-item>{destination?.title}</h2>
        <p className="terminal-command" data-dialog-item>&gt; open {destination?.href}<span aria-hidden="true">_</span></p>
        {destination && <a className="text-link" href={destination.href} data-dialog-item>Continue directly <FiArrowUpRight aria-hidden="true" /></a>}
      </div>
    </AnimatedDialog>
  </TransitionContext.Provider>;
}

export const useProjectTransition = () => useContext(TransitionContext);
