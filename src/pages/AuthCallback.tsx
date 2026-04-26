import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      try {
        // Tokens may arrive in the URL hash (#access_token=...) or query string (?access_token=...).
        const hash = window.location.hash.startsWith("#")
          ? window.location.hash.slice(1)
          : window.location.hash;
        const hashParams = new URLSearchParams(hash);
        const queryParams = new URLSearchParams(window.location.search);

        const access_token =
          hashParams.get("access_token") || queryParams.get("access_token");
        const refresh_token =
          hashParams.get("refresh_token") || queryParams.get("refresh_token");
        const error_description =
          hashParams.get("error_description") ||
          queryParams.get("error_description");

        if (error_description) {
          throw new Error(error_description);
        }

        if (!access_token || !refresh_token) {
          // Maybe session was already set by the OAuth broker.
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            navigate("/dashboard", { replace: true });
            return;
          }
          throw new Error("Missing access_token or refresh_token in callback URL");
        }

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) throw error;

        // Clean tokens from the URL before navigating.
        window.history.replaceState({}, document.title, "/auth/callback");
        navigate("/dashboard", { replace: true });
      } catch (err: any) {
        console.error("[AuthCallback] error:", err);
        toast({
          title: "Sign-in failed",
          description: err?.message ?? "Could not complete sign-in.",
          variant: "destructive",
        });
        navigate("/auth", { replace: true });
      }
    };

    run();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Completing sign-in…</p>
    </div>
  );
};

export default AuthCallback;
