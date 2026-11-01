import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Download, Loader2, LockKeyhole, RefreshCw, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteGuest, fetchGuestList, type Rsvp } from "@/lib/supabase";
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
  <div className="rounded-md border border-zari/40 bg-card px-1.5 py-2.5 sm:px-3 sm:py-3 text-center">
    <p className="font-serif text-2xl sm:text-3xl leading-none">{value}</p>
    <p className="mt-1.5 text-[0.55rem] sm:text-[0.65rem] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-muted-foreground">{label}</p>
  </div>
);

const GuestTable = ({
  rows,
  selected,
  onToggle,
  onToggleAll,
}: {
  rows: Rsvp[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}) => (
  <div className="mt-5 max-h-[70svh] overflow-auto rounded-md border border-zari/40 bg-card">
    <table className="w-full min-w-[56rem] text-sm">
      <thead className="sticky top-0 z-20 bg-maroon text-on-photograph">
        <tr className="text-left text-xs tracking-[0.1em] uppercase">
          <th className="sticky left-0 z-10 bg-maroon px-3 py-2.5 font-medium">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                aria-label="Select all"
                checked={rows.length > 0 && rows.every((r) => selected.has(r.id))}
                onChange={onToggleAll}
                className="h-4 w-4 accent-zari"
              />
              Name
            </label>
          </th>
          <th className="px-3 py-2.5 font-medium">Response</th>
          <th className="px-3 py-2.5 font-medium text-right">Guests</th>
          <th className="px-3 py-2.5 font-medium">Phone</th>
          <th className="px-3 py-2.5 font-medium">Email</th>
          <th className="px-3 py-2.5 font-medium">Dietary</th>
          <th className="px-3 py-2.5 font-medium">Message</th>
          <th className="px-3 py-2.5 font-medium">Responded</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const attending = r.attendance === "attending";
          return (
            <tr
              key={r.id}
              className={`border-t border-zari/20 align-top ${selected.has(r.id) ? "bg-haldi/15" : "odd:bg-background even:bg-card"}`}
            >
              <td className="sticky left-0 bg-inherit px-3 py-2.5 font-medium max-w-[13rem]">
                <label className="flex items-start gap-3 break-words">
                  <input
                    type="checkbox"
                    aria-label={`Select ${r.name}`}
                    checked={selected.has(r.id)}
                    onChange={() => onToggle(r.id)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-maroon"
                  />
                  {r.name}
                </label>
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${attending ? "bg-paithani/10 text-paithani" : "bg-muted text-muted-foreground"}`}>
                  {attending ? "Attending" : "Declined"}
                </span>
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">{attending ? headcount(r) : "–"}</td>
              <td className="px-3 py-2.5 whitespace-nowrap">
                {r.phone ? <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="hover:text-rose-foreground">{r.phone}</a> : "–"}
              </td>
              <td className="px-3 py-2.5 break-all">
                {r.email ? <a href={`mailto:${r.email}`} className="hover:text-rose-foreground">{r.email}</a> : "–"}
              </td>
              <td className="px-3 py-2.5 max-w-[12rem]">{r.dietary || "–"}</td>
              <td className="px-3 py-2.5 max-w-[18rem] text-foreground/80">{r.message || "–"}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">{formatDate(r.created_at)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/** Password-protected guest list. The password is checked by the database, never in this code. */
const Invitees = () => {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "attending" | "not-attending">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const removeSelected = async () => {
    const ids = [...selected];
    const label = ids.length === 1 ? "this RSVP" : `these ${ids.length} RSVPs`;
    if (!window.confirm(`Delete ${label}? This can't be undone.`)) return;
    setDeleting(true);
    setError(null);
    const deleted = new Set<string>();
    for (const id of ids) {
      const result = await deleteGuest(password, id);
      if (!("deleted" in result)) {
        setError(errorText[result.error]);
        break;
      }
      deleted.add(id);
    }
    setDeleting(false);
    setRows((current) => current?.filter((r) => !deleted.has(r.id)) ?? null);
    setSelected((current) => new Set([...current].filter((id) => !deleted.has(id))));
  };

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

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-4 gap-2">
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
        {selected.size > 0 && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2">
            <p className="text-sm">
              {selected.size} selected
              <button type="button" onClick={() => setSelected(new Set())} className="ml-3 text-muted-foreground underline underline-offset-2">
                Clear
              </button>
            </p>
            <Button size="sm" variant="destructive" onClick={removeSelected} disabled={deleting} className="gap-2">
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete selected
            </Button>
          </div>
        )}
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {shown.length ? (
          <GuestTable
            rows={shown}
            selected={selected}
            onToggle={toggle}
            onToggleAll={() =>
              setSelected((current) => (shown.every((r) => current.has(r.id)) ? new Set() : new Set(shown.map((r) => r.id))))
            }
          />
        ) : (
          <p className="mt-10 text-center text-muted-foreground">{rows.length ? "No one matches that search." : "No responses yet."}</p>
        )}
      </div>
    </main>
  );
};

export default Invitees;
