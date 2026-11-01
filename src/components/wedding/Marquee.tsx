import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

const isMarathi = (text: string) => /[\u0900-\u097F]/.test(text);

const Marquee = () => {
  const { bride, groom } = wedding.marathiNames;
  const items = [wedding.names, `${bride} ❀ ${groom}`, wedding.dates, "शुभमंगल सावधान", wedding.location];

  return (
    <div className="py-5 bg-card border-b border-border overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex"
      >
        <div className="animate-marquee-slow flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center">
              {items.map((item) => (
                <span key={item} className="flex items-center">
                  <span lang={isMarathi(item) ? "mr" : undefined} className={`text-rose-foreground mx-5 ${isMarathi(item) ? "text-base" : "text-sm tracking-[0.25em] uppercase"}`}>
                    {item}
                  </span>
                  <span className="text-haldi">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="animate-marquee-slow flex whitespace-nowrap" aria-hidden>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center">
              {items.map((item) => (
                <span key={item} className="flex items-center">
                  <span lang={isMarathi(item) ? "mr" : undefined} className={`text-rose-foreground mx-5 ${isMarathi(item) ? "text-base" : "text-sm tracking-[0.25em] uppercase"}`}>
                    {item}
                  </span>
                  <span className="text-haldi">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
