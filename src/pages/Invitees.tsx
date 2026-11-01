import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Download, Loader2, LockKeyhole, Mail, MessageSquareHeart, Phone, RefreshCw, Search, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchGuestList, type Rsvp } from "@/lib/supabase";
import { LotusDivider } from "@/components/wedding/Motifs";

const errorText = {
  wrong_password: "That password isn't right.",
  too_many_attempts: "Too many wrong attempts. Please wait 10 minutes and try again.",
  unavailable: "Couldn't reach the guest list. Check your connection and try again.",
};

/** Guests counted for an RSVP: the number they entered, or 1 if they left it blank. */
const headcount = (r: Rsvp) => (r.attendance === "attending" ? r.guests ?? 1 : 0);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

function downloadCsv(rows: Rsvp[]) {
  const header = ["Name", "Attending", "Guests", "Email", "Phone", "Dietary", "Message", "Responded (IST)"];
  const cell = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.name, r.attendance === "attending" ? "Yes" : "No", headcount(r), r.email, r.phone, r.dietary, r.message, formatDate(r.created_at)]
      .map(cell)
      .join(","),
  );
  const blob = new Blob(["﻿" + [header.map(cell).join(","), ...lines].join("\r\n")], { type: "text/csv;charset=utf-8" });
  const link = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "wedding-rsvps.csv" });
  link.click();
  URL.revokeObjectURL(link.href);
}

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-md border border-zari/40 bg-card px-3 py-3 text-center">
    <p className="font-serif text-3xl leading-none">{value}</p>
    <p className="mt-1.5 text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground">{label}</p>
  </div>
);

const GuestCard = ({ rsvp }: { rsvp: Rsvp }) => {
  const attending = rsvp.attendance === "attending";
  return (
    <li className="rounded-md border border-zari/40 bg-card p-4 shadow-[0_8px_24px_-18px_hsl(var(--maroon-deep)/0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-xl leading-tight break-words">{rsvp.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{formatDate(rsvp.created_at)}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            attending ? "bg-paithani/10 text-paithani" : "bg-muted text-muted-foreground"
          }`}
        >
          {attending ? `Attending · ${headcount(rsvp)}` : "Declined"}
        </span>
      </div>
      <div className="mt-3 space-y-1.5 text-sm">
        {rsvp.phone && (
          <a href={`tel:${rsvp.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-rose-foreground">
            <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
            {rsvp.phone}
          </a>
        )}
        {rsvp.email && (
          <a href={`mailto:${rsvp.email}`} className="flex items-center gap-2 break-all hover:text-rose-foreground">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            {rsvp.email}
          </a>
        )}
        {rsvp.dietary && (
          <p className="flex items-start gap-2">
            <Utensils className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
            {rsvp.dietary}
          </p>
        )}
        {rsvp.message && (
          <p className="flex items-start gap-2 italic text-foreground/80">
            <MessageSquareHeart className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground not-italic" />
            {rsvp.message}
          </p>
        )}
      </div>
    </li>
  );
};

/** Password-protected guest list. The password is checked by the database, never in this code. */
const Invitees = () => {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "attending" | "not-attending">("all");

  // Keep this page out of search results.
  useEffect(() => {
    const meta = Object.assign(document.createElement("meta"), { name: "robots", content: "noindex, nofollow" });
    document.head.appendChild(meta);
    document.title = "Invitees · Vedangi & Siddhant";
    return () => meta.remove();
  }, []);

  const load = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    const result = await fetchGuestList(password);
    setLoading(false);
    if ("rows" in result) setRows(result.rows);
    else {
      setError(errorText[result.error]);
      if (result.error !== "unavailable") setRows(null);
    }
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows ?? []).filter(
      (r) =>
        (filter === "all" || r.attendance === filter) &&
        (!q || [r.name, r.email, r.phone, r.message].some((v) => v?.toLowerCase().includes(q))),
    );
  }, [rows, query, filter]);

  const attending = rows?.filter((r) => r.attendance === "attending") ?? [];

  if (!rows) {
    return (
      <main className="min-h-svh rangoli-texture text-on-photograph flex items-center justify-center px-4">
        <form onSubmit={load} className="w-full max-w-sm text-center">
          <LockKeyhole className="mx-auto h-8 w-8 text-zari" />
          <h1 className="font-serif text-4xl mt-4">Invitees</h1>
          <p lang="mr" className="text-haldi mt-2">
            वेदांगी ❀ सिद्धांत
          </p>
          <LotusDivider light className="my-6" />
          <Input
            type="password"
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background text-foreground text-center"
          />
          <Button type="submit" disabled={!password || loading} className="mt-3 w-full bg-zari text-maroon-deep hover:bg-zari/90">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Open guest list"}
          </Button>
          {error && (
            <p role="alert" className="mt-4 text-sm text-haldi">
              {error}
            </p>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background">
      <header className="rangoli-texture text-on-photograph px-4 py-6 text-center">
        <h1 className="font-serif text-3xl">Invitees</h1>
        <p lang="mr" className="text-haldi text-sm mt-1">
          वेदांगी ❀ सिद्धांत
        </p>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Stat label="Responses" value={rows.length} />
          <Stat label="Attending" value={attending.length} />
          <Stat label="Total guests" value={attending.reduce((sum, r) => sum + headcount(r), 0)} />
          <Stat label="Declined" value={rows.length - attending.length} />
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, phone, email…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 bg-card" />
          </div>
          <div className="flex gap-2">
            <select
              aria-label="Filter by response"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="h-10 flex-1 rounded-md border border-input bg-card px-2 text-sm"
            >
              <option value="all">Everyone</option>
              <option value="attending">Attending</option>
              <option value="not-attending">Declined</option>
            </select>
            <Button variant="outline" size="icon" onClick={() => load()} disabled={loading} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => downloadCsv(rows)} aria-label="Download CSV">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {shown.length ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {shown.map((r) => (
              <GuestCard key={r.id} rsvp={r} />
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-center text-muted-foreground">{rows.length ? "No one matches that search." : "No responses yet."}</p>
        )}
      </div>
    </main>
  );
};

export default Invitees;
