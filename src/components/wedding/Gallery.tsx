import { motion } from "framer-motion";
import { gallery } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";

const Gallery = () => (
  <section className="py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 md:mb-20"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Little Moments</p>
        <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">Our Moments</h2>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">आठवणींच्या कुपीतले काही क्षण.</p>
        <LotusDivider className="mt-7" />
      </motion.div>

      <div className="max-w-6xl mx-auto columns-2 md:columns-3 gap-3 md:gap-5">
        {gallery.map((photo, index) => (
          <motion.figure
            key={photo.alt}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
            className="mb-3 md:mb-5 break-inside-avoid overflow-hidden group relative"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-zari/0 group-hover:border-zari/70 m-3 transition-colors duration-500 pointer-events-none" />
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
