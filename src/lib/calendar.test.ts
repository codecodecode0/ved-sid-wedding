import { buildIcs, calendarEvents, googleCalendarUrl } from "./calendar";

describe("calendar", () => {
  it("reads event times in Asia/Kolkata", () => {
    // Engagement: 9:00 AM IST on Jan 28 is 03:30 UTC
    expect(calendarEvents[0].start.toISOString()).toBe("2027-01-28T03:30:00.000Z");
    // Reception: 7:00 PM IST on Jan 29 is 13:30 UTC, and runs four hours
    const reception = calendarEvents[calendarEvents.length - 1];
    expect(reception.start.toISOString()).toBe("2027-01-29T13:30:00.000Z");
    expect(reception.end.toISOString()).toBe("2027-01-29T17:30:00.000Z");
  });

  it("builds an .ics file with all six events", () => {
    const ics = buildIcs();
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(6);
    expect(ics).toContain("DTSTART:20270128T033000Z");
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
  });

  it("links Google Calendar to the whole celebration", () => {
    const url = new URL(googleCalendarUrl());
    expect(url.searchParams.get("dates")).toBe("20270128T033000Z/20270129T173000Z");
    expect(url.searchParams.get("ctz")).toBe("Asia/Kolkata");
  });
});
