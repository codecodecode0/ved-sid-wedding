import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { LotusDivider, PaithaniBorder } from "./Motifs";
import Monogram from "./Monogram";
import Venue from "./Venue";

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const Footer = () => {
  return (
    <footer id="venue" className="rangoli-texture text-on-photograph scroll-mt-16">
      <PaithaniBorder />
      <div className="container mx-auto px-6 py-14 md:py-20">
        <Venue />
        <LotusDivider light className="my-10" />

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p lang="mr" className="text-2xl md:text-3xl text-haldi mb-6">शुभमंगल सावधान</p>
          <Monogram className="mx-auto mb-4 h-20 w-20 md:h-24 md:w-24" />

          <p lang="mr" className="text-lg text-on-photograph/80 mb-6">
            {wedding.marathiNames.bride} ❀ {wedding.marathiNames.groom}
          </p>
          <motion.p 
            className="font-serif text-xl md:text-2xl italic mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {wedding.dates}
          </motion.p>

          <motion.p 
            className="mt-6 text-sm text-on-photograph/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Made with love for our forever
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
