/**
 * Frozen snapshot of the original site, served at /private.
 * Everything it renders lives under src/private, so changes to the main page never reach it.
 */
import Navigation from "@/private/components/Navigation";
import Hero from "@/private/components/Hero";
import Marquee from "@/private/components/Marquee";
import OurStory from "@/private/components/OurStory";

import Countdown from "@/private/components/Countdown";
import EventDetails from "@/private/components/EventDetails";
import RSVPForm from "@/private/components/RSVPForm";
import Footer from "@/private/components/Footer";

const PrivateIndex = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background Photo */}
      <Hero />
      
      {/* Marquee */}
      <Marquee />
      
      {/* Our Story with Timeline Photos */}
      <section id="story">
        <OurStory />
      </section>

      {/* Event Details with Venue Photos */}
      <section id="details">
        <EventDetails />
      </section>
      
      {/* RSVP Form with Decorative Photo */}
      <section id="rsvp">
        <RSVPForm />
      </section>
      
      {/* Countdown Timer with Photo Background */}
      <Countdown />
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default PrivateIndex;
