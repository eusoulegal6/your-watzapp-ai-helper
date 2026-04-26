import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smart replies",
    body: "Draft on-brand WhatsApp responses in your tone — fast.",
  },
  {
    icon: Shield,
    title: "You stay in control",
    body: "Review before sending, with quotas and audit-friendly logs.",
  },
  {
    icon: Zap,
    title: "Works where you do",
    body: "Sign in once and pick up replies from any device.",
  },
];

const Index = () => {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">WhatsReply</span>
        </div>
        <Link to="/auth">
          <Button variant="outline">Sign in</Button>
        </Link>
      </header>

      <main className="container mx-auto px-6 pb-24">
        <section className="mx-auto max-w-3xl py-20 text-center">
          <h1 className="text-balance text-5xl font-extrabold tracking-tight md:text-6xl">
            Reply on WhatsApp,{" "}
            <span className="text-gradient">without the typing</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            WhatsReply drafts thoughtful messages in your voice so you can stay on top of
            every conversation — personal or professional.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="glow-primary">
                Get started free
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="ghost">
                See features
              </Button>
            </a>
          </div>
        </section>

        <section id="features" className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="card-lift rounded-2xl border border-border bg-card p-6"
            >
              <div className="card-lift-icon mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} WhatsReply</span>
          <Link to="/auth" className="story-link">Sign in</Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
