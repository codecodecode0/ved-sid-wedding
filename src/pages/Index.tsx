import Navigation from "@/components/wedding/Navigation";
import Hero from "@/components/wedding/Hero";
import Marquee from "@/components/wedding/Marquee";

import Countdown from "@/components/wedding/Countdown";
import EventDetails from "@/components/wedding/EventDetails";
import RSVPForm from "@/components/wedding/RSVPForm";
import Footer from "@/components/wedding/Footer";
import { PAGE_WIDTH } from "@/components/wedding/layout";
import Entrance, { shouldShowEntrance } from "@/components/wedding/Entrance";
import ScrollHint from "@/components/wedding/ScrollHint";
import { useState } from "react";

const Index = () => {
  const [showEntrance] = useState(shouldShowEntrance);
  // Behind the gate the hero waits hidden; it plays its intro (lines popping in from above) only
  // once the view steps through the gate, instead of finishing unseen.
  const [heroReady, setHeroReady] = useState(!showEntrance);

  return (
    <div className="rangoli-texture min-h-screen">
    {showEntrance && <Entrance onReveal={() => setHeroReady(true)} />}
    <main className={`relative mx-auto ${PAGE_WIDTH} min-h-screen bg-background shadow-[0_0_60px_-10px_hsl(var(--maroon-deep)/0.9)]`}>
      <Navigation />
      
      {/* Hero Section with Background Photo */}
      <div style={heroReady ? undefined : { visibility: "hidden" }}>
        <Hero key={heroReady ? "shown" : "waiting"} />
      </div>
      {heroReady && <ScrollHint delay={1.8} />}
      
      {/* Marquee */}
      <Marquee />
      
      {/* Event Details with Venue Photos */}
      <section id="details">
        <EventDetails />
      </section>
      
      {/* Countdown Timer with Photo Background */}
      <Countdown />
      
      {/* RSVP Form with Decorative Photo */}
      <section id="rsvp">
        <RSVPForm />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
    </div>
  );
};

export default Index;
