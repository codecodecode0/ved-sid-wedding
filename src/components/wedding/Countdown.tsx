import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { wedding, getTimeLeft, photos } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";

const Countdown = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={photos.countdown.src}
          alt={photos.countdown.alt}
          loading="lazy"
          className="w-full h-full object-cover object-[60%_40%]"
        />
        <div className="absolute inset-0 bg-photograph-overlay/75" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p lang="mr" className="text-xl md:text-2xl text-haldi mb-3">शुभमुहूर्ताची प्रतीक्षा</p>
          <h2 className="font-serif text-3xl md:text-5xl text-on-photograph mb-4">
            Counting down to the wedding
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Heart className="w-6 h-6 text-haldi mx-auto mb-8" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Countdown Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-4 max-w-2xl mx-auto gap-2 md:gap-6"
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="border-t border-zari/60 py-5 md:py-8 min-w-0"
            >
              <motion.span 
                className="block font-serif text-3xl md:text-6xl text-on-photograph mb-2 tabular-nums"
                key={block.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
              <span className="text-[10px] md:text-xs uppercase text-on-photograph/70">
                {block.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Date Reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-lg md:text-2xl italic text-on-photograph/80 mt-6 md:mt-10"
        >
          {wedding.dates} • {wedding.location}
        </motion.p>
      </div>
    </section>
  );
};

export default Countdown;
