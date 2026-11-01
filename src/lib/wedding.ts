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
import bridgeImage from "@/assets/photos/gallery-bridge.jpg";
import embraceImage from "@/assets/photos/gallery-embrace.jpg";
import pointingImage from "@/assets/photos/gallery-pointing.jpg";
import boatAboveImage from "@/assets/photos/gallery-boat-above.jpg";
import boatImage from "@/assets/photos/gallery-boat.jpg";
import timesSquareImage from "@/assets/photos/gallery-times-square.jpg";

export const wedding = {
  names: "Vedangi & Siddhant",
  marathiNames: { bride: "वेदांगी", groom: "सिद्धांत" },
  dates: "January 28–29, 2027",
  venue: "The Foresta Resort",
  location: "Mulshi, Pune",
  mapUrl: "https://share.google/DxVHqyg0djySK7CFR",
  ceremonyAt: "2027-01-29T10:00:00+05:30",
};

export const celebrationDays = [
  {
    date: "2027-01-28",
    label: "Thursday, January 28",
    events: [
      {
        title: "Engagement", marathiTitle: "साखरपुडा", time: "10:00 AM",
        quote: "साखरेच्या गोडव्याने, जुळले दोन मनांचे धागे.",
        description: "Our celebrations begin with the sweetness of a sakharpuda. Join our families as we exchange rings and mark the beginning of a lifetime together, surrounded by your love and blessings.",
        dressCode: "Ethnic elegance", attire: "Sarees, salwar suits or kurtas with thoughtful accessories for a graceful morning celebration.",
        image: engagementImage, imageAlt: "Gold engagement rings surrounded by jasmine and pink flowers",
      },
      {
        title: "Haldi Carnival", marathiTitle: "हळदीचा सोहळा", time: "3:00 PM",
        quote: "हळदीचा रंग, आनंदाची उधळण; हसत खेळत साजरा करू हा क्षण!",
        description: "A joyful afternoon of haldi, laughter and togetherness. Bring your playful spirit as our loved ones shower us with turmeric and good wishes, turning the day into a bright celebration of new beginnings.",
        dressCode: "Pastel colours", attire: "Soft pastel sarees, kurtas or playful floral outfits in light fabrics, with comfortable flats; choose something you don’t mind getting a little haldi on.",
        image: haldiImage, imageAlt: "Brass bowl of turmeric paste with marigolds and yellow silk",
      },
      {
        title: "Sangeet", marathiTitle: "संगीत संध्या", time: "7:00 PM",
        quote: "सुरांची मैफल, नात्यांचा मेळ; आज रंगू दे आनंदाचा खेळ!",
        description: "An evening that brings both families together through music and dance. Celebrate with us as favourite songs, shared laughter and joyful performances fill the night with memories to treasure.",
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
        title: "Saptapadi", marathiTitle: "सप्तपदी", time: "10:00 AM",
        quote: "सात पावले, सात वचने; जन्मभर जपू प्रेमाचे नाते.",
        description: "In the warmth of Maharashtrian tradition, we take seven sacred steps and begin our married life. Be with us for the wedding rituals and bless our journey of friendship, love and lifelong companionship.",
        dressCode: "Traditional Maharashtrian", attire: "Paithani or nauvari sarees, silk sarees, or kurta-pyjamas with a traditional jacket; a pheta makes a lovely finishing touch.",
        image: saptapadiImage, imageAlt: "Sacred wedding fire with brass ritual vessels beneath a floral mandap",
      },
      {
        title: "Baarat", marathiTitle: "वरात", time: "5:00 PM",
        quote: "ढोलाच्या तालावर, आनंदाच्या गजरात; नाचत गात निघाली वरात!",
        description: "Let the celebration spill into the evening with the spirit of a lively varaat. Join the procession, cheer with our families and dance your heart out as we welcome this next chapter with joy.",
        dressCode: "Colourful festive wear", attire: "Bright sarees, festive kurtas or Indo-western outfits; comfortable footwear for the procession, with an optional colourful pheta.",
        image: baaratImage, imageAlt: "Flower-decorated wedding car, dhol and saffron pheta on a petal-strewn Baarat procession path, without people",
      },
      {
        title: "Reception", marathiTitle: "स्वागत समारंभ", time: "7:00 PM",
        quote: "आपल्या आशीर्वादांची साथ, खुलो आमच्या संसाराची वाट.",
        description: "Our two days of celebration come together in a warm evening with the people we love. Join us to share your blessings, capture happy memories and celebrate the beginning of our forever.",
        dressCode: "Elegant evening formal", attire: "Silk sarees, elegant lehengas, suits or bandhgalas; rich colours and refined details for the evening.",
        image: receptionImage, imageAlt: "Elegant reception place settings with pink flowers, crystal glasses and warm candlelight",
      },
    ],
  },
];

export const storyMilestones = [
  {
    year: "2023", title: "First Glance", marathiLine: "पहिली नजर, पहिली ओळख.",
    image: firstGlanceImage, imageAlt: "Vedangi and Siddhant smiling at each other on a lit-up city street at night",
  },
  {
    year: "2024 & 2025", title: "Adventures Together", marathiLine: "नवीन वाटा, सोबतीचा प्रवास.",
    image: adventuresImage, imageAlt: "Vedangi and Siddhant talking by a wrought-iron railing in a lush green garden",
  },
  {
    year: "2026", title: "The Proposal", marathiLine: "एक प्रश्न, आयुष्यभराचा होकार.",
    image: proposalImage, imageAlt: "Siddhant on one knee holding Vedangi's hand as she holds a bouquet by the river",
  },
  {
    year: "2027", title: "Forever Begins", marathiLine: "दोन कुटुंबे, एक नवे नाते.",
    image: familiesImage, imageAlt: "Vedangi and Siddhant standing together with both their families",
  },
];

export const photos = {
  hero: { src: heroRing, alt: "Vedangi's hand with her engagement ring resting in Siddhant's palm" },
  countdown: { src: countdownImage, alt: "Vedangi and Siddhant by a stone balustrade above the river, city towers behind them" },
  rsvp: { src: rsvpImage, alt: "Vedangi in a yellow saree and Siddhant in a rust shirt, smiling together" },
};

export const gallery = [
  { src: bridgeImage, alt: "Vedangi with a bouquet and Siddhant on a red bridge over the river, skyscrapers behind" },
  { src: embraceImage, alt: "Siddhant with his arm around Vedangi on a sunny city street" },
  { src: boatAboveImage, alt: "Siddhant steering a pale blue boat while Vedangi relaxes with her bouquet, seen from above" },
  { src: pointingImage, alt: "Siddhant pointing into the distance as Vedangi laughs beside him" },
  { src: timesSquareImage, alt: "Vedangi and Siddhant walking arm in arm through glowing billboards at night" },
  { src: boatImage, alt: "Siddhant at the wheel of a vintage boat with Vedangi beside him on the water" },
];

export function getTimeLeft(now: Date) {
  const difference = Math.max(0, new Date(wedding.ceremonyAt).getTime() - now.getTime());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}