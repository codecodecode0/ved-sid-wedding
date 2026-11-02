import monogram from "@/assets/monogram.png";

/** The Mundavalya "VS" monogram, the same artwork as the favicon. */
const Monogram = ({ className = "" }: { className?: string }) => (
  <img src={monogram} alt="V S" width={256} height={256} className={`rounded-full ring-1 ring-zari/60 ${className}`} />
);

export default Monogram;
