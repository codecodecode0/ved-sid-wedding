import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PAGE_WIDTH } from "./layout";

/**
 * A small "Scroll" label with bouncing arrows in the bottom-right corner of the first screen (clear of the
 * Add to Calendar button), for guests
 * who don't realise there is more below. It appears once the intro has settled and goes away for
 * good as soon as they scroll; tapping it scrolls down for them.
 */
const ScrollHint = ({ delay = 1.6 }: { delay?: number }) => {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60) setScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 mx-auto flex justify-end px-4 ${PAGE_WIDTH}`}>
    <AnimatePresence>
      {!scrolled && (
        <motion.button
          type="button"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: reduceMotion ? "auto" : "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
          transition={{ delay, duration: 0.6 }}
          aria-label="Scroll down"
          className="pointer-events-auto flex flex-col items-center p-1 text-zari/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
        >
          <span aria-hidden className="text-[0.6rem] font-medium tracking-[0.18em] uppercase">Scroll</span>
          <motion.span
            aria-hidden
            className="flex flex-col items-center -space-y-3"
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
            <ChevronDown className="h-5 w-5 opacity-60" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
    </div>
  );
};

export default ScrollHint;
