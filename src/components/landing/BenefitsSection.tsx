import { Clock, MessageCircle, Fingerprint, Shield, Globe, Settings } from "lucide-react";
import Reveal from "./Reveal";

const benefits = [
  {
    icon: Clock,
    title: "Reply 24/7, instantly",
    description: "Customers expect WhatsApp replies in minutes. WhatsReply answers around the clock, even when you're asleep.",
  },
  {
    icon: MessageCircle,
    title: "Never miss a lead",
    description: "Every inbound message gets a thoughtful, on-brand reply — so casual enquiries don't slip through the cracks.",
  },
  {
    icon: Fingerprint,
    title: "Your business context",
    description: "Replies use your products, hours, prices, and policies — not generic templates that sound like a bot.",
  },
  {
    icon: Globe,
    title: "Speaks your customers' language",
    description: "Auto-detects and replies in the language of the incoming message. Perfect for international audiences.",
  },
  {
    icon: Shield,
    title: "Built for reliability",
    description: "Each chat is processed once. No duplicate replies, no infinite loops, no embarrassing mistakes.",
  },
  {
    icon: Settings,
    title: "Configurable rules",
    description: "Set per-contact filters, business hours, and tone preferences to match how you actually run your business.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built for businesses that actually run on WhatsApp
          </h2>
          <p className="text-muted-foreground text-lg">
            Not another chat widget. A focused tool for operational customer messaging.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 80}
              className="card-lift rounded-xl border border-border bg-card p-6"
            >
              <div className="card-lift-icon inline-flex h-9 w-9 items-center justify-center rounded-lg bg-wa-green/10 mb-4">
                <b.icon className="h-5 w-5 text-wa-green" />
              </div>
              <h3 className="font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
