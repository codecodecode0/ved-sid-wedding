import { celebrationDays, wedding } from "@/lib/wedding";

/** Event times are written in Asia/Kolkata, so every timestamp carries an explicit +05:30 offset. */
const IST_OFFSET = "+05:30";

type CalendarEvent = { title: string; start: Date; end: Date; description: string };

/** "7:00 PM" on "2027-01-28" → the matching instant in Asia/Kolkata. */
function toInstant(date: string, time: string) {
  const [, hh, mm, meridiem] = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) ?? [];
  let hours = Number(hh) % 12;
  if (meridiem.toUpperCase() === "PM") hours += 12;
  return new Date(`${date}T${String(hours).padStart(2, "0")}:${mm}:00${IST_OFFSET}`);
}

export const calendarEvents: CalendarEvent[] = celebrationDays.flatMap((day) =>
  day.events.map((event) => {
    const start = toInstant(day.date, event.time);
    return {
      title: `${event.title} · ${wedding.names}`,
      start,
      end: new Date(start.getTime() + event.durationMinutes * 60_000),
      description: `${event.description}\nDress code: ${event.dressCode}\n${wedding.siteUrl}`,
    };
  }),
);

/** 2027-01-28T04:30:00.000Z → 20270128T043000Z */
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escapeIcs = (text: string) => text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");

/** An .ics file with every event; the build writes it to /wedding.ics for the RSVP invite email. */
export function buildIcs() {
  const now = stamp(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vedangi & Siddhant//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...calendarEvents.flatMap((event, i) => [
      "BEGIN:VEVENT",
      `UID:ved-sid-wedding-${i}@${new URL(wedding.siteUrl).host}`,
      `DTSTAMP:${now}`,
      `DTSTART:${stamp(event.start)}`,
      `DTEND:${stamp(event.end)}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `DESCRIPTION:${escapeIcs(event.description)}`,
      `LOCATION:${escapeIcs(wedding.address)}`,
      `URL:${wedding.siteUrl}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

/** Google Calendar only takes one event per link, so this adds the whole celebration with the schedule inside. */
export function googleCalendarUrl() {
  const first = calendarEvents[0];
  const last = calendarEvents[calendarEvents.length - 1];
  const schedule = celebrationDays
    .map((day) => `${day.label}\n${day.events.map((e) => `• ${e.time}  ${e.title}`).join("\n")}`)
    .join("\n\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.names} · Wedding`,
    dates: `${stamp(first.start)}/${stamp(last.end)}`,
    details: `${schedule}\n\n${wedding.siteUrl}`,
    location: wedding.address,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
