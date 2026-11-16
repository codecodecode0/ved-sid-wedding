import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** A wooden scroll roller with gold finials, centred on the scroll's moving edge. */
const Roller = () => (
  <div aria-hidden className="relative -mx-3 -my-[11px] h-[22px]">
    <div className="absolute inset-x-2 inset-y-0 rounded-full border border-[#2a1408] bg-[linear-gradient(180deg,#8a4b22_0%,#5a2c12_45%,#3a1a09_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.35)]" />
    {["left-0", "right-0"].map((side) => (
      <span
        key={side}
        className={`absolute ${side} top-1/2 h-7 w-3.5 -translate-y-1/2 rounded-full border border-[#7a5a20] bg-[linear-gradient(90deg,#b8862e,#f3d27a_45%,#a8761f)]`}
      />
    ))}
  </div>
);

const ROLL_SECONDS = 1.6;
const SEAL_DELAY = ROLL_SECONDS + 0.1;
const SEND_DELAY = SEAL_DELAY + 0.7;

/**
 * A parchment letter on wooden rollers. It unrolls downwards on its own the first time it scrolls
 * into view. When `sealed` turns true it rolls back up, gets a VS wax seal, and flies off as if
 * sent to us; `onSent` fires once it has gone.
 */
const LetterScroll = ({ children, sealed = false, onSent }: { children: ReactNode; sealed?: boolean; onSent?: () => void }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const state = sealed ? "sealed" : inView ? "open" : "rolled";
  const roll = { duration: reduceMotion ? 0 : ROLL_SECONDS, ease: [0.45, 0, 0.2, 1] as const };

  return (
    <motion.div
      ref={ref}
      initial="rolled"
      animate={state}
      variants={{
        rolled: { opacity: 1, y: 0, scale: 1 },
        open: { opacity: 1, y: 0, scale: 1 },
        sealed: {
          opacity: 0,
          y: reduceMotion ? 0 : -140,
          scale: reduceMotion ? 1 : 0.6,
          transition: { delay: reduceMotion ? 0.4 : SEND_DELAY, duration: reduceMotion ? 0.3 : 0.9, ease: [0.5, 0, 0.8, 0.2] },
        },
      }}
      onAnimationComplete={(definition) => definition === "sealed" && onSent?.()}
      className="relative mx-auto max-w-md px-1"
    >
      <motion.div
        variants={{
          rolled: { clipPath: "inset(0 0 100% 0)" },
          open: { clipPath: "inset(0 0 0% 0)", transition: roll },
          sealed: { clipPath: "inset(0 0 100% 0)", transition: roll },
        }}
        className="relative bg-[linear-gradient(180deg,#fbf4e4_0%,#f6ead0_55%,#efdfbd_100%)] px-4 pt-10 pb-12 shadow-[inset_0_0_40px_rgba(140,90,30,0.18)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-2.5 inset-y-4 border border-maroon/30" />
        <div aria-hidden className="pointer-events-none absolute inset-x-4 inset-y-6 border border-zari/50" />
        <motion.div
          variants={{
            rolled: { opacity: 0 },
            open: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : ROLL_SECONDS * 0.5 } },
            sealed: { opacity: 1 },
          }}
          className="relative"
        >
          {children}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-1 top-0">
        <Roller />
      </div>
      <motion.div
        className="absolute inset-x-1"
        variants={{
          rolled: { top: "0%" },
          open: { top: "100%", transition: roll },
          sealed: { top: "0%", transition: roll },
        }}
      >
        <Roller />
      </motion.div>

      {/* Wax seal pressed on the rolled-up letter before it is sent */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#5e1020] bg-[radial-gradient(circle_at_35%_30%,#b3263a,#7a1424_70%)] font-serif text-sm text-zari shadow-[0_3px_8px_rgba(0,0,0,0.45)]"
        variants={{
          rolled: { opacity: 0, scale: 1.6 },
          open: { opacity: 0, scale: 1.6 },
          sealed: { opacity: 1, scale: 1, transition: { delay: reduceMotion ? 0 : SEAL_DELAY, duration: 0.35, ease: "backOut" } },
        }}
      >
        VS
      </motion.div>
    </motion.div>
  );
};

export default LetterScroll;
