# Handoff: ved-sid-wedding

Context for continuing this project in Claude Code. Read this together with `AGENTS.md` (project rules) and `roadmap.md`.

## Project
- Wedding website for **Vedangi & Siddhant**: January 28–29, 2027, The Foresta Resort, Mulshi, Pune.
- Stack: Vite + React + TypeScript + Tailwind 3 + shadcn/ui + framer-motion (originally a Lovable template).
- Repo: `github.com/codecodecode0/ved-sid-wedding` (public), branch `main`.
- Local copy: `~/Desktop/code eater/ved-sid-wedding`.

## Done so far
1. Cloned `codecodecode0/remix-of-magazine-wedding-site` into the new repo `ved-sid-wedding` with full history.
2. **Real photos** replaced template placeholders. They're stored in `src/assets/photos/`, resized for the web with EXIF/GPS stripped, and referenced from the shared data in `src/lib/wedding.ts` (`photos`, `storyMilestones`, `gallery`):
   - Hero: ring close-up (`hero-ring.jpg`), in a temple-arch frame.
   - Our Story: 2023 First Glance = Times Square; 2024–25 Adventures = garden railing; 2026 Proposal = kneeling proposal; 2027 Forever Begins = both families.
   - Countdown background: Chicago river balustrade (`countdown-chicago.jpg`).
   - RSVP: yellow saree / rust shirt photo (`rsvp-couple.jpg`).
   - New **Our Moments** gallery (`src/components/wedding/Gallery.tsx`): bridge, street hug, pointing, boat from above, boat, Times Square at night.
   - **Event Details images are intentionally unchanged.** The couple asked to keep them.
   - The year assigned to each story photo is a guess; the couple may reorder.
3. **Marathi wedding styling.**
   - Palette in `src/index.css`: ivory, kumkum maroon, haldi gold, paithani green. New Tailwind colours `maroon`, `haldi`, `zari`, `paithani`.
   - Motifs in `src/components/wedding/Motifs.tsx`: `Toran` (marigold and mango-leaf garland), `LotusDivider` and `PaithaniBorder`. The CSS classes `.paithani-border`, `.rangoli-texture` and `.arch-frame` live in `index.css`.
   - Marathi copy: "॥ श्री गणेशाय नमः ॥", "शुभ विवाह", the names वेदांगी ❀ सिद्धांत (`wedding.marathiNames`), a Marathi line per story milestone, शुभमुहूर्ताची प्रतीक्षा on the countdown, आपली उपस्थिती प्रार्थनीय / आग्रहाचे निमंत्रण on the RSVP, and शुभमंगल सावधान in the footer.
   - Devanagari text must use `lang="mr"`, with no letter-spacing. In one-line contexts such as the marquee, add `[text-wrap:nowrap]`, because `[lang=mr]` sets `text-wrap: pretty`.
4. Dev server moved to **port 5180** (`strictPort`) in `vite.config.ts`. Another app on the Mac already serves an old wedding site on 8080. `start-local.command` (double-clickable) installs dependencies if needed, runs `npm run dev` and opens http://localhost:5180.

## Current local state (fix first)
The local copy at `~/Desktop/code eater/ved-sid-wedding` is **one commit behind** GitHub: it's missing the port 5180 change. A failed update also left stale git lock files. Run:

```sh
cd ~/Desktop/"code eater"/ved-sid-wedding
rm -f .git/index.lock .git/objects/maintenance.lock
git checkout -- package-lock.json   # npm install rewrote it; discard unless intended
git pull origin main
rm -f ../update3.bundle             # leftover transfer file
npm run dev                         # → http://localhost:5180
```

If an old dev server from this project is still running in Terminal, stop it first with Ctrl+C.

## Not yet verified
The site was never viewed on the real dev server with animations. A static preview with stubbed animations rendered correctly on desktop (1440px) and phone (390px). Check the following in a browser:
- The hero toran overlapping the nav (the nav uses `pt-14` until scrolled).
- The ring photo crop (`object-[55%_60%]`).
- That scroll animations don't leave sections invisible.

## Next steps (requested by the couple)
1. Review the page together and adjust photo placement and copy.
2. **RSVP storage in Supabase.** `RSVPForm.tsx` currently only `console.log`s. Fields: name, email, attendance, guests, dietary, message.
3. **Password-protected RSVP dashboard.** Ask the couple for the password when building it; never hard-code it in client code. Use a server-side check, for example a Vercel function or Supabase auth/RLS.
4. **Deploy on Vercel** and attach a custom domain, which the couple will buy later.

## Project rules (from AGENTS.md)
- Keep dates, venue, timeline and schedule in the shared module `src/lib/wedding.ts`.
- Event times are in Asia/Kolkata; the countdown uses an explicit `+05:30` offset.
- Event descriptions, Marathi lines, attire guidance and images live alongside each event in the shared data.
- Marathi text uses the shared language-aware typography and the locally served font `src/assets/fonts/noto-serif-devanagari.ttf`.
