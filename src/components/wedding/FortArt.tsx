/**
 * Hand-drawn SVG pieces for the fort-gate entrance: a basalt Maratha fort wall with rounded
 * kangoora battlements, a pointed stone gateway crowned with a dhal and crossed talwars,
 * spiked teak gate doors, and caparisoned elephants that stand guard on either side.
 *
 * The gateway, its doors and its glow share one 300 × 480 coordinate space so they line up
 * at any size; GATE_BOX positions the door leaves inside it.
 */

const STONE = "#6f6559";
const STONE_LIGHT = "#8f8273";
const MORTAR = "#463f37";
const IRON = "#2b2827";
const ZARI = "hsl(42 70% 64%)";
const MAROON = "hsl(350 62% 24%)";

/** The gate opening: pointed (two-centred) arch from x 40 to 260, springing at y 230 with its apex at y 105. */
const OPENING = "M40 480 L40 230 A126 126 0 0 1 150 105 A126 126 0 0 1 260 230 L260 480 Z";
const LEFT_LEAF = "M40 480 L40 230 A126 126 0 0 1 150 105 L150 480 Z";
const RIGHT_LEAF = "M150 105 A126 126 0 0 1 260 230 L260 480 L150 480 Z";

/** Where each door leaf sits inside the 300 × 480 gate, as percentages for CSS. */
export const LEAF_BOX = {
  left: { left: `${(40 / 300) * 100}%`, width: `${(110 / 300) * 100}%`, top: `${(105 / 480) * 100}%`, height: `${(375 / 480) * 100}%` },
  right: { left: `${(150 / 300) * 100}%`, width: `${(110 / 300) * 100}%`, top: `${(105 / 480) * 100}%`, height: `${(375 / 480) * 100}%` },
};

// Hill tones, darkening towards the viewer through the dawn haze.
const FAR_HILLS = "hsl(8 42% 38%)";
const FORT_HILL = "hsl(18 18% 27%)";
const NEAR_HILLS = "hsl(350 45% 16%)";
const LIT_WINDOW = "#ffc76b";
// The distant fort is built of the same basalt as the gate, a touch lighter in the haze.
const HILL_STONE = "#85776a";
const HILL_STONE_LIGHT = "#a3927f";
const HILL_MORTAR = "#51483f";

/** Rounded kangoora merlons along a rampart top, as one path: a tooth every `step` units. */
const merlons = (x0: number, x1: number, y: number, step = 4) =>
  Array.from({ length: Math.round((x1 - x0) / step) }, (_, i) => {
    const x = x0 + i * step;
    return `M${x + 0.6} ${y} V${y - 1.6} Q${x + step / 2} ${y - 3.6} ${x + step - 0.6} ${y - 1.6} V${y} Z`;
  }).join(" ");

/** A round buruj (bastion) centred on x, rising from the hill to `top`, shaded like a cylinder. */
const Bastion = ({ x, top, width = 16 }: { x: number; top: number; width?: number }) => {
  const half = width / 2;
  return (
    <g>
      <path d={`M${x - half} 64 V${top + 3} Q${x} ${top - 1} ${x + half} ${top + 3} V64 Z`} fill="url(#hill-blocks)" stroke={HILL_MORTAR} strokeWidth="0.5" />
      <path d={`M${x + half * 0.2} 64 V${top + 1.5} Q${x + half * 0.7} ${top + 1.8} ${x + half} ${top + 3} V64 Z`} fill="#000" opacity="0.22" />
      <path d={`M${x - half} ${top + 3} Q${x} ${top - 1} ${x + half} ${top + 3}`} fill="none" stroke={HILL_STONE_LIGHT} strokeWidth="1.2" />
      <path d={merlons(x - half, x + half, top + 2.2, width / 4)} fill={HILL_STONE} stroke={HILL_MORTAR} strokeWidth="0.3" />
    </g>
  );
};

