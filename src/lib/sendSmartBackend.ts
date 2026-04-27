/**
 * Client for the separate Send Smart backend Supabase project.
 *
 * The dashboard's own session JWT (issued by Lovable Cloud) cannot be
 * verified by the send-smart-backend project, so we authenticate against
 * those edge functions using the user's extension *pair token* instead.
 *
 * Flow:
 *   1. On first call, exchange the dashboard JWT for a pair token via the
 *      backend's `dashboard-token-get` edge function (which validates the
 *      JWT against shared JWKS and returns the active extension token for
 *      that user).
 *   2. Cache the pair token in localStorage and reuse it for subsequent
 *      calls. If a call returns 401, drop the cache and retry once.
 */
import { supabase } from "@/integrations/supabase/client";

export const SEND_SMART_BACKEND_URL = "https://ocpphyjkstvfespxrajk.supabase.co";
export const SEND_SMART_BACKEND_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcHBoeWprc3R2ZmVzcHhyYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODExMzUsImV4cCI6MjA5Mjc1NzEzNX0.wcqrpSVkgDZRPet_4yLcF5YYISsWqRacVNOHf_eW8uY";

const TOKEN_STORAGE_KEY = "ss_pair_token_v1";

function getCachedToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setCachedToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function clearPairToken() {
  setCachedToken(null);
}

async function fetchPairToken(): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not signed in");

  const res = await fetch(
    `${SEND_SMART_BACKEND_URL}/functions/v1/dashboard-token-get`,
    {
      method: "POST",
      headers: {
        apikey: SEND_SMART_BACKEND_ANON_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    let msg = `Could not load backend token (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  const body = (await res.json()) as { token?: string };
  if (!body.token) throw new Error("Backend returned no token");
  setCachedToken(body.token);
  return body.token;
}

async function getPairToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh) {
    const cached = getCachedToken();
    if (cached) return cached;
  }
  return fetchPairToken();
}

export interface BackendFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
}

/**
 * Call a Send Smart backend edge function authenticated with the pair token.
 * Automatically refreshes the token once on 401.
 */
export async function callBackend<T>(
  path: string,
  opts: BackendFetchOptions = {},
): Promise<T> {
  const { method = "GET", body, query } = opts;

  const url = new URL(`${SEND_SMART_BACKEND_URL}/functions/v1/${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  const doFetch = async (token: string) =>
    fetch(url.toString(), {
      method,
      headers: {
        apikey: SEND_SMART_BACKEND_ANON_KEY,
        Authorization: `Bearer ${token}`,
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let token = await getPairToken();
  let res = await doFetch(token);

  if (res.status === 401) {
    // Token may have been revoked / rotated — refresh and retry once.
    clearPairToken();
    token = await getPairToken(true);
    res = await doFetch(token);
  }

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  return (await res.json()) as T;
}
