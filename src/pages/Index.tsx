import Navigation from "@/components/wedding/Navigation";
import Hero from "@/components/wedding/Hero";
import Marquee from "@/components/wedding/Marquee";

import Countdown from "@/components/wedding/Countdown";
import EventDetails from "@/components/wedding/EventDetails";
import RSVPForm from "@/components/wedding/RSVPForm";
import Footer from "@/components/wedding/Footer";
import { PAGE_WIDTH } from "@/components/wedding/layout";

const Index = () => {
  return (
    <div className="rangoli-texture min-h-screen">
    <main className={`relative mx-auto ${PAGE_WIDTH} min-h-screen bg-background shadow-[0_0_60px_-10px_hsl(var(--maroon-deep)/0.9)]`}>
      <Navigation />
      
      {/* Hero Section with Background Photo */}
      <Hero />
      
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
