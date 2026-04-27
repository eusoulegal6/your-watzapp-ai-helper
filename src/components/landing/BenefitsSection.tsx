import { Eye, Zap, Clock, Languages, Shield, Fingerprint, Check } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Bento-style features grid that combines product modes (Review / Auto-Reply)
 * with the highest-signal benefits, replacing the previous two centered sections.
 */
const BentoFeatures = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-wa-green uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Two modes. One workflow that <span className="text-gradient">just runs.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Pick how much oversight you want — and let WhatsReply handle the rest with your business context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl">
          {/* Review Mode — large feature card */}
          <Reveal className="md:col-span-3 md:row-span-2 card-lift rounded-2xl border border-wa-teal/20 bg-gradient-to-br from-wa-teal/10 via-wa-teal/5 to-transparent p-7 flex flex-col">
            <div className="card-lift-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-wa-teal/15 mb-5">
              <Eye className="h-5 w-5 text-wa-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2">Review Mode</h3>
            <p className="text-sm text-muted-foreground mb-6">You stay in the loop. Drafts appear in the chat input — approve, edit, or skip.</p>
            <ul className="space-y-2.5 mt-auto">
              {[
                "Drafts inserted directly in WhatsApp Web",
                "One-click approve or edit",
                "Best for VIPs and sensitive chats",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={14} className="text-wa-teal mt-1 shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Auto-Reply Mode — large feature card */}
          <Reveal delay={80} className="md:col-span-3 md:row-span-2 card-lift rounded-2xl border border-wa-green/25 bg-gradient-to-br from-wa-green/15 via-wa-green/5 to-transparent p-7 flex flex-col">
            <div className="card-lift-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-wa-green/20 mb-5">
              <Zap className="h-5 w-5 text-wa-green" />
            </div>
            <h3 className="text-xl font-bold mb-2">Auto-Reply Mode</h3>
            <p className="text-sm text-muted-foreground mb-6">Hands-off responses for FAQs, hours, pricing, and bookings — all on-brand.</p>
            <ul className="space-y-2.5 mt-auto">
              {[
                "Replies sent without manual review",
                "Per-contact filters & business hours",
                "Saves hours on high-volume support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={14} className="text-wa-green mt-1 shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Smaller benefits */}
          <Reveal delay={120} className="md:col-span-2 card-lift rounded-2xl border border-border bg-card p-5">
            <Clock className="h-5 w-5 text-wa-green mb-3" />
            <h3 className="font-semibold text-sm mb-1.5">24/7, instant</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Customers expect minutes — not hours. WhatsReply replies even at 3am.</p>
          </Reveal>

          <Reveal delay={160} className="md:col-span-2 card-lift rounded-2xl border border-border bg-card p-5">
            <Languages className="h-5 w-5 text-wa-green mb-3" />
            <h3 className="font-semibold text-sm mb-1.5">Speaks their language</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Auto-detects and replies in the language of the incoming message.</p>
          </Reveal>

          <Reveal delay={200} className="md:col-span-2 card-lift rounded-2xl border border-border bg-card p-5">
            <Fingerprint className="h-5 w-5 text-wa-green mb-3" />
            <h3 className="font-semibold text-sm mb-1.5">Your context, not generic</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Uses your products, prices, hours and policies — not boilerplate.</p>
          </Reveal>

          {/* Wide reliability strip */}
          <Reveal delay={240} className="md:col-span-6 card-lift rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="card-lift-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-wa-green/10 shrink-0">
              <Shield className="h-5 w-5 text-wa-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Built to be boring (in the best way)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every chat is processed once. No duplicate replies, no infinite loops, no embarrassing AI moments. WhatsReply tracks state so it knows exactly which conversations it's already handled.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
