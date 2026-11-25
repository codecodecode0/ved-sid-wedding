import engagementImage from "@/assets/event-engagement.jpg";
import haldiImage from "@/assets/event-haldi.jpg";
import sangeetImage from "@/assets/sangeet-modern.jpg";
import saptapadiImage from "@/assets/event-saptapadi.jpg";
import baaratImage from "@/assets/baarat-celebration-details.jpg";
import receptionImage from "@/assets/event-reception.jpg";
import heroRing from "@/assets/photos/hero-ring.jpg";
import firstGlanceImage from "@/assets/photos/story-first-glance.jpg";
import adventuresImage from "@/assets/photos/story-adventures.jpg";
import proposalImage from "@/assets/photos/story-proposal.jpg";
import countdownImage from "@/assets/photos/countdown-proposal-meadow.jpg";
import rsvpImage from "@/assets/photos/rsvp-invitation.jpg";
import boatAboveImage from "@/assets/photos/gallery-boat-above.jpg";
import boatWaveImage from "@/assets/photos/gallery-boat-wave.jpg";
import graduationImage from "@/assets/photos/story-graduation.jpg";
import sunnyLawnImage from "@/assets/photos/story-sunny-lawn.jpg";
import embraceImage from "@/assets/photos/gallery-embrace.jpg";
import pointingImage from "@/assets/photos/gallery-pointing.jpg";
import ringImage from "@/assets/photos/story-ring.jpg";

export const wedding = {
  names: "Vedangi & Siddhant",
  marathiNames: { bride: "वेदांगी", groom: "सिद्धांत" },
  dates: "January 28–29, 2027",
  venue: "The Foresta Resort",
  location: "Mulshi, Pune",
  mapUrl: "https://share.google/DxVHqyg0djySK7CFR",
  address: "The Foresta Resort, Mulshi, Pune, Maharashtra, India",
  siteUrl: "https://vedsid.com/",
  ceremonyAt: "2027-01-29T09:00:00+05:30",
};

export type OutfitTone = "rose" | "haldi" | "plum" | "sand" | "emerald";
export type OutfitSwatch = { name: string; hex: string };

export type CelebrationEvent = {
  title: string; marathiTitle: string; time: string; durationMinutes: number;
  quote: string;
  description: string;
  dressCode: string; attire: string; attireNote?: string; outfitTone: OutfitTone; swatches?: OutfitSwatch[];
  image: string; imageAlt: string;
};

/** Baarat and Reception run back to back, so guests wear one outfit for both. */
const eveningOutfit = {
  dressCode: "Elegant evening formal",
  attire: "Silk sarees, elegant lehengas, suits or bandhgalas; rich colours and refined details for the evening.",
  outfitTone: "emerald",
} satisfies Partial<CelebrationEvent>;

