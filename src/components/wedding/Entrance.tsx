import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Monogram from "./Monogram";
import { Elephant, FortWall, GateFrame, GateGlow, GateLeaf, LEAF_BOX } from "./FortArt";

/** How long the closed gate stays up before swinging open on its own. */
const HOLD_MS = 350;
const DOOR_SECONDS = 2.4;

/** Show the gate every time the site loads, except when a guest follows a link to a section like #rsvp. */
export const shouldShowEntrance = () => typeof window !== "undefined" && !window.location.hash;

// Gate and elephant sizes, shared by the layout below so the elephants flank the gateway at any screen size.
const sizes = {
  "--gate-w": "min(76vw, 21rem, 44svh)",
  "--gate-h": "calc(var(--gate-w) * 1.6)",
  "--gate-bottom": "3svh",
  "--el-w": "min(32vw, 9.5rem)",
} as CSSProperties;

/**
 * A Maratha fort gateway closed over the invitation. A moment after the site loads (or straight
 * away on a tap) its spiked doors swing inward onto warm light and the view walks through the
 * gate into the page. `onReveal` fires once the gate has fully cleared, so the hero plays its intro
 * (lines popping in from above) on a clear screen.
 */
const Entrance = ({ onReveal }: { onReveal: () => void }) => {
  const reduceMotion = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef(false);

  // Keep the page still behind the closed gate.
  useEffect(() => {
    if (gone) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [gone]);

  const open = () => {
    if (started.current) return;
    started.current = true;
    setOpening(true);
    window.scrollTo(0, 0);
  };

  // Open by itself shortly after the page loads; a tap just opens it sooner.
  // `?gate=hold` keeps it closed for checking the artwork.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("gate") === "hold") return;
    const timer = window.setTimeout(open, HOLD_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swing = (direction: 1 | -1) =>
    reduceMotion
      ? {}
      : { animate: { rotateY: opening ? direction * 84 : 0 }, transition: { duration: DOOR_SECONDS, ease: [0.5, 0, 0.25, 1] as const } };

  // Once the doors are mostly open, step through the gateway: zoom into it and fade onto the site.
  const walkThrough = reduceMotion
    ? { animate: { opacity: opening ? 0 : 1 }, transition: { duration: 0.6 } }
    : {
        animate: opening ? { opacity: 0, scale: 2.6 } : { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: DOOR_SECONDS - 0.6, ease: [0.5, 0, 0.75, 0] as const },
      };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="entrance"
          role="button"
          tabIndex={0}
          aria-label="Open the invitation"
          onClick={open}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
          style={{ ...sizes, transformOrigin: "50% calc(100% - var(--gate-bottom) - var(--gate-h) * 0.45)" }}
          className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none focus:outline-none"
          {...walkThrough}
          onAnimationComplete={() => {
            if (!opening) return;
            setGone(true);
            onReveal();
          }}
        >
          <FortWall wallTop="calc(100% - var(--gate-bottom) - var(--gate-h) * 0.82)" />

          {/* The VS monogram rising like the sun over the distant hill fort */}
          <div
            className="absolute inset-x-0 top-0 flex items-start justify-center"
            style={{ height: "calc(100% - var(--gate-bottom) - var(--gate-h) * 0.82 - 26px)", paddingTop: "max(7svh, 2.5rem)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-full p-1 bg-maroon-deep/80 ring-1 ring-zari/70 shadow-[0_0_24px_-2px_hsl(var(--zari)/0.55)]"
            >
              <Monogram className="h-12 w-12" />
            </motion.div>
          </div>

          {/* Darken the edges so the eye goes to the gate */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 75% 60% at 50% 72%, transparent 45%, rgba(20,6,10,0.55) 100%)" }}
          />

          {/* The gateway: glow behind, two spiked leaves, then the stone arch over their edges */}
          <div
            className="absolute left-1/2 -translate-x-1/2 [perspective:900px]"
            style={{ width: "var(--gate-w)", height: "var(--gate-h)", bottom: "var(--gate-bottom)" }}
          >
            <GateGlow />
            <motion.div className="absolute origin-left" style={LEAF_BOX.left} {...swing(1)}>
              <GateLeaf side="left" />
            </motion.div>
            <motion.div className="absolute origin-right" style={LEAF_BOX.right} {...swing(-1)}>
              <GateLeaf side="right" />
            </motion.div>
            <GateFrame />
          </div>

          {/* Elephants standing guard on either side, trunks raised towards the gate */}
          <motion.div
            className="absolute"
            style={{ width: "var(--el-w)", bottom: "calc(var(--gate-bottom) - 0.6rem)", left: "max(0.25rem, calc(50% - var(--gate-w) / 2 - var(--el-w) * 0.62))" }}
          >
            <Elephant className="w-full h-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ width: "var(--el-w)", bottom: "calc(var(--gate-bottom) - 0.6rem)", right: "max(0.25rem, calc(50% - var(--gate-w) / 2 - var(--el-w) * 0.62))" }}
          >
            <Elephant flip className="w-full h-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Entrance;
