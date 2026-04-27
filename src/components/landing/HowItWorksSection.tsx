import { MessageCircle, Brain, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    label: "Step 01",
    title: "Open WhatsApp Web",
    description: "WhatsReply runs inside WhatsApp Web. Open it once — the extension takes over.",
  },
  {
    icon: Brain,
    label: "Step 02",
    title: "AI reads & drafts",
    description: "Each new message is analyzed and a reply is drafted from your business context.",
  },
  {
    icon: CheckCircle2,
    label: "Step 03",
    title: "Review or auto-send",
    description: "Approve drafts in one click, or let them ship automatically based on your rules.",
  },
  {
    icon: ArrowRight,
    label: "Step 04",
    title: "Move on",
    description: "Each chat is marked as handled. No duplicates, no loops, no lost threads.",
  },
];

/**
 * Horizontal numbered workflow strip — replaces the previous vertical timeline.
 * On mobile collapses to a single column.
 */
const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 max-w-5xl">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-wa-green uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              A focused workflow, <br className="hidden md:block" />
              <span className="text-gradient">not a noisy chat plugin.</span>
            </h2>
          </div>
          <p className="text-muted-foreground md:max-w-sm">
            WhatsReply doesn't try to manage your entire WhatsApp. It handles one conversation at a time — reliably.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-wa-green/30 to-transparent"
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                <div className="flex md:flex-col gap-4 md:gap-0">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-background border border-wa-green/30 shadow-sm shrink-0 md:mb-5 z-10">
                    <step.icon className="h-6 w-6 text-wa-green" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-muted-foreground mb-1.5">{step.label}</p>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
