import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { googleCalendarUrl } from "@/lib/calendar";

/** "Add to calendar" button: opens Google Calendar with the whole celebration filled in. */
const AddToCalendar = ({ className = "" }: { className?: string }) => (
  <Button
    asChild
    variant="outline"
    className={`gap-2 rounded-full border-zari text-rose-foreground hover:bg-zari/15 tracking-[0.15em] uppercase text-xs ${className}`}
  >
    <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
      <CalendarPlus className="h-4 w-4" />
      Add to calendar
    </a>
  </Button>
);

export default AddToCalendar;