/**
 * Sahyadri ranges fading into the dawn, with a Maratha hill fort of grey basalt on the flat summit:
 * a curtain wall with rounded kangoora merlons, round burujs, a pointed-arch mahadarwaja under a
 * nagarkhana, buildings inside with lit windows, a saffron flag, and a path winding up the scarp.
 * Drawn wide and cropped to the screen so the fort always sits in the middle.
 */
const DistantHills = ({ wallTop }: { wallTop: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 800 160"
    preserveAspectRatio="xMidYMax slice"
    className="absolute inset-x-0 w-full"
    style={{ bottom: `calc(100% - ${wallTop} - 2px)`, height: `calc((${wallTop}) * 0.42)` }}
  >
    <defs>
      <pattern id="hill-blocks" width="8" height="4" patternUnits="userSpaceOnUse">
        <rect width="8" height="4" fill={HILL_STONE} />
        <path d="M0 0.2 H8 M0 2.2 H8 M0.2 0 V2 M4.2 2 V4" stroke={HILL_MORTAR} strokeWidth="0.35" />
      </pattern>
    </defs>

    <path
      d="M0 160 V96 L46 82 L90 94 L138 72 L182 86 L224 66 L262 80 L300 70 L338 56 L372 72 L428 62 L470 74 L512 58 L560 76 L604 64 L650 82 L700 70 L752 88 L800 78 V160 Z"
      fill={FAR_HILLS}
    />

    {/* The fort's hill: a flat-topped basalt scarp with sheer cliffs */}
    <path
      d="M0 160 V124 L58 114 L118 122 L178 108 L236 114 L282 100 L310 90 L322 78 L328 62 L472 62 L478 78 L490 90 L518 100 L562 110 L620 104 L678 118 L740 110 L800 120 V160 Z"
      fill={FORT_HILL}
    />
    <path d="M330 64 L326 82 M342 64 L340 84 M356 64 L355 80 M446 64 L447 82 M460 64 L462 84 M470 64 L474 80" stroke="#000" strokeWidth="0.8" opacity="0.25" />
    <path d="M400 64 L392 74 L412 82 L380 94 L420 106 L370 122" fill="none" stroke="hsl(32 35% 55%)" strokeWidth="0.9" opacity="0.55" strokeLinecap="round" />

    {/* Buildings inside the walls, behind the ramparts */}
    <g fill={HILL_STONE} stroke={HILL_MORTAR} strokeWidth="0.4">
      <rect x="346" y="38" width="20" height="16" />
      <rect x="432" y="34" width="22" height="20" />
      <path d={merlons(432, 454, 34, 3.6)} />
      <rect x="370" y="42" width="12" height="12" />
    </g>
    <g fill={LIT_WINDOW}>
      <rect x="350" y="42" width="2" height="3" rx="0.8" />
      <rect x="356" y="42" width="2" height="3" rx="0.8" />
      <rect x="437" y="39" width="2" height="3" rx="0.8" />
      <rect x="443" y="39" width="2" height="3" rx="0.8" />
      <rect x="449" y="39" width="2" height="3" rx="0.8" />
    </g>

    {/* Curtain wall along the cliff edge */}
    <rect x="330" y="46" width="140" height="18" fill="url(#hill-blocks)" stroke={HILL_MORTAR} strokeWidth="0.5" />
    <path d={merlons(330, 470, 46.5)} fill={HILL_STONE} stroke={HILL_MORTAR} strokeWidth="0.3" />
    <rect x="330" y="46" width="140" height="1.2" fill={HILL_STONE_LIGHT} />

    {/* Bastions at the corners and on either side of the gate */}
    <Bastion x={332} top={36} width={18} />
    <Bastion x={364} top={40} />
    <Bastion x={436} top={40} />
    <Bastion x={468} top={36} width={18} />

    {/* Mahadarwaja: pointed arch gate flanked by two tall burujs, with the nagarkhana above */}
    <rect x="388" y="30" width="24" height="16" fill="url(#hill-blocks)" stroke={HILL_MORTAR} strokeWidth="0.5" />
    <path d={merlons(388, 412, 30, 4)} fill={HILL_STONE} stroke={HILL_MORTAR} strokeWidth="0.3" />
    {[393, 400, 407].map((x) => (
      <path key={x} d={`M${x - 1.6} 40 V36.5 Q${x} 33.5 ${x + 1.6} 36.5 V40 Z`} fill="#2d221b" />
    ))}
    <Bastion x={384} top={34} width={14} />
    <Bastion x={416} top={34} width={14} />
    <path d="M394 64 V55 Q394 49 400 47 Q406 49 406 55 V64 Z" fill="#2d221b" stroke={HILL_STONE_LIGHT} strokeWidth="0.8" />
    <path d="M396.5 64 V56 Q396.5 51.5 400 50 Q403.5 51.5 403.5 56 V64 Z" fill="#5a3a22" />
    <path d="M400 50.5 V64" stroke="#2d1a0e" strokeWidth="0.5" />

    {/* Saffron flag over the nagarkhana */}
    <rect x="399.4" y="8" width="1.2" height="22" fill="#3b2a1d" />
    <path d="M400.6 8.5 L414 12 L405.5 14.5 L414 17 L400.6 20.5 Z" fill="hsl(28 95% 55%)" />

    {/* Dawn haze over everything behind the nearest ridge, so the fort reads as far away */}
    <rect width="800" height="160" fill="hsl(10 45% 38%)" opacity="0.38" />

    {/* Birds heading home */}
    <path d="M250 30 q4 -3 8 0 q4 -3 8 0 M272 22 q3 -2.5 6 0 q3 -2.5 6 0 M530 34 q4 -3 8 0 q4 -3 8 0" fill="none" stroke={NEAR_HILLS} strokeWidth="1.2" />
    <path d="M0 160 V142 Q100 128 200 140 T400 136 T600 140 T800 134 V160 Z" fill={NEAR_HILLS} />
  </svg>
);

/** Dawn sky, the fort wall in dressed basalt blocks, and a row of rounded battlements along its top. */
export const FortWall = ({ wallTop }: { wallTop: string }) => (
  <div aria-hidden className="absolute inset-0">
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, hsl(350 55% 12%) 0%, hsl(350 50% 22%) 30%, hsl(12 60% 42%) 62%, hsl(32 85% 62%) 100%)" }}
    />
    {/* Rising sun behind the gateway */}
    <div
      className="absolute left-1/2 -translate-x-1/2 h-[60vw] w-[60vw] max-h-80 max-w-80 rounded-full"
      style={{ top: `calc(${wallTop} - min(30vw, 10rem))`, background: "radial-gradient(circle, hsl(40 100% 80% / 0.9) 0%, hsl(32 95% 62% / 0.45) 40%, transparent 70%)" }}
    />
    <DistantHills wallTop={wallTop} />
    <div className="absolute inset-x-0 bottom-0" style={{ top: wallTop }}>
      <svg className="absolute -top-[25px] left-0 h-[26px] w-full">
        <defs>
          <pattern id="fort-merlon" width="44" height="26" patternUnits="userSpaceOnUse">
            <path d="M6 26 V12 Q6 2 22 2 Q38 2 38 12 V26 Z" fill={STONE} stroke={MORTAR} strokeWidth="1.5" />
            <path d="M18 26 V16 Q22 12 26 16 V26 Z" fill={MORTAR} opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fort-merlon)" />
      </svg>
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="fort-blocks" width="64" height="40" patternUnits="userSpaceOnUse">
            <rect width="64" height="40" fill={STONE} />
            <path d="M0 0.5 H64 M0 20.5 H64 M0.5 0 V20 M32.5 20 V40" stroke={MORTAR} strokeWidth="1.5" />
            <path d="M6 6 h18 M38 27 h16" stroke={STONE_LIGHT} strokeWidth="1" opacity="0.5" />
          </pattern>
          <linearGradient id="fort-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#fort-blocks)" />
        <rect width="100%" height="100%" fill="url(#fort-shade)" />
        <rect y="0" width="100%" height="5" fill={STONE_LIGHT} />
      </svg>
    </div>
  </div>
);

