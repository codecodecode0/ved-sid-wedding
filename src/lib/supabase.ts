import { createClient } from "@supabase/supabase-js";

/**
 * Browser client using the project's public (anon) key. The rsvps table only
 * allows inserts from it, so guests can respond but cannot read responses.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;

export type RsvpRow = {
  name: string;
  email: string | null;
  phone: string | null;
  attendance: "attending" | "not-attending";
  guests: number | null;
  dietary: string | null;
  message: string | null;
};

export async function saveRsvp(row: RsvpRow) {
  if (!supabase) throw new Error("RSVP storage is not configured yet.");
  const { error } = await supabase.from("rsvps").insert(row);
  if (error) throw error;
}

export type Rsvp = RsvpRow & { id: string; created_at: string };

export type GuestListResult = { rows: Rsvp[] } | { error: "wrong_password" | "too_many_attempts" | "unavailable" };

/** The database checks the password and only then returns every RSVP. */
export async function fetchGuestList(password: string): Promise<GuestListResult> {
  if (!supabase) return { error: "unavailable" };
  const { data, error } = await supabase.rpc("get_rsvps", { p_password: password });
  if (error || !data) return { error: "unavailable" };
  return data as GuestListResult;
}
