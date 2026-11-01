import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { storyMilestones } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";

const timelineEvents = storyMilestones;

const TimelineItem = ({
  event,
  index,
  isLast,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <motion.div 
        className="w-full max-w-sm md:max-w-none md:w-5/12 relative group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={event.image}
            alt={event.imageAlt}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Decorative zari border */}
          <div className="absolute inset-0 border border-zari/70 m-4 pointer-events-none" />
        </div>
        {/* Year badge */}
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-6 py-2 border border-zari shadow-lg whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          <span className="font-serif text-2xl text-rose-foreground">{event.year}</span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className={`w-full md:w-7/12 text-center md:text-left ${isEven ? "" : "md:text-right"} pt-8 md:pt-0`}>
        <motion.h3 
          className="font-serif text-2xl md:text-3xl mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {event.title}
        </motion.h3>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground">{event.marathiLine}</p>

      </div>
    </motion.div>
  );
};

const OurStory = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            How It All Began
          </p>
          <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">
            Our Story
          </h2>
          <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">दोन मनांची गाठ, आयुष्यभराची साथ.</p>
          <LotusDivider className="mt-7" />
        </motion.div>

        {/* Timeline with Photos */}
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
          {timelineEvents.map((event, index) => (
            <TimelineItem 
              key={event.year} 
              event={event} 
              index={index} 
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
