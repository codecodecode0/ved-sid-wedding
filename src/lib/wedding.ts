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
import familiesImage from "@/assets/photos/story-families.jpg";
import countdownImage from "@/assets/photos/countdown-chicago.jpg";
import rsvpImage from "@/assets/photos/rsvp-couple.jpg";
import boatAboveImage from "@/assets/photos/gallery-boat-above.jpg";
import timesSquareImage from "@/assets/photos/gallery-times-square.jpg";
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

export const celebrationDays = [
  {
    date: "2027-01-28",
    label: "Thursday, January 28",
    events: [
      {
        title: "Engagement", marathiTitle: "साखरपुडा", time: "10:00 AM", durationMinutes: 120,
        quote: "साखरेच्या गोडव्याने, जुळले दोन मनांचे धागे.",
        description: "A sweet sakharpuda to start it all: rings exchanged, two families joined.",
        dressCode: "Ethnic elegance", attire: "Sarees, salwar suits or kurtas with thoughtful accessories for a graceful morning celebration.",
        image: engagementImage, imageAlt: "Gold engagement rings surrounded by jasmine and pink flowers",
      },
      {
        title: "Haldi Carnival", marathiTitle: "हळदीचा सोहळा", time: "2:00 PM", durationMinutes: 150,
        quote: "हळदीचा रंग, आनंदाची उधळण; हसत खेळत साजरा करू हा क्षण!",
        description: "An afternoon of turmeric, laughter and happy, playful chaos.",
        dressCode: "Pastel colours", attire: "Soft pastel sarees, kurtas or playful floral outfits in light fabrics, with comfortable flats; choose something you don’t mind getting a little haldi on.",
        image: haldiImage, imageAlt: "Brass bowl of turmeric paste with marigolds and yellow silk",
      },
      {
        title: "Sangeet", marathiTitle: "संगीत संध्या", time: "7:00 PM", durationMinutes: 240,
        quote: "सुरांची मैफल, नात्यांचा मेळ; आज रंगू दे आनंदाचा खेळ!",
        description: "Music, dance and both families on one stage. Bring your best moves.",
        dressCode: "Jewel tones & festive sparkle", attire: "Lehengas, festive sarees, bandhgalas or embellished kurtas; wear shoes made for dancing.",
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
        dressCode: "Traditional Maharashtrian", attire: "Paithani or nauvari sarees, silk sarees, or kurta-pyjamas with a traditional jacket; a pheta makes a lovely finishing touch.",
        image: saptapadiImage, imageAlt: "Sacred wedding fire with brass ritual vessels beneath a floral mandap",
      },
      {
        title: "Baarat", marathiTitle: "वरात", time: "5:00 PM", durationMinutes: 120,
        quote: "ढोलाच्या तालावर, आनंदाच्या गजरात; नाचत गात निघाली वरात!",
        description: "Dhol beats, dancing feet and a procession bursting with colour.",
        dressCode: "Colourful festive wear", attire: "Bright sarees, festive kurtas or Indo-western outfits; comfortable footwear for the procession, with an optional colourful pheta.",
        image: baaratImage, imageAlt: "Flower-decorated wedding car, dhol and saffron pheta on a petal-strewn Baarat procession path, without people",
      },
      {
        title: "Reception", marathiTitle: "स्वागत समारंभ", time: "7:00 PM", durationMinutes: 240,
        quote: "आपल्या आशीर्वादांची साथ, खुलो आमच्या संसाराची वाट.",
        description: "An evening of dinner, blessings and our first toast as a married couple.",
        dressCode: "Elegant evening formal", attire: "Silk sarees, elegant lehengas, suits or bandhgalas; rich colours and refined details for the evening.",
        image: receptionImage, imageAlt: "Elegant reception place settings with pink flowers, crystal glasses and warm candlelight",
      },
    ],
  },
];

export const storyMilestones = [
  {
    year: "2023", chapter: "Chapter one", title: "First Glance", marathiLine: "पहिली नजर, पहिली ओळख.",
    caption: "Bright lights, a busy street, and the start of us.",
    image: firstGlanceImage, imageAlt: "Vedangi and Siddhant smiling at each other on a lit-up city street at night",
    moments: [
      { src: timesSquareImage, alt: "Vedangi and Siddhant walking arm in arm through glowing billboards at night", note: "Where it all began", place: "New York" },
    ],
  },
  {
    year: "2024 & 2025", chapter: "Chapter two", title: "Adventures Together", marathiLine: "नवीन वाटा, सोबतीचा प्रवास.",
    caption: "Graduations, new cities and days out on the water; every road was better together.",
    image: adventuresImage, imageAlt: "Vedangi and Siddhant talking by a wrought-iron railing in a lush green garden",
    compact: true,
    moments: [
      { src: graduationImage, alt: "Vedangi in a light blue graduation gown with flowers beside Siddhant holding a 2024 balloon", note: "Graduation day" },
      { src: sunnyLawnImage, alt: "Vedangi and Siddhant, in a shirt and tie, standing close on a sunny green lawn under a blue sky", note: "All dressed up" },
      { src: boatAboveImage, alt: "Vedangi and Siddhant in a pale blue boat on the river, seen from above", note: "Just the two of us" },
    ],
  },
  {
    year: "2026", chapter: "Chapter three", title: "The Proposal", marathiLine: "एक प्रश्न, आयुष्यभराचा होकार.",
    caption: "One knee by the river, a bouquet in her hands, and the easiest yes of our lives.",
    image: proposalImage, imageAlt: "Siddhant on one knee holding Vedangi's hand as she holds a bouquet by the river",
    compact: true,
    moments: [
      { src: ringImage, alt: "Vedangi and Siddhant embracing on a green lawn, her engagement ring on her hand against his chest", note: "With this ring" },
      { src: embraceImage, alt: "Siddhant with his arm around Vedangi on a sunny city street", note: "Can't stop smiling" },
      { src: pointingImage, alt: "Siddhant pointing into the distance as Vedangi laughs beside him", note: "Towards forever" },
    ],
  },
  {
    year: "2027", chapter: "Chapter four", title: "Forever Begins", marathiLine: "दोन कुटुंबे, एक नवे नाते.",
    caption: "Two families, one celebration, and you are invited.",
    image: familiesImage, imageAlt: "Vedangi and Siddhant standing together with both their families",
    moments: [],
  },
];

export const photos = {
  hero: { src: heroRing, alt: "Vedangi's hand with her engagement ring resting in Siddhant's palm" },
  countdown: { src: countdownImage, alt: "Vedangi and Siddhant by a stone balustrade above the river, city towers behind them" },
  rsvp: { src: rsvpImage, alt: "Vedangi in a yellow saree and Siddhant in a rust shirt, smiling together" },
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