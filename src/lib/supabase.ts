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
