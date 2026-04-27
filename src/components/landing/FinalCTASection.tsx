import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useExtensionDownload } from "@/hooks/use-extension-download";

const FinalCTASection = () => {
  const { handleDownload } = useExtensionDownload();
  return (
    <section id="final-cta" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-wa-green/15 via-wa-teal/5 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-wa-green/15 blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl border border-wa-green/25 bg-card/80 backdrop-blur-xl p-10 md:p-16 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-wa-green text-primary-foreground shadow-lg mb-6">
            <MessageCircle size={22} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Stop typing the same replies. <br className="hidden md:block" />
            <span className="text-gradient-animated">Start replying smart.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Install the extension, set up your business context, and let AI handle your repetitive WhatsApp chats. Two minutes, free forever in early access.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" onClick={handleDownload} className="gap-2">
              <MessageCircle size={18} />
              Install WhatsReply
            </Button>
            <Button variant="hero-outline" size="lg" asChild className="gap-2">
              <a href="#how-it-works">
                Learn more
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
