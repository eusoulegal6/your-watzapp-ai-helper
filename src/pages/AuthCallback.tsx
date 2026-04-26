import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  registerAppAccount,
  checkAppMembership,
  PENDING_REGISTER_KEY,
} from "@/lib/accountApp";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Wait for Supabase to parse the OAuth hash and establish a session.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (!cancelled) navigate("/auth", { replace: true });
        return;
      }

      const pending = sessionStorage.getItem(PENDING_REGISTER_KEY);
      try {
        if (pending === "whatsreply") {
          sessionStorage.removeItem(PENDING_REGISTER_KEY);
          await registerAppAccount();
          if (!cancelled) navigate("/dashboard", { replace: true });
        } else {
          const { member } = await checkAppMembership();
          if (!member) {
            await supabase.auth.signOut();
            toast.error(
              "This email isn't registered on WhatsReply. Please sign up first."
            );
            if (!cancelled) navigate("/auth", { replace: true });
            return;
          }
          if (!cancelled) navigate("/dashboard", { replace: true });
        }
      } catch (err: any) {
        toast.error(err?.message ?? "Authentication failed");
        if (!cancelled) navigate("/auth", { replace: true });
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Finishing sign in…</p>
    </div>
  );
};

export default AuthCallback;
