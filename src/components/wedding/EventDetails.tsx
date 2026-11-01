import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { celebrationDays, wedding } from "@/lib/wedding";
import { LotusDivider } from "./Motifs";

const EventDetails = () => (
  <section className="py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="text-xs uppercase text-muted-foreground mb-4">Two days of love & celebration</p>
        <h2 className="heading-elegant font-serif text-4xl md:text-5xl lg:text-6xl">Event Details</h2>
        <p lang="mr" className="text-lg md:text-xl text-rose-foreground mt-3">परंपरेचा साज, प्रेमाचा सोहळा.</p>
        <LotusDivider className="my-7" />
        <p className="font-serif text-2xl md:text-3xl">{wedding.dates}</p>
        <p className="text-sm text-muted-foreground mt-4">{wedding.venue} · {wedding.location}</p>
        <Button asChild variant="ghost" className="mt-3 gap-2">
          <a href={wedding.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" />View location<ArrowUpRight className="h-4 w-4" /></a>
        </Button>
      </motion.div>
      <div className="max-w-6xl mx-auto space-y-20">
        {celebrationDays.map((day, index) => (
          <motion.div key={day.date} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <div className="flex items-center gap-5 mb-9">
              <span className="font-serif text-5xl text-rose-foreground">0{index + 1}</span>
              <h3 className="font-serif text-xl md:text-2xl"><time dateTime={day.date}>{day.label}</time></h3>
              <div className="h-px bg-border flex-1" />
            </div>
            <ul className="grid md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 items-stretch">
              {day.events.map((event) => (
                <li key={event.title} className="min-w-0 flex flex-col">
                  <div className="relative">
                    <img src={event.image} alt={event.imageAlt} loading="lazy" width={1024} height={1280} className="w-full aspect-[4/5] object-cover rounded-sm" />
                    <span className="absolute bottom-4 left-4 bg-background text-foreground text-xs font-medium px-3 py-2 tabular-nums">{event.time}</span>
                  </div>
                  <div className="pt-5 flex flex-col flex-1">
                    <h4 className="font-serif text-3xl leading-tight">{event.title}</h4>
                    <p lang="mr" className="text-lg text-rose-foreground mt-1">{event.marathiTitle}</p>
                    <blockquote lang="mr" className="my-5 text-base text-foreground/80">{event.quote}</blockquote>
                    <p className="text-sm leading-7 text-muted-foreground mb-6">{event.description}</p>
                    <div className="border-t border-border mt-auto pt-5">
                      <p className="flex items-center gap-2 text-xs text-muted-foreground"><Shirt className="h-4 w-4" />Suggested dress code</p>
                      <p className="text-sm font-medium mt-2">{event.dressCode}</p>
                      <p className="text-sm leading-6 text-muted-foreground mt-2">{event.attire}</p>
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
