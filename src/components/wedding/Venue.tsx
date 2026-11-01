import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { wedding } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";

const Palm = ({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill="hsl(155 40% 14%)">
    <path d="M0 0 C 4 -40, 10 -80, 22 -118" stroke="hsl(25 30% 22%)" strokeWidth="6" fill="none" strokeLinecap="round" />
    <g transform="translate(22 -118)">
      <path d="M0 0 C -20 -14, -46 -10, -62 8 C -40 -2, -20 -2, 0 0Z" />
      <path d="M0 0 C -14 -24, -36 -34, -56 -30 C -34 -22, -16 -12, 0 0Z" />
      <path d="M0 0 C 4 -26, 20 -42, 40 -46 C 24 -32, 12 -16, 0 0Z" />
      <path d="M0 0 C 20 -14, 46 -14, 64 2 C 42 -4, 20 -4, 0 0Z" />
      <path d="M0 0 C 14 6, 30 22, 34 42 C 24 26, 12 12, 0 0Z" />
      <path d="M0 0 C -12 8, -24 24, -26 44 C -18 26, -10 12, 0 0Z" />
    </g>
  </g>
);

const Tree = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <g>
    <rect x={x - 3} y={y} width="6" height={r * 0.9} fill="hsl(25 30% 18%)" />
    <circle cx={x} cy={y - r * 0.2} r={r} fill="hsl(150 35% 17%)" />
    <circle cx={x - r * 0.6} cy={y + r * 0.2} r={r * 0.7} fill="hsl(150 32% 20%)" />
    <circle cx={x + r * 0.6} cy={y + r * 0.15} r={r * 0.75} fill="hsl(155 38% 15%)" />
  </g>
);

const bulbs = Array.from({ length: 13 }, (_, i) => {
  const t = i / 12;
  const x = 300 + t * 600;
  const sag = Math.sin(t * Math.PI * 2) ** 2 * 26;
  return { x, y: 500 + sag };
});

/**
 * Illustrated impression of the venue at golden hour among the Sahyadri hills.
 * The important parts sit between x=320 and x=880 so the phone crop keeps them.
 */