/** Warm light from inside the fort, seen once the doors part. */
export const GateGlow = () => (
  <svg aria-hidden viewBox="0 0 300 480" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id="fort-glow" cx="50%" cy="70%" r="70%">
        <stop offset="0" stopColor="#fff4d6" />
        <stop offset="0.45" stopColor="#f6c56f" />
        <stop offset="1" stopColor="#a9482a" />
      </radialGradient>
    </defs>
    <path d={OPENING} fill="url(#fort-glow)" />
  </svg>
);

const spikeColumns = { left: [56, 79, 102, 125], right: [175, 198, 221, 244] };
const spikeRows = [150, 188, 268, 305, 385, 422];
const strapRows = [228, 345, 460];

/** One spiked teak door leaf, cut to its half of the pointed arch. */
export const GateLeaf = ({ side }: { side: "left" | "right" }) => {
  const viewBox = side === "left" ? "40 105 110 375" : "150 105 110 375";
  const clip = `fort-leaf-${side}`;
  const seamX = side === "left" ? 145 : 150;
  const ringX = side === "left" ? 136 : 164;
  return (
    <svg aria-hidden viewBox={viewBox} preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <defs>
        <clipPath id={clip}>
          <path d={side === "left" ? LEFT_LEAF : RIGHT_LEAF} />
        </clipPath>
        <pattern id={`fort-planks-${side}`} width="18" height="480" patternUnits="userSpaceOnUse">
          <rect width="18" height="480" fill="#4d2c17" />
          <rect x="16.5" width="1.5" height="480" fill="#2a160a" />
          <path d="M5 0 V480 M10 0 V480" stroke="#65391d" strokeWidth="0.6" opacity="0.7" />
        </pattern>
        <radialGradient id={`fort-spike-${side}`} cx="35%" cy="32%" r="70%">
          <stop offset="0" stopColor="#d9d3cb" />
          <stop offset="0.35" stopColor="#7d7672" />
          <stop offset="1" stopColor="#1f1c1b" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect x="40" y="105" width="220" height="375" fill={`url(#fort-planks-${side})`} />
        {strapRows.map((y) => (
          <g key={y}>
            <rect x="40" y={y} width="220" height="8" fill={IRON} />
            {Array.from({ length: 16 }, (_, i) => (
              <circle key={i} cx={46 + i * 14} cy={y + 4} r="1.6" fill="#8d8682" />
            ))}
          </g>
        ))}
        {spikeRows.flatMap((y) =>
          spikeColumns[side].map((x) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y + 2} r="7.5" fill="#000" opacity="0.35" />
              <circle cx={x} cy={y} r="7" fill={`url(#fort-spike-${side})`} />
              <circle cx={x - 1.5} cy={y - 1.8} r="1.4" fill="#f4f1ec" />
            </g>
          )),
        )}
        <rect x={seamX} y="105" width="5" height="375" fill="#1d0f06" opacity="0.8" />
        <circle cx={ringX} cy="318" r="7" fill="none" stroke={IRON} strokeWidth="2.5" />
        <circle cx={ringX} cy="311" r="2.5" fill={IRON} />
      </g>
    </svg>
  );
};

