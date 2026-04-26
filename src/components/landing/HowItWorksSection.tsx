const steps = [
  {
    number: "01",
    title: "Open WhatsApp Web",
    description: "WhatsReply works inside WhatsApp Web in your Chromium browser. Open it once, and the extension takes care of the rest.",
  },
  {
    number: "02",
    title: "AI reads incoming messages",
    description: "When a new message arrives in a chat, WhatsReply analyzes it and drafts a reply using your business context, tone, and saved knowledge.",
  },
  {
    number: "03",
    title: "Review or auto-send",
    description: "In Review Mode, the suggested reply appears in the chat input for you to approve or edit. In Auto-Reply Mode, it's sent immediately.",
  },
  {
    number: "04",
    title: "Conversation moves on",
    description: "Once handled, the chat is marked as processed. WhatsReply tracks every conversation so it never replies twice or gets stuck on the same message.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            A focused workflow, not a noisy chat plugin
          </h2>
          <p className="text-muted-foreground text-lg">
            WhatsReply doesn't try to manage your entire WhatsApp. It works through a reliable, scoped process that handles one conversation at a time.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary shrink-0">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-3" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
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
