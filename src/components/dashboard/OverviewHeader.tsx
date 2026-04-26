import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const OverviewHeader = () => {
  const { user } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, [showVideo]);

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <section id="overview" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{today}</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">
            Hi {firstName} 👋
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Here's what your WhatsApp assistant has been up to.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="#setup" className="gap-2">
              <BookOpen size={14} />
              Install guide
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowVideo(true)} className="gap-2">
            <Play size={14} />
            Demo
          </Button>
        </div>
      </div>

      {showVideo && (
        <div className="rounded-2xl border bg-card overflow-hidden shadow-xl relative">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            aria-label="Close video"
          >
            <X size={16} />
          </button>
          <video ref={videoRef} className="w-full" controls autoPlay playsInline preload="auto">
            <source src="/videos/send-smart-demo.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </section>
  );
};

export default OverviewHeader;