/** A pair of curved talwars crossed behind a round dhal with four bosses. */
const SwordsAndShield = () => (
  <g>
    {[1, -1].map((dir) => (
      <g key={dir} transform={`translate(150 52) scale(${dir} 1)`}>
        <path d="M-40 34 Q -4 4 44 -30" fill="none" stroke="#e6e3de" strokeWidth="4" strokeLinecap="round" />
        <path d="M-40 34 Q -4 4 44 -30" fill="none" stroke="#9c9893" strokeWidth="1" />
        <path d="M-46 28 L-34 40" stroke={ZARI} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M-41 35 L-52 46" stroke={MAROON} strokeWidth="4" strokeLinecap="round" />
        <circle cx="-54" cy="48" r="3.5" fill={ZARI} />
      </g>
    ))}
    <circle cx="150" cy="52" r="27" fill="#3b2314" stroke={ZARI} strokeWidth="3" />
    <circle cx="150" cy="52" r="21" fill="none" stroke={ZARI} strokeWidth="1" opacity="0.6" />
    {[
      [140, 42],
      [160, 42],
      [140, 62],
      [160, 62],
    ].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="3.6" fill={ZARI} stroke="#7a5a20" strokeWidth="0.8" />
    ))}
    <circle cx="150" cy="52" r="5" fill={MAROON} stroke={ZARI} strokeWidth="1.5" />
  </g>
);

