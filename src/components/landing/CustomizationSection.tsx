import { Database, UserCog, Filter, Clock, Download, FolderOpen, Chrome, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExtensionDownload } from "@/hooks/use-extension-download";

const customization = [
  {
    icon: Database,
    title: "Business info",
    description: "Hours, location, products, prices — saved once, used in every reply.",
  },
  {
    icon: UserCog,
    title: "Tone & style",
    description: "Friendly, professional, casual. Short bullets or longer answers.",
  },
  {
    icon: Filter,
    title: "Contact filters",
    description: "Whitelist customers, mute groups, skip family chats entirely.",
  },
  {
    icon: Clock,
    title: "Business hours",
    description: "Reply only in hours, or send polite out-of-office responses.",
  },
];

const setupSteps = [
  { icon: Download, title: "Download", description: "Grab the extension archive." },
  { icon: FolderOpen, title: "Extract", description: "Unzip to a folder you'll keep." },
  { icon: Chrome, title: "Load unpacked", description: "chrome://extensions → Developer mode." },
  { icon: KeyRound, title: "Pair", description: "Generate a code in your dashboard." },
];

/**
 * Combined "Make it yours" + "Get installed" section — two-column layout.
 * Replaces the standalone CustomizationSection + InstallSection.
 */
const CustomizationSection = () => {
  const { handleDownload } = useExtensionDownload();
  return (
    <section id="setup" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Customization */}
          <div>
            <p className="text-sm font-medium text-wa-green uppercase tracking-wider mb-3">Make it yours</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Tune every reply to your business.
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Account features let you save settings, sync across devices, and fine-tune every aspect of your AI replies.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {customization.map((f) => (
                <div key={f.title} className="card-lift flex gap-3 p-4 rounded-xl border border-border bg-card">
                  <div className="card-lift-icon flex h-9 w-9 items-center justify-center rounded-lg bg-wa-green/10 shrink-0">
                    <f.icon size={16} className="text-wa-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Install */}
          <div id="install" className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-wa-green/5 via-card to-card p-7 md:p-8">
              <p className="text-sm font-medium text-wa-green uppercase tracking-wider mb-3">Install in 2 minutes</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                Loaded as an unpacked extension. No store, no waiting.
              </h2>

              <ol className="space-y-3 mb-8">
                {setupSteps.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-wa-green/15 text-wa-green text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center gap-2">
                        <step.icon size={14} className="text-muted-foreground" />
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <Button variant="hero" size="lg" onClick={handleDownload} className="w-full gap-2">
                <Download size={18} />
                Download WhatsReply
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Chrome, Edge, Brave, Arc — any Chromium browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
