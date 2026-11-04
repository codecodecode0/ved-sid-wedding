import { motion } from "framer-motion";
import { storyMilestones } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";

type Milestone = (typeof storyMilestones)[number];
type Moment = Milestone["moments"][number];

/** Photos that matter most to the couple print larger within their chapter's collage. */
const isFeatured = (moment: Moment) => "featured" in moment && moment.featured;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

/** A postmark-style stamp naming where a moment happened. */
const Postmark = ({ place }: { place: string }) => (
  <span className="absolute top-1.5 right-1.5 z-10 rotate-6 rounded-full border border-dashed border-maroon/60 bg-[hsl(40_60%_98%)]/95 px-2 py-0.5 text-[0.5rem] sm:text-[0.6rem] font-medium uppercase tracking-[0.15em] text-maroon whitespace-nowrap shadow-sm">
    {place}
  </span>
);

/** A small keepsake print with a handwritten-style note under it. */
const Polaroid = ({ moment, tilt, className = "" }: { moment: Moment; tilt: number; className?: string }) => (
  <motion.figure
    initial={{ opacity: 0, y: 24, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: tilt }}
    whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={`bg-[hsl(40_60%_98%)] p-1.5 pb-0 sm:p-2 sm:pb-0 shadow-[0_18px_40px_-14px_hsl(var(--maroon-deep)/0.55)] ${className}`}
  >
    <div className="relative">
      <img src={moment.src} alt={moment.alt} loading="lazy" className="w-full aspect-[4/5] object-cover" />
      {"place" in moment && moment.place && <Postmark place={moment.place} />}
    </div>
    <figcaption className="font-serif italic text-[0.7rem] sm:text-sm leading-snug text-maroon text-center px-0.5 py-1.5 sm:py-2.5">
      {moment.note}
    </figcaption>
  </motion.figure>
);

/** Main photo in a zari frame, with keepsake prints tucked around it. */
const Collage = ({ milestone, flip }: { milestone: Milestone; flip: boolean }) => {
  const { moments } = milestone;
  const compact = "compact" in milestone && milestone.compact;
  const main = (
    <div className="relative p-2 border border-zari/70 bg-background">
      <img
        src={milestone.image}
        alt={milestone.imageAlt}
        loading="lazy"
        className={`w-full object-cover ${compact ? "aspect-square object-[50%_70%] sm:aspect-[4/5]" : "aspect-[4/5]"}`}
      />
      <div className="absolute inset-5 border border-zari/50 pointer-events-none" />
    </div>
  );

  // Featured prints: a large pair overlapping a smaller main photo, so the chapter stays the same height.
  if (moments.some(isFeatured)) {
    return (
      <div className="relative">
        <div className="w-[60%] mx-auto">{main}</div>
        <div className="relative -mt-2 sm:-mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          {moments.map((moment, i) => (
            <Polaroid key={moment.note} moment={moment} tilt={i === 0 ? -3 : 3} />
          ))}
        </div>
      </div>
    );
  }

  // Three moments: postcard prints overlapping the bottom of the main photo.
  if (moments.length === 3) {
    // Compact chapters keep one row of three; others give phones two large prints with the third centred below.
    return (
      <div className="relative">
        <div className="w-[88%] mx-auto">{main}</div>
        <div
          className={`relative -mt-12 sm:-mt-20 grid gap-3 sm:gap-4 px-2 sm:px-1 ${compact ? "grid-cols-3 gap-2 px-0" : "grid-cols-2 sm:grid-cols-3"}`}
        >
          {moments.map((moment, i) => (
            <Polaroid
              key={moment.note}
              moment={moment}
              tilt={[-5, 4, -2][i % 3]}
              className={
                i === 1
                  ? "mt-6 sm:mt-5"
                  : i === 2 && !compact
                    ? "col-span-2 w-[52%] mx-auto -mt-8 sm:col-span-1 sm:w-auto sm:mx-0 sm:mt-0"
                    : ""
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // One or two prints: scattered on the side away from the text.
  const side = flip ? "left-0" : "right-0";
  return (
    <div className={`relative ${moments.length ? "pb-10" : ""}`}>
      <div className={moments.length ? `w-[74%] ${flip ? "ml-auto" : ""}` : "w-[86%] mx-auto"}>{main}</div>
      {moments.map((moment, i) => (
        <Polaroid
          key={moment.note}
          moment={moment}
          tilt={(i === 0 ? 5 : -4) * (flip ? -1 : 1)}
          className={`absolute ${side} ${moments.length === 1 ? "w-[40%] bottom-0" : `w-[34%] ${i === 0 ? "top-0" : "bottom-0"}`} z-10`}
        />
      ))}
    </div>
  );
};

const Chapter = ({ milestone, index }: { milestone: Milestone; index: number }) => {
  const flip = index % 2 === 1;
  return (
    <article className="relative grid md:grid-cols-2 gap-6 md:gap-20 items-center">
      {/* Year medallion on the gold spine */}
      <div aria-hidden className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-4 w-4 rotate-45 bg-haldi ring-4 ring-card" />

      <motion.div {...reveal()} className={`order-2 min-w-0 w-full max-w-md mx-auto md:max-w-none ${flip ? "md:order-2" : "md:order-1"}`}>
        <Collage milestone={milestone} flip={flip} />
      </motion.div>

      <motion.div
        {...reveal(0.15)}
        className={`order-1 min-w-0 text-center ${flip ? "md:text-right md:order-1" : "md:text-left md:order-2"}`}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{milestone.chapter}</p>
        <p className="font-serif text-5xl md:text-6xl text-haldi mt-3 leading-none">{milestone.year}</p>
        <h3 className="font-serif text-3xl md:text-4xl mt-4">{milestone.title}</h3>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">{milestone.marathiLine}</p>
        <p className={`text-base leading-7 text-muted-foreground mt-3 md:mt-5 max-w-sm mx-auto ${flip ? "md:ml-auto md:mr-0" : "md:mx-0"}`}>
          {milestone.caption}
        </p>
      </motion.div>
    </article>
  );
};

const OurStory = () => (
  <section className="py-14 md:py-24 bg-card overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div {...reveal()} className="text-center mb-10 md:mb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">How It All Began</p>
        <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">Our Story</h2>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">दोन मनांची गाठ, आयुष्यभराची साथ.</p>
        <LotusDivider className="mt-7" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto space-y-14 md:space-y-24">
        {/* Gold spine running through every chapter */}
        <div aria-hidden className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-zari/70 to-transparent" />
        {storyMilestones.map((milestone, index) => (
          <Chapter key={milestone.year} milestone={milestone} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default OurStory;
