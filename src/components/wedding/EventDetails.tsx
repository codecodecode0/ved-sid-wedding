import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { celebrationDays, wedding } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";
import AddToCalendar from "./AddToCalendar";

const EventDetails = () => (
  <section className="py-14 md:py-24">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
        <p className="text-xs uppercase text-muted-foreground mb-4">Two days of love & celebration</p>
        <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">Event Details</h2>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">परंपरेचा साज, प्रेमाचा सोहळा.</p>
        <LotusDivider className="my-5" />
        <p className="font-serif text-2xl md:text-3xl">{wedding.dates}</p>
        <p className="text-sm text-muted-foreground mt-4">{wedding.venue} · {wedding.location}</p>
        <Button asChild variant="ghost" className="mt-3 gap-2">
          <a href={wedding.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" />View location<ArrowUpRight className="h-4 w-4" /></a>
        </Button>
        <div className="mt-4">
          <AddToCalendar />
        </div>
      </motion.div>
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        {celebrationDays.map((day, index) => (
          <motion.div key={day.date} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <div className="flex items-center gap-5 mb-6 md:mb-9">
              <span className="font-serif text-5xl text-rose-foreground">0{index + 1}</span>
              <h3 className="font-serif text-xl md:text-2xl"><time dateTime={day.date}>{day.label}</time></h3>
              <div className="h-px bg-border flex-1" />
            </div>
            <ul className="grid md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-5 md:gap-y-12 items-stretch">
              {day.events.map((event) => (
                <li key={event.title} className="min-w-0 flex flex-col rounded-md border border-zari/40 bg-card p-3 shadow-[0_8px_24px_-18px_hsl(var(--maroon-deep)/0.5)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                  {/* Phones: small photo beside the title; wider screens: photo on top */}
                  <div className="grid grid-cols-[minmax(9.5rem,42%)_1fr] md:grid-cols-1 gap-4 md:gap-0 items-center">
                    <div className="relative">
                      <img src={event.image} alt={event.imageAlt} loading="lazy" width={1024} height={1280} className="w-full aspect-square md:aspect-[6/5] object-cover rounded-sm" />
                      <span className="hidden md:block absolute bottom-4 left-4 bg-background text-foreground text-xs font-medium px-3 py-2 tabular-nums">{event.time}</span>
                    </div>
                    <div className="md:pt-5">
                      <p className="md:hidden text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground tabular-nums">{event.time}</p>
                      <h4 className="font-serif text-2xl md:text-3xl leading-tight mt-1 md:mt-0">{event.title}</h4>
                      <p lang="mr" className="text-base md:text-lg text-rose-foreground mt-1">{event.marathiTitle}</p>
                      <blockquote lang="mr" className="mt-2 md:my-5 text-sm md:text-base leading-snug md:leading-normal text-foreground/80">{event.quote}</blockquote>
                      <p className="mt-2 md:mt-0 md:mb-6 text-sm leading-snug md:leading-7 text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                  <div className="pt-3 md:pt-0 flex flex-col flex-1">
                    <div className="border-t border-zari/30 md:border-border mt-auto md:mt-0 pt-2.5 md:pt-4">
                      <p className="text-sm">
                        <Shirt className="inline h-4 w-4 mr-1.5 -mt-0.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Dress code: </span>
                        <span className="font-medium">{event.dressCode}</span>
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground mt-1.5">{event.attire}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EventDetails;
