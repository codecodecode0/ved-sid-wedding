import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import { photos } from "@/lib/wedding";

const SLIDE_MS = 2000;
/** How far (px) or how fast (px/s) a swipe or mouse drag must go to change photo. */
const SWIPE_DISTANCE = 50;
const SWIPE_SPEED = 400;

const slides = photos.carousel;

/**
 * Our photos cross-fading inside the arch frame, one after another.
 * Only the visible photo and the next one are loaded, so phones don't fetch every picture up front.
 * It waits on the first photo until the arch is scrolled into view, and pauses again when it leaves.
 * Guests can also swipe it with a finger or drag it with the mouse: left for the next photo, right for the previous one.
 */
const PhotoCarousel = () => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [dragging, setDragging] = useState(false);

  const step = (by: number) => setIndex((i) => (i + by + slides.length) % slides.length);
  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    setDragging(false);
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_SPEED) step(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_SPEED) step(-1);
  };

  // Each photo gets a full turn, including one picked from the dots or a swipe; nothing advances
  // mid-drag, off screen, or while the tab is in the background.
  useEffect(() => {
    if (!inView || dragging) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      // People who prefer less motion still see every photo, just changing more slowly and without the fade.
      timer = window.setTimeout(() => step(1), reduceMotion ? SLIDE_MS * 2 : SLIDE_MS);
    };
    const onVisibility = () => (document.hidden ? window.clearTimeout(timer) : schedule());
    schedule();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [index, inView, dragging, reduceMotion]);

  // Warm the cache for the next photo so the fade never shows a half-loaded image.
  useEffect(() => {
    const next = new Image();
    next.src = slides[(index + 1) % slides.length].src;
  }, [index]);

  const slide = slides[index];

  return (
    <div ref={ref} aria-roledescription="carousel" aria-label="Our photos">
      <div className="relative p-2.5 arch-frame border border-zari/60">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          // Vertical swipes still scroll the page on phones.
          style={{ touchAction: "pan-y" }}
          className="relative arch-frame overflow-hidden aspect-[3/4] bg-maroon-deep cursor-grab active:cursor-grabbing select-none"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
              style={{ objectPosition: slide.position ?? "50% 40%" }}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-5 arch-frame border border-zari/40 pointer-events-none" />
      </div>

      <div className="mt-4 flex justify-center">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1} of ${slides.length}`}
            aria-current={i === index}
            className="group p-1.5"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-4 bg-zari" : "w-1.5 bg-zari/35 group-hover:bg-zari/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