export const celebrationDays: { date: string; label: string; events: CelebrationEvent[] }[] = [
  {
    date: "2027-01-28",
    label: "Thursday, January 28",
    events: [
      {
        title: "Engagement", marathiTitle: "साखरपुडा", time: "9:00 AM", durationMinutes: 120,
        quote: "साखरेच्या गोडव्याने, जुळले दोन मनांचे धागे.",
        description: "A sweet sakharpuda to start it all: rings exchanged, two families joined.",
        dressCode: "Ethnic elegance", attire: "Sarees, salwar suits or kurtas with thoughtful accessories for a graceful morning celebration.", outfitTone: "rose",
        image: engagementImage, imageAlt: "Gold engagement rings surrounded by jasmine and pink flowers",
      },
      {
        title: "Haldi Carnival", marathiTitle: "हळदीचा सोहळा", time: "2:00 PM", durationMinutes: 150,
        quote: "हळदीचा रंग, आनंदाची उधळण; हसत खेळत साजरा करू हा क्षण!",
        description: "An afternoon of turmeric, laughter and happy, playful chaos.",
        dressCode: "Light pastel yellows", attire: "Light pastel yellow, lemon or cream sarees, kurtas or floral outfits in airy fabrics, with comfortable flats. Please keep to light shades only, nothing dark or bright, and choose something you don’t mind getting a little haldi on.", attireNote: "Light shades only, nothing dark or bright", outfitTone: "haldi",
        swatches: [
          { name: "Cream", hex: "#FFF8E6" }, { name: "Lemon", hex: "#FFF6C8" }, { name: "Butter yellow", hex: "#FFF0C2" },
          { name: "Light orange", hex: "#FFE6BF" },
        ],
        image: haldiImage, imageAlt: "Brass bowl of turmeric paste with marigolds and yellow silk",
      },
      {
        title: "Sangeet", marathiTitle: "संगीत संध्या", time: "7:00 PM", durationMinutes: 240,
        quote: "सुरांची मैफल, नात्यांचा मेळ; आज रंगू दे आनंदाचा खेळ!",
        description: "Music, dance and both families on one stage. Bring your best moves.",
        dressCode: "Jewel tones & festive sparkle", attire: "Lehengas, festive sarees, bandhgalas or embellished kurtas; wear shoes made for dancing.", outfitTone: "plum",
        swatches: [
          { name: "Navy", hex: "#1B4478" }, { name: "Forest green", hex: "#2F5D4C" }, { name: "Deep purple", hex: "#4E2A63" }, { name: "Maroon", hex: "#6E1F33" },
        ],
        image: sangeetImage, imageAlt: "Disco ball and microphone beside a modern Sangeet dance floor with geometric stage lights and festive flowers, without people",
      },
    ],
  },
  {
    date: "2027-01-29",
    label: "Friday, January 29",
    events: [
      {
        title: "Saptapadi", marathiTitle: "सप्तपदी", time: "9:00 AM", durationMinutes: 180,
        quote: "सात पावले, सात वचने; जन्मभर जपू प्रेमाचे नाते.",
        description: "Seven sacred steps, seven promises, and the moment we become one.",
        dressCode: "Traditional Maharashtrian", attire: "Paithani or nauvari sarees, silk sarees, or kurta-pyjamas with a traditional jacket; a pheta makes a lovely finishing touch.", outfitTone: "sand",
        swatches: [
          { name: "Cream", hex: "#F2E3C2" }, { name: "Marigold", hex: "#EFB52F" }, { name: "Kumkum red", hex: "#BC2F2A" }, { name: "Paithani green", hex: "#1F5F33" },
        ],
        image: saptapadiImage, imageAlt: "Sacred wedding fire with brass ritual vessels beneath a floral mandap",
      },
      {
        title: "Baarat", marathiTitle: "वरात", time: "4:00 PM", durationMinutes: 120,
        quote: "ढोलाच्या तालावर, आनंदाच्या गजरात; नाचत गात निघाली वरात!",
        description: "Dhol beats, dancing feet and a procession bursting with colour.",
        ...eveningOutfit,
        image: baaratImage, imageAlt: "Flower-decorated wedding car, dhol and saffron pheta on a petal-strewn Baarat procession path, without people",
      },
      {
        title: "Reception", marathiTitle: "स्वागत समारंभ", time: "6:00 PM", durationMinutes: 240,
        quote: "आपल्या आशीर्वादांची साथ, खुलो आमच्या संसाराची वाट.",
        description: "An evening of dinner, blessings and our first toast as a married couple.",
        ...eveningOutfit,
        image: receptionImage, imageAlt: "Elegant reception place settings with pink flowers, crystal glasses and warm candlelight",
      },
    ],
  },
];

export const photos = {
  /** Shown one after another inside the arch in the hero, always in this order: opening on the proposal and closing on the ring. */
  carousel: [
    { src: proposalImage, alt: "Siddhant on one knee holding Vedangi's hand as she holds a bouquet by the river" },
    { src: adventuresImage, alt: "Vedangi and Siddhant talking by a wrought-iron railing in a lush green garden" },
    { src: graduationImage, alt: "Vedangi in a light blue graduation gown with flowers beside Siddhant holding a 2024 balloon" },
    { src: boatAboveImage, alt: "Vedangi and Siddhant in a pale blue boat on the river, seen from above" },
    { src: boatWaveImage, alt: "Vedangi and Siddhant smiling and waving from a pale blue boat on green water" },
    { src: embraceImage, alt: "Siddhant with his arm around Vedangi on a sunny city street" },
    { src: firstGlanceImage, alt: "Vedangi and Siddhant smiling at each other on a lit-up city street at night" },
    { src: sunnyLawnImage, alt: "Vedangi and Siddhant, in a shirt and tie, standing close on a sunny green lawn under a blue sky" },
    { src: ringImage, alt: "Vedangi and Siddhant embracing on a green lawn, her engagement ring on her hand against his chest" },
    { src: pointingImage, alt: "Siddhant pointing into the distance as Vedangi laughs beside him" },
    { src: heroRing, alt: "Vedangi's hand with her engagement ring resting in Siddhant's palm", position: "55% 60%" },
  ] as { src: string; alt: string; position?: string }[],
  countdown: { src: countdownImage, alt: "Siddhant proposing to Vedangi in a wide meadow between tall evergreens, the sound stretching out behind them", position: "49% 50%" },
  rsvp: { src: rsvpImage, alt: "Vedangi in a yellow floral saree and Siddhant in a rust shirt, smiling together against a white wall" },
};

export function getTimeLeft(now: Date) {
  const difference = Math.max(0, new Date(wedding.ceremonyAt).getTime() - now.getTime());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}