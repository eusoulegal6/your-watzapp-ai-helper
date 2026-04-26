import { supabase } from "@/lib/supabase";

const APP_KEY = "whatsreply" as const;
const SUPABASE_URL = "https://uexdjvbdqwrzlgfrpgbl.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleGRqdmJkcXdyemxnZnJwZ2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NzE2NDEsImV4cCI6MjA5MDI0NzY0MX0.-BAr2q1F_2Kn-v0foNSfSvuRbGEnaom_kPZI-r7f6Nw";

export const PENDING_REGISTER_KEY = "__pending_app_register";

type Action = "register" | "check";

interface AccountAppResponse {
  member?: boolean;
  ok?: boolean;
  error?: string;
}

async function callAccountApp(action: Action): Promise<AccountAppResponse> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("No active session");

  const res = await fetch(`${SUPABASE_URL}/functions/v1/account-app`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      app_key: APP_KEY,
      user_id: session.user.id,
    }),
  });

  let json: AccountAppResponse = {};
  try {
    json = await res.json();
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    throw new Error(json.error ?? `account-app ${action} failed (${res.status})`);
  }
  return json;
}

export const registerAppAccount = () => callAccountApp("register");
export const checkAppMembership = () => callAccountApp("check");