/** A flaming torch in an iron bracket; the flame flickers in CSS. */
const Torch = ({ x }: { x: number }) => (
  <g transform={`translate(${x} 214)`}>
    <path d="M-3 0 H3 L2 22 H-2 Z" fill={IRON} />
    <path d="M-6 0 H6" stroke={IRON} strokeWidth="3" strokeLinecap="round" />
    <g className="fort-flame" style={{ transformOrigin: `${x}px 214px` }}>
      <path d="M0 -20 C 7 -10, 7 -3, 0 0 C -7 -3, -7 -10, 0 -20 Z" fill="#f7a531" />
      <path d="M0 -12 C 3.5 -6, 3.5 -2, 0 0 C -3.5 -2, -3.5 -6, 0 -12 Z" fill="#fff0b3" />
    </g>
  </g>
);

/** The stone gateway itself: pointed arch of dressed blocks, keystone, threshold, torches and the crest above. */
export const GateFrame = () => (
  <svg aria-hidden viewBox="0 0 300 480" className="absolute inset-0 h-full w-full overflow-visible">
    <path
      fillRule="evenodd"
      fill={STONE_LIGHT}
      stroke={MORTAR}
      strokeWidth="1.5"
      d={`M27 480 L27 230 A139 139 0 0 1 150 92 A139 139 0 0 1 273 230 L273 480 Z ${OPENING}`}
    />
    <path
      d="M33.5 480 L33.5 230 A132.5 132.5 0 0 1 150 98.5 A132.5 132.5 0 0 1 266.5 230 L266.5 480"
      fill="none"
      stroke={MORTAR}
      strokeWidth="13"
      strokeDasharray="1.5 16"
    />
    <path d="M27 230 H40 M260 230 H273" stroke={MORTAR} strokeWidth="2" />
    <path d="M143 88 L157 88 L154 108 L146 108 Z" fill={ZARI} stroke="#7a5a20" strokeWidth="1" />
    <rect x="16" y="472" width="268" height="8" fill={STONE} stroke={MORTAR} strokeWidth="1" />
    <Torch x={14} />
    <Torch x={286} />
    <SwordsAndShield />
  </svg>
);

/**
 * A caparisoned elephant facing right, trunk raised in welcome: saffron-and-maroon jhool with zari
 * borders, a gold forehead piece, anklets and a small ambari on its back. Mirror it to face left.
 */
