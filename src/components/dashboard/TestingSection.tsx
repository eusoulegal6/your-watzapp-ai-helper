import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Eye, Zap, CheckCircle, MessageCircle } from "lucide-react";

const TestingSection = () => {
  return (
    <Card id="testing">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck size={18} className="text-primary" />
          Get Started Safely
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          WhatsReply is designed to give you full control. Follow these steps to build confidence before enabling automation.
        </p>

        <div className="space-y-3">
          <div className="flex gap-3 rounded-lg border border-border p-4">
            <Eye size={20} className="text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Start with Review Mode</p>
              <p className="text-xs text-muted-foreground mt-1">
                In Review Mode, the AI drafts replies into the WhatsApp chat input but waits for you to hit send. You see every message and can edit or discard it.
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-border p-4">
            <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Verify your settings</p>
              <p className="text-xs text-muted-foreground mt-1">
                Make sure your business context, tone, and signature are set correctly. The quality of AI replies depends directly on the information you provide.
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-border p-4">
            <MessageCircle size={20} className="text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">WhatsReply only handles new incoming messages</p>
              <p className="text-xs text-muted-foreground mt-1">
                The extension reads the latest unread message in each chat. It won't go back through your history or reply to conversations you've already handled.
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-border p-4">
            <Zap size={20} className="text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Switch to Auto-Reply when ready</p>
              <p className="text-xs text-muted-foreground mt-1">
                Once you trust the replies, switch to Auto-Reply Mode. The AI will respond instantly — no manual approval required.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestingSection;
