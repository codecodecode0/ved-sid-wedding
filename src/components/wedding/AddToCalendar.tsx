import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";

/** "Add to calendar" menu: Google Calendar link, or an .ics file with all six events. */
const AddToCalendar = ({ className = "" }: { className?: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className={`gap-2 rounded-full border-zari text-rose-foreground hover:bg-zari/15 tracking-[0.15em] uppercase text-xs ${className}`}
      >
        <CalendarPlus className="h-4 w-4" />
        Add to calendar
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="w-60">
      <DropdownMenuItem asChild>
        <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
          Google Calendar
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={downloadIcs}>Apple, Outlook &amp; others (.ics)</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default AddToCalendar;
