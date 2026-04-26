import { Button } from "@/components/ui/button";
import { LogOut, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="/dashboard" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-wa-green text-primary-foreground">
            <MessageCircle size={18} strokeWidth={2.5} />
          </span>
          <span className="text-gradient">WhatsReply</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm text-foreground transition-colors"
          >
            Dashboard
          </a>
          <a href="#review" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Review</a>
          <a href="#usage" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Usage</a>
          <a href="#help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help</a>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-muted-foreground truncate max-w-[180px]">
            {user?.email}
          </span>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5">
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
