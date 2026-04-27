import { MessageCircle } from "lucide-react";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Install", href: "#install" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/auth" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-14">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2 max-w-sm">
            <a href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-wa-green text-primary-foreground">
                <MessageCircle size={16} strokeWidth={2.5} />
              </span>
              <span className="text-gradient">WhatsReply</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Chrome extension that drafts on-brand WhatsApp replies from your business context — so you never miss a customer message.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} WhatsReply. WhatsApp AI auto-reply extension.
          </p>
          <p className="text-xs text-muted-foreground">
            Not affiliated with WhatsApp Inc. or Meta Platforms.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
