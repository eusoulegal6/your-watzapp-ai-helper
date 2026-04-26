import { Database, UserCog, Filter, Clock } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Database,
    title: "Business information",
    description: "Save your hours, location, products, and prices so AI replies are always accurate and on-brand.",
  },
  {
    icon: UserCog,
    title: "Tone & style",
    description: "Set your tone — friendly, professional, casual — and how short or detailed replies should be.",
  },
  {
    icon: Filter,
    title: "Contact filters",
    description: "Choose which chats WhatsReply handles. Whitelist customers, mute groups, or skip family chats entirely.",
  },
  {
    icon: Clock,
    title: "Business hours",
    description: "Auto-reply only during business hours, or send polite out-of-office messages outside them.",
  },
];

const CustomizationSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-wa-green/20 bg-wa-green/5 px-4 py-1.5 text-sm text-wa-green mb-6">
            Coming with account support
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Make it yours
          </h2>
          <p className="text-muted-foreground text-lg">
            Upcoming account features will let you save settings, sync across devices, and fine-tune every aspect of your AI replies.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80} className="card-lift flex gap-4 p-5 rounded-xl border border-border bg-card">
              <div className="card-lift-icon flex h-9 w-9 items-center justify-center rounded-lg bg-wa-green/10 shrink-0">
                <f.icon size={18} className="text-wa-green" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
