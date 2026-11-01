/**
 * Writes public/wedding.ics from the shared schedule so the site serves it at
 * /wedding.ics. The RSVP invite email attaches this same file.
 */
import { writeFileSync } from "node:fs";
import { buildIcs } from "../src/lib/calendar";

writeFileSync(new URL("../public/wedding.ics", import.meta.url), buildIcs());
console.log("Wrote public/wedding.ics");