const ResortIllustration = () => (
  <svg
    viewBox="0 0 1200 760"
    preserveAspectRatio="xMidYMax slice"
    role="img"
    aria-label="Illustration of the wedding venue at sunset, among the Sahyadri hills near the Mulshi backwaters"
    className="absolute inset-0 h-full w-full"
  >
    <defs>
      <linearGradient id="v-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(350 50% 18%)" />
        <stop offset="0.45" stopColor="hsl(8 55% 38%)" />
        <stop offset="0.75" stopColor="hsl(28 80% 58%)" />
        <stop offset="1" stopColor="hsl(42 90% 74%)" />
      </linearGradient>
      <radialGradient id="v-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="hsl(45 100% 85%)" stopOpacity="0.9" />
        <stop offset="1" stopColor="hsl(40 100% 70%)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="v-lake" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(38 85% 72%)" />
        <stop offset="1" stopColor="hsl(15 45% 42%)" />
      </linearGradient>
      <linearGradient id="v-pool" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(32 80% 66%)" />
        <stop offset="0.35" stopColor="hsl(185 45% 42%)" />
        <stop offset="1" stopColor="hsl(190 55% 24%)" />
      </linearGradient>
      <linearGradient id="v-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(38 55% 88%)" />
        <stop offset="1" stopColor="hsl(28 35% 70%)" />
      </linearGradient>
    </defs>

    {/* Sky, stars and sun */}
    <rect width="1200" height="560" fill="url(#v-sky)" />
    {[[120, 60], [260, 120], [410, 50], [980, 80], [1100, 140], [760, 40], [560, 110], [880, 150]].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="hsl(45 90% 90%)" opacity="0.8" />
    ))}
    <circle cx="640" cy="360" r="170" fill="url(#v-glow)" />
    <circle cx="640" cy="360" r="62" fill="hsl(44 100% 86%)" />
    {[[540, 250], [575, 228], [700, 210]].map(([x, y]) => (
      <path key={x} d={`M${x} ${y} q 8 -8 16 0 q 8 -8 16 0`} stroke="hsl(350 45% 18%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    ))}

    {/* Sahyadri table-top mesas */}
    <path
      d="M0 420 L70 380 L170 372 L220 330 L360 326 L410 362 L520 372 L585 318 L745 314 L790 352 L900 360 L975 312 L1110 306 L1160 344 L1200 350 V470 H0Z"
      fill="hsl(345 28% 34%)"
      opacity="0.85"
    />
    <path d="M0 450 Q 140 400 280 432 T 560 428 T 860 420 T 1200 440 V480 H0Z" fill="hsl(330 22% 26%)" />

    {/* Mulshi backwaters */}
    <rect y="450" width="1200" height="44" fill="url(#v-lake)" />
    {[[560, 462, 160], [600, 474, 90], [400, 470, 70], [820, 468, 80], [180, 476, 60]].map(([x, y, w]) => (
      <line key={`${x}-${y}`} x1={x} y1={y} x2={x + w} y2={y} stroke="hsl(45 100% 88%)" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
    ))}

    {/* Forested ridge and lawn */}
    <path d="M0 500 Q 150 470 300 492 T 620 488 T 940 486 T 1200 496 V760 H0Z" fill="hsl(155 34% 17%)" />
    <rect y="540" width="1200" height="70" fill="hsl(140 30% 24%)" />

    {/* Distant trees */}
    <Tree x={110} y={500} r={34} />
    <Tree x={210} y={512} r={26} />
    <Tree x={1010} y={506} r={30} />
    <Tree x={1110} y={498} r={38} />

    {/* Banquet hall with glowing arches */}
    <g>
      <rect x="318" y="440" width="150" height="100" fill="url(#v-wall)" />
      <rect x="310" y="430" width="166" height="14" fill="hsl(15 50% 38%)" />
      <path d="M362 430 q 31 -36 62 0" fill="hsl(15 50% 38%)" />
      {[336, 378, 420].map((x) => (
        <path key={x} d={`M${x} 530 v-50 q 15 -22 30 0 v50z`} fill="hsl(42 100% 70%)" stroke="hsl(15 50% 38%)" strokeWidth="2" />
      ))}
    </g>

    {/* Main block with balcony rooms */}
    <g>
      <path d="M455 372 L630 330 L805 372Z" fill="hsl(15 52% 36%)" />
      <rect x="472" y="370" width="316" height="170" fill="url(#v-wall)" />
      {[388, 432, 476].map((y, row) =>
        Array.from({ length: 8 }, (_, i) => (
          <rect
            key={`${row}-${i}`}
            x={490 + i * 37}
            y={y}
            width="22"
            height="28"
            rx="2"
            fill={(row * 3 + i) % 5 === 0 ? "hsl(30 30% 40%)" : "hsl(43 100% 68%)"}
          />
        )),
      )}
      {[418, 462, 506].map((y) => (
        <g key={y}>
          <line x1="478" y1={y} x2="782" y2={y} stroke="hsl(25 35% 30%)" strokeWidth="3" />
          <line x1="478" y1={y - 8} x2="782" y2={y - 8} stroke="hsl(25 35% 30%)" strokeWidth="1" opacity="0.6" />
        </g>
      ))}
      <rect x="610" y="506" width="40" height="34" fill="hsl(43 100% 70%)" />
    </g>

    {/* Spa cottage */}
    <g>
      <rect x="806" y="482" width="78" height="58" fill="url(#v-wall)" />
      <path d="M796 486 L845 452 L894 486Z" fill="hsl(15 52% 36%)" />
      <rect x="834" y="506" width="22" height="34" rx="11" fill="hsl(43 100% 70%)" />
      <path d="M845 472 c -6 6 -6 10 0 14 c 6 -4 6 -8 0 -14z M837 480 c 0 6 4 8 8 6 M853 480 c 0 6 -4 8 -8 6" fill="hsl(43 100% 70%)" stroke="hsl(43 100% 70%)" strokeWidth="1" />
    </g>

    {/* Fairy lights across the lawn */}
    <path d={`M${bulbs.map((b) => `${b.x} ${b.y}`).join(" L")}`} fill="none" stroke="hsl(30 30% 20%)" strokeWidth="1" />
    {bulbs.map((b) => (
      <circle key={b.x} cx={b.x} cy={b.y + 3} r="3.5" fill="hsl(46 100% 75%)" />
    ))}

    <Palm x={330} y={600} s={1.05} flip />
    <Palm x={872} y={600} s={1.15} />
    <Palm x={60} y={610} s={1.3} flip />
    <Palm x={1150} y={612} s={1.25} />

    {/* Infinity pool with the sun's reflection */}
    <rect y="600" width="1200" height="84" fill="url(#v-pool)" />
    <line x1="0" y1="601" x2="1200" y2="601" stroke="hsl(45 100% 88%)" strokeWidth="2" />
    <ellipse cx="640" cy="618" rx="90" ry="6" fill="hsl(45 100% 86%)" opacity="0.8" />
    <ellipse cx="640" cy="636" rx="60" ry="4" fill="hsl(45 100% 86%)" opacity="0.55" />
    <ellipse cx="640" cy="654" rx="34" ry="3" fill="hsl(45 100% 86%)" opacity="0.35" />
    {[[420, 628], [860, 640], [250, 650], [1000, 624]].map(([x, y]) => (
      <path key={x} d={`M${x} ${y} q 10 -4 20 0 t 20 0`} stroke="hsl(180 50% 75%)" strokeWidth="1.5" fill="none" opacity="0.6" />
    ))}

    {/* Deck with loungers and umbrellas */}
    <rect y="684" width="1200" height="76" fill="hsl(28 32% 26%)" />
    <line x1="0" y1="685" x2="1200" y2="685" stroke="hsl(40 60% 70%)" strokeWidth="2" opacity="0.6" />
    {[400, 760].map((x) => (
      <g key={x}>
        <line x1={x} y1="736" x2={x} y2="664" stroke="hsl(30 20% 85%)" strokeWidth="3" />
        <path d={`M${x - 46} 668 Q ${x} 630 ${x + 46} 668Z`} fill="hsl(350 55% 32%)" />
        <path d={`M${x - 46} 668 Q ${x - 15} 655 ${x} 668 Q ${x + 15} 655 ${x + 46} 668`} fill="none" stroke="hsl(var(--zari))" strokeWidth="2" />
        <path d={`M${x + 20} 730 h 56 l 18 -18`} stroke="hsl(38 50% 88%)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={`M${x - 96} 730 h 56 l 18 -18`} stroke="hsl(38 50% 88%)" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

const Venue = () => (
  <section className="py-16 md:py-20 bg-background overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-10"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Where we celebrate</p>
        <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">Join us in Mulshi</h2>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">सह्याद्रीच्या कुशीत, आनंदाचा सोहळा.</p>
        <LotusDivider className="mt-7" />
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative p-2 border border-zari/70 rounded-t-[5rem] md:rounded-t-[10rem]">
          <div className="relative overflow-hidden rounded-t-[4.5rem] md:rounded-t-[9.5rem] aspect-[16/10] md:aspect-[21/8]">
            <ResortIllustration />
            <div className="hidden md:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/50 to-transparent px-10 pt-16 pb-8">
              <p className="font-serif text-4xl text-white">Golden hour in the Sahyadris</p>
              <a
                href={wedding.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] uppercase text-zari hover:text-white transition-colors"
              >
                <MapPin className="h-4 w-4" />
                {wedding.venue} · Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <figcaption className="mt-4 text-center">
          <p className="md:hidden font-serif text-2xl">Golden hour in the Sahyadris</p>
          <a
            href={wedding.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden mt-2 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-rose-foreground underline underline-offset-4 decoration-zari"
          >
            <MapPin className="h-4 w-4" />
            Get directions
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </figcaption>
      </motion.figure>

    </div>
  </section>
);

export default Venue;
