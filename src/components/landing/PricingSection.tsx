import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Early Access",
    price: "Free",
    sub: "Available now",
    description: "Everything you need to start automating WhatsApp replies today.",
    features: [
      "Up to 500 AI replies / month",
      "Review Mode + Auto-Reply Mode",
      "Business context configuration",
      "Manual extension install",
    ],
    cta: "Get started free",
    href: "#install",
    highlight: false,
  },
  {
    name: "Pro",
    price: "Soon",
    sub: "Join the waitlist",
    description: "For teams running real volume on WhatsApp who need more headroom.",
    features: [
      "Everything in Early Access",
      "Unlimited AI replies",
      "Cloud-synced settings",
      "Per-contact rules & filters",
      "Multi-language tone tuning",
      "Priority support",
    ],
    cta: "Join the waitlist",
    href: "#final-cta",
    highlight: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-wa-green uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Free while in early access.
          </h2>
          <p className="text-muted-foreground text-lg">
            Start using WhatsReply today at no cost. Paid plans with expanded features are on the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-7 md:p-8 ${
                tier.highlight
                  ? "border-wa-green/40 bg-gradient-to-br from-wa-green/10 via-card to-card shadow-[0_0_60px_-20px_hsl(var(--wa-green)/0.4)]"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-wa-green px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles size={12} />
                  Coming soon
                </span>
              )}
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-lg">{tier.name}</h3>
                <span className="text-xs text-muted-foreground">{tier.sub}</span>
              </div>
              <div className="text-4xl font-extrabold mb-3 tracking-tight">{tier.price}</div>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2.5 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 mt-px ${tier.highlight ? "bg-wa-green/20" : "bg-muted"}`}>
                      <Check size={12} className={tier.highlight ? "text-wa-green" : "text-foreground/70"} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.highlight ? "hero" : "hero-outline"}
                className="w-full"
                asChild
              >
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
