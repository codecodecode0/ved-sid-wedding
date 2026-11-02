// Supabase Edge Function: emails a calendar invite when a guest RSVPs "attending".
// Triggered by a Database Webhook on INSERT into public.rsvps.
//
// Secrets (Supabase dashboard → Edge Functions → Secrets):
//   GMAIL_USER             the Gmail address invites are sent from
//   GMAIL_APP_PASSWORD     a Google app password for that account (not the normal password)
//   INVITE_WEBHOOK_SECRET  random string; the webhook sends it in the x-invite-secret header
//   SITE_URL               optional, defaults to the GitHub Pages site
import nodemailer from "npm:nodemailer@6.9.16";

type Rsvp = { name: string; email: string | null; attendance: string; guests: number | null };

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://vedsid.com/";
const GMAIL_USER = Deno.env.get("GMAIL_USER") ?? "";
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD") ?? "";
const WEBHOOK_SECRET = Deno.env.get("INVITE_WEBHOOK_SECRET") ?? "";

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function emailHtml(name: string) {
  return `<div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#3a1a22;text-align:center">
  <p style="color:#b8860b;font-size:18px;margin:0">॥ श्री गणेशाय नमः ॥</p>
  <h1 style="font-weight:normal;margin:16px 0 4px">Vedangi &amp; Siddhant</h1>
  <p style="letter-spacing:2px;text-transform:uppercase;font-size:13px;margin:0">January 28–29, 2027 · The Foresta Resort, Mulshi, Pune</p>
  <p style="font-size:16px;line-height:1.6;margin:24px 0">Dear ${escapeHtml(name)},<br>thank you for saying yes! We can't wait to celebrate with you.
  The attached calendar file adds all six events (engagement, haldi, sangeet, saptapadi, baarat and reception) to your calendar.</p>
  <p><a href="${SITE_URL}#details" style="color:#5f1a2a">See the schedule and dress codes</a></p>
  <p style="color:#b8860b;font-size:18px">आग्रहाचे निमंत्रण</p>
</div>`;
}

Deno.serve(async (req) => {
  if (!WEBHOOK_SECRET || req.headers.get("x-invite-secret") !== WEBHOOK_SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  const payload = await req.json().catch(() => null);
  const rsvp: Rsvp | undefined = payload?.record;
  if (payload?.type !== "INSERT" || !rsvp) return new Response("Ignored", { status: 200 });
  if (rsvp.attendance !== "attending" || !rsvp.email) return new Response("No invite needed", { status: 200 });

  const ics = await fetch(new URL("wedding.ics", SITE_URL)).then((r) => {
    if (!r.ok) throw new Error(`Calendar file returned ${r.status}`);
    return r.text();
  });

  // Port 465 (SMTPS): Supabase Edge Functions block outbound 25 and 587.
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transport.sendMail({
    from: { name: "Vedangi & Siddhant", address: GMAIL_USER },
    to: rsvp.email,
    subject: "Save the dates · Vedangi & Siddhant · January 28–29, 2027",
    text: `Dear ${rsvp.name},\n\nThank you for saying yes! The attached calendar file adds all six wedding events to your calendar.\n\nSchedule and dress codes: ${SITE_URL}#details\n\nVedangi & Siddhant`,
    html: emailHtml(rsvp.name),
    attachments: [{ filename: "vedangi-siddhant-wedding.ics", content: ics, contentType: "text/calendar; charset=utf-8; method=PUBLISH" }],
  });

  return new Response("Invite sent", { status: 200 });
});
