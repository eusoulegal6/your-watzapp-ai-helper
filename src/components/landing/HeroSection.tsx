import { MessageCircle, ArrowRight, Sparkles, ShieldCheck, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExtensionDownload } from "@/hooks/use-extension-download";
import AnimatedChat from "./AnimatedChat";

const trustItems = [
  { icon: Sparkles, label: "AI-drafted replies" },
  { icon: ShieldCheck, label: "You stay in control" },
  { icon: Languages, label: "Auto language match" },
];

const HeroSection = () => {
  const { handleDownload } = useExtensionDownload();
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-24">
      {/* Soft green ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-wa-green/15 blur-[140px] animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[460px] h-[460px] rounded-full bg-wa-teal/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-7 max-w-xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green mb-6 opacity-0 animate-fade-up">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-wa-green animate-ping-ring" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-wa-green" />
              </span>
              Live in WhatsApp Web · Early access
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.02] tracking-tight mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Reply to every WhatsApp message{" "}
              <span className="text-gradient-animated">while you sleep.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              WhatsReply is a Chrome extension that drafts on-brand WhatsApp replies from your business context. Approve them in one click, or let it auto-send.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" onClick={handleDownload} className="gap-2">
                <MessageCircle size={18} />
                Get WhatsReply free
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="gap-2">
                <a href="#how-it-works">
                  See how it works
                  <ArrowRight size={16} />
                </a>
              </Button>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {trustItems.map((t) => (
                <li key={t.label} className="inline-flex items-center gap-2">
                  <t.icon size={14} className="text-wa-green" />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: AnimatedChat */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-wa-green/20 via-wa-teal/10 to-transparent rounded-3xl blur-2xl" aria-hidden />
              <div className="relative">
                <AnimatedChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
