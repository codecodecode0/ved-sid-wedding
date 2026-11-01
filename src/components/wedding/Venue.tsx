import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { wedding } from "@/lib/wedding";

/** Gold line art: Sahyadri table-top hills, a rising sun and the Mulshi backwaters. */
const SahyadriLineArt = () => (
  <svg viewBox="0 0 360 120" aria-hidden className="w-full max-w-sm mx-auto h-auto" fill="none" stroke="hsl(var(--zari))" strokeLinecap="round" strokeLinejoin="round">
    {/* Sun and rays */}
    <path d="M150 74 a30 30 0 0 1 60 0" strokeWidth="1.5" />
    {[-60, -35, -12, 12, 35, 60].map((deg) => (
      <line key={deg} x1="180" y1="36" x2="180" y2="28" strokeWidth="1.2" transform={`rotate(${deg} 180 74)`} />
    ))}
    {/* Birds */}
    <path d="M118 34 q5 -5 10 0 q5 -5 10 0" strokeWidth="1.2" />
    <path d="M226 26 q4 -4 8 0 q4 -4 8 0" strokeWidth="1.2" />
    {/* Table-top hills */}
    <path d="M8 76 L40 56 L78 54 L96 40 L136 38 L156 62" strokeWidth="1.5" />
    <path d="M204 62 L222 44 L270 42 L288 58 L318 56 L352 76" strokeWidth="1.5" />
    <path d="M60 76 Q110 58 150 74 M210 74 Q250 60 300 76" strokeWidth="1" opacity="0.6" />
    {/* Water line and ripples */}
    <line x1="4" y1="76" x2="356" y2="76" strokeWidth="1.5" />
    <line x1="150" y1="86" x2="210" y2="86" strokeWidth="1.2" opacity="0.8" />
    <line x1="162" y1="95" x2="198" y2="95" strokeWidth="1.2" opacity="0.6" />
    <line x1="172" y1="104" x2="188" y2="104" strokeWidth="1.2" opacity="0.4" />
    <path d="M40 90 q8 -3 16 0 t16 0 M288 92 q8 -3 16 0 t16 0" strokeWidth="1" opacity="0.6" />
  </svg>
);

/** Compact venue block at the top of the footer: line art, name and directions. */
const Venue = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="text-center"
  >
    <SahyadriLineArt />
    <p className="mt-6 text-xs tracking-[0.3em] uppercase text-on-photograph/60">The venue</p>
    <p className="font-serif text-3xl md:text-4xl mt-2">{wedding.venue}</p>
    <p className="text-sm tracking-[0.2em] uppercase text-on-photograph/70 mt-2">{wedding.location}</p>
    <p lang="mr" className="text-lg text-haldi mt-3">सह्याद्रीच्या कुशीत, आनंदाचा सोहळा.</p>
    <a
      href={wedding.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-zari/70 px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-zari hover:bg-zari hover:text-maroon-deep transition-colors"
    >
      <MapPin className="h-4 w-4" />
      Get directions
      <ArrowUpRight className="h-4 w-4" />
    </a>
  </motion.div>
);

export default Venue;
