import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { wedding } from "@/lib/wedding";
import { LotusDivider, PaithaniBorder, Toran } from "./Motifs";
import AddToCalendar from "./AddToCalendar";
import PhotoCarousel from "./PhotoCarousel";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: "easeOut" as const },
});

const Hero = () => (
  <section className="relative rangoli-texture text-on-photograph overflow-hidden">
    <div className="absolute top-0 inset-x-0 z-10">
      <Toran />
    </div>

    <div className="container mx-auto px-6 pt-24 pb-12 min-h-[88svh] flex items-center">
      <div className="grid gap-12 items-center w-full">
        <div className="text-center order-1">
          <motion.div
            {...fade(0.1)}
            lang="mr"
            aria-hidden
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-zari/70 ring-1 ring-zari/20 ring-offset-4 ring-offset-transparent text-4xl text-zari leading-none"
          >
            {/* The Devanagari font reserves deep space below the baseline, so the glyph's ink sits high; nudge it to the optical center */}
            <span className="inline-block translate-y-[0.26em]">ॐ</span>
          </motion.div>
          <motion.p {...fade(0.2)} lang="mr" className="mt-5 text-zari text-base">
            ॥ श्री गणेशाय नमः ॥
          </motion.p>
          <motion.p {...fade(0.25)} lang="mr" className="mt-1 text-zari text-base">
            ॥ जय जय रघुवीर समर्थ ॥
          </motion.p>

          <motion.p {...fade(0.35)} lang="mr" className="mt-6 text-3xl text-haldi">
            शुभ विवाह
          </motion.p>
          <motion.p {...fade(0.45)} className="mt-3 text-xs tracking-[0.3em] uppercase text-on-photograph/70">
            Together with their families
          </motion.p>

          <motion.h1 {...fade(0.6)} className="heading-display font-serif mt-8 text-6xl">
            <span className="block">Vedangi</span>
            <span className="block text-3xl italic text-zari my-3">&</span>
            <span className="block">Siddhant</span>
          </motion.h1>

          <motion.p {...fade(0.75)} lang="mr" className="mt-5 text-xl text-on-photograph/80">
            {wedding.marathiNames.bride} <span className="text-zari">❀</span> {wedding.marathiNames.groom}
          </motion.p>

          <motion.div {...fade(0.9)}>
            <LotusDivider light className="my-8" />
            <p className="text-base tracking-[0.2em] uppercase text-on-photograph/85">
              {wedding.dates}
            </p>
            <a
              href={wedding.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${wedding.venue}, ${wedding.location} (opens in Google Maps)`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-on-photograph/60 underline decoration-dotted decoration-zari/40 underline-offset-[6px] hover:text-zari hover:decoration-zari transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-zari/80 shrink-0" />
              {wedding.venue} • {wedding.location}
            </a>
            <div className="mt-6">
              <AddToCalendar className="border-zari/70 bg-transparent text-zari hover:bg-zari/15 hover:text-zari" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="order-2 mx-auto w-full max-w-[19rem]"
        >
          <PhotoCarousel />
        </motion.div>
      </div>
    </div>

    <PaithaniBorder />
  </section>
);

export default Hero;