export const Elephant = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg aria-hidden viewBox="0 0 210 180" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <defs>
      <linearGradient id="el-skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a3a1a6" />
        <stop offset="1" stopColor="#6d6b72" />
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="174" rx="88" ry="5" fill="#000" opacity="0.3" />
    {/* tail */}
    <path d="M26 82 C 18 98, 16 112, 18 126" fill="none" stroke="#6d6b72" strokeWidth="3" strokeLinecap="round" />
    <path d="M18 124 l-3 8 l6 -1 z" fill="#3c3a40" />
    {/* far legs */}
    <rect x="50" y="110" width="22" height="58" rx="7" fill="#5f5d64" />
    <rect x="128" y="110" width="22" height="58" rx="7" fill="#5f5d64" />
    {/* body */}
    <ellipse cx="90" cy="86" rx="64" ry="46" fill="url(#el-skin)" />
    {/* near legs */}
    <rect x="34" y="112" width="24" height="58" rx="8" fill="url(#el-skin)" />
    <rect x="110" y="112" width="24" height="58" rx="8" fill="url(#el-skin)" />
    {[34, 110].map((x) => (
      <g key={x}>
        <rect x={x} y="148" width="24" height="6" fill={ZARI} />
        {[4, 10, 16, 22].map((d) => (
          <circle key={d} cx={x + d - 1} cy="157" r="1.8" fill={ZARI} />
        ))}
        <path d={`M${x + 4} 170 q3 -4 6 0 M${x + 13} 170 q3 -4 6 0`} stroke="#e8e2d6" strokeWidth="1.5" fill="none" />
      </g>
    ))}
    {/* jhool (saddle cloth) */}
    <path d="M40 54 Q 92 32 142 52 L 136 118 Q 90 128 44 118 Z" fill={MAROON} stroke={ZARI} strokeWidth="3" />
    <path d="M52 62 Q 92 46 132 60 L 128 108 Q 90 116 54 108 Z" fill="none" stroke={ZARI} strokeWidth="1" opacity="0.7" />
    <path d="M60 70 Q 92 58 124 70 L 121 100 Q 90 106 62 100 Z" fill="hsl(28 90% 50%)" opacity="0.9" />
    {[72, 90, 108].map((x) => (
      <circle key={x} cx={x} cy="85" r="4" fill={ZARI} />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <circle key={i} cx={48 + i * 9.6} cy={121 + Math.sin((i / 9) * Math.PI) * 4} r="2.4" fill={ZARI} />
    ))}
    {/* ambari (howdah) */}
    <rect x="66" y="34" width="50" height="10" rx="2" fill={ZARI} stroke="#7a5a20" strokeWidth="1" />
    <path d="M70 34 V18 M112 34 V18" stroke={ZARI} strokeWidth="2.5" />
    <path d="M64 19 Q 91 -6 118 19 Z" fill={MAROON} stroke={ZARI} strokeWidth="2" />
    <circle cx="91" cy="4" r="3" fill={ZARI} />
    {/* head */}
    <circle cx="156" cy="70" r="32" fill="url(#el-skin)" />
    {/* ear */}
    <path d="M140 46 C 118 50, 116 92, 136 104 C 146 96, 150 70, 140 46 Z" fill="#7d7b82" stroke="#5c5a61" strokeWidth="1" />
    {/* trunk, raised */}
    <path d="M178 86 C 194 92, 202 70, 198 50 C 196 38, 204 30, 208 38" fill="none" stroke="url(#el-skin)" strokeWidth="15" strokeLinecap="round" />
    <path d="M182 92 C 196 96, 206 74, 202 52" fill="none" stroke="#5c5a61" strokeWidth="1" opacity="0.6" />
    {/* tusk */}
    <path d="M172 94 C 182 104, 192 104, 198 96" fill="none" stroke="#f3eee2" strokeWidth="5" strokeLinecap="round" />
    {/* forehead ornament */}
    <path d="M148 40 Q 166 34 182 46 L 172 84 Z" fill={ZARI} stroke="#7a5a20" strokeWidth="1" />
    <circle cx="168" cy="54" r="3.5" fill={MAROON} />
    <circle cx="170" cy="66" r="2.5" fill={MAROON} />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={152 + i * 6} cy={42 - Math.sin((i / 4) * Math.PI) * 3} r="1.8" fill="#fffaf0" />
    ))}
    {/* eye */}
    <circle cx="163" cy="74" r="2.4" fill="#1d1b1f" />
    <path d="M158 70 q5 -3 10 0" stroke="#3c3a40" strokeWidth="1" fill="none" />
  </svg>
);
