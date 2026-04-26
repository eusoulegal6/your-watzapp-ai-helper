import { createClient } from "@supabase/supabase-js";

// Shared WhatsReply backend (separate from Lovable Cloud's auto-generated client).
// These are public/anon keys — safe to commit.
const SUPABASE_URL = "https://uexdjvbdqwrzlgfrpgbl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleGRqdmJkcXdyemxnZnJwZ2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NzE2NDEsImV4cCI6MjA5MDI0NzY0MX0.-BAr2q1F_2Kn-v0foNSfSvuRbGEnaom_kPZI-r7f6Nw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  },
});
