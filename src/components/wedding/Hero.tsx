import { motion } from "framer-motion";
import { photos, wedding } from "@/lib/wedding";
import { LotusDivider, PaithaniBorder, Toran } from "./Motifs";

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

    <div className="container mx-auto px-6 pt-24 pb-16 md:pt-28 md:pb-20 min-h-[92svh] flex items-center">
      <div className="grid lg:grid-cols-[1fr_minmax(0,26rem)] gap-12 lg:gap-20 items-center w-full max-w-6xl mx-auto">
        <div className="text-center lg:text-left order-1">
          <motion.p {...fade(0.2)} lang="mr" className="text-zari text-base md:text-lg">
            ॥ श्री गणेशाय नमः ॥
          </motion.p>

          <motion.p {...fade(0.35)} lang="mr" className="mt-6 text-3xl md:text-4xl text-haldi">
            शुभ विवाह
          </motion.p>
          <motion.p {...fade(0.45)} className="mt-3 text-xs md:text-sm tracking-[0.3em] uppercase text-on-photograph/70">
            Together with their families
          </motion.p>

          <motion.h1 {...fade(0.6)} className="heading-display font-serif mt-8 text-6xl sm:text-7xl md:text-8xl">
            <span className="block">Vedangi</span>
            <span className="block text-3xl md:text-4xl italic text-zari my-3 md:my-4">&</span>
            <span className="block">Siddhant</span>
          </motion.h1>

          <motion.p {...fade(0.75)} lang="mr" className="mt-5 text-xl md:text-2xl text-on-photograph/80">
            {wedding.marathiNames.bride} <span className="text-zari">❀</span> {wedding.marathiNames.groom}
          </motion.p>

          <motion.div {...fade(0.9)}>
            <LotusDivider light className="my-8 lg:justify-start" />
            <p className="text-base md:text-lg tracking-[0.2em] uppercase text-on-photograph/85">
              {wedding.dates}
            </p>
            <p className="mt-3 text-xs md:text-sm tracking-[0.15em] uppercase text-on-photograph/60">
              {wedding.venue} • {wedding.location}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="order-2 mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none"
        >
          <div className="relative p-2.5 arch-frame border border-zari/60">
            <img
              src={photos.hero.src}
              alt={photos.hero.alt}
              width={1067}
              height={1600}
              fetchPriority="high"
              className="arch-frame w-full aspect-[3/4] object-cover object-[55%_60%]"
            />
            <div className="absolute inset-5 arch-frame border border-zari/40 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </div>

    <PaithaniBorder />
  </section>
);

export default Hero;
