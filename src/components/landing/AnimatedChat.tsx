import { useEffect, useState } from "react";

type ChatItem = {
  contact: string;
  initials: string;
  incoming: string;
  reply: string;
};

const CHATS: ChatItem[] = [
  {
    contact: "Sarah Mitchell",
    initials: "SM",
    incoming: "Hi! Are you open on Sunday?",
    reply:
      "Hi Sarah! Yes, we're open Sunday from 10am to 6pm. Looking forward to seeing you! 🙌",
  },
  {
    contact: "Mike Carter",
    initials: "MC",
    incoming: "How much for 50 units?",
    reply:
      "Hi Mike! 50 units come to $1,250 with our 12% bulk discount. I'll send the full quote shortly.",
  },
  {
    contact: "Lisa Wong",
    initials: "LW",
    incoming: "Can I book a table for 4 tonight at 8?",
    reply:
      "Booked! Table for 4, tonight at 8pm under your name. We'll see you then 🍽️",
  },
  {
    contact: "James Reid",
    initials: "JR",
    incoming: "Do you ship internationally?",
    reply:
      "Yes! We ship worldwide via DHL. Delivery is usually 3–5 business days. Want a shipping quote?",
  },
];

const PHASE_DURATIONS = {
  incoming: 900,
  thinking: 1100,
  typing: 2200,
  sent: 1200,
};
const TOTAL_PER_CHAT =
  PHASE_DURATIONS.incoming +
  PHASE_DURATIONS.thinking +
  PHASE_DURATIONS.typing +
  PHASE_DURATIONS.sent;

type Phase = "incoming" | "thinking" | "typing" | "sent";

const useTypewriter = (text: string, active: boolean, durationMs: number) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const len = Math.floor(t * text.length);
      setOut(text.slice(0, len));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, active, durationMs]);
  return out;
};

const DoubleCheck = ({ blue = false }: { blue?: boolean }) => (
  <svg
    width="16"
    height="11"
    viewBox="0 0 16 11"
    fill="none"
    className={blue ? "text-check-blue" : "text-foreground/40"}
    aria-hidden
  >
    <path
      d="M11.071 0.653a.75.75 0 0 1 .026 1.061l-6 6.25a.75.75 0 0 1-1.08.001L1.196 5.118a.75.75 0 1 1 1.08-1.04l2.282 2.366L10.01 0.679a.75.75 0 0 1 1.061-.026Z"
      fill="currentColor"
    />
    <path
      d="M15.071 0.653a.75.75 0 0 1 .026 1.061l-6 6.25a.75.75 0 0 1-1.08.001l-.7-.726a.75.75 0 0 1 1.08-1.04l.16.166L14.01 0.679a.75.75 0 0 1 1.061-.026Z"
      fill="currentColor"
    />
  </svg>
);

const AnimatedChat = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("incoming");
  const [repliedCount, setRepliedCount] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    setPhase("incoming");
    timers.push(window.setTimeout(() => setPhase("thinking"), PHASE_DURATIONS.incoming));
    timers.push(
      window.setTimeout(
        () => setPhase("typing"),
        PHASE_DURATIONS.incoming + PHASE_DURATIONS.thinking,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setPhase("sent"),
        PHASE_DURATIONS.incoming + PHASE_DURATIONS.thinking + PHASE_DURATIONS.typing,
      ),
    );
    timers.push(
      window.setTimeout(() => {
        setRepliedCount((c) => c + 1);
        setIndex((i) => (i + 1) % CHATS.length);
      }, TOTAL_PER_CHAT),
    );
    return () => timers.forEach(clearTimeout);
  }, [index]);

  const chat = CHATS[index];
  const typedReply = useTypewriter(
    chat.reply,
    phase === "typing" || phase === "sent",
    PHASE_DURATIONS.typing - 200,
  );

  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
      {/* WhatsApp-style header */}
      <div className="bg-wa-header text-primary-foreground px-4 py-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-wa-green/80 flex items-center justify-center text-sm font-semibold shrink-0">
          {chat.initials}
        </div>
        <div key={index} className="min-w-0 flex-1 animate-fade-in">
          <div className="text-sm font-medium truncate">{chat.contact}</div>
          <div className="text-[11px] text-primary-foreground/70 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-wa-green animate-ping-ring" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-wa-green" />
            </span>
            online
          </div>
        </div>
        <div className="text-[11px] text-primary-foreground/60 hidden sm:block">
          WhatsApp Web
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-wallpaper px-4 py-5 min-h-[280px] space-y-3">
        {/* Incoming message */}
        <div key={`in-${index}`} className="flex justify-start opacity-0 animate-bubble-pop">
          <div className="bubble-in max-w-[78%] px-3 py-2">
            <p className="text-sm text-foreground leading-snug">{chat.incoming}</p>
            <div className="text-[10px] text-muted-foreground text-right mt-0.5">
              {time}
            </div>
          </div>
        </div>

        {/* AI typing / reply */}
        {phase === "thinking" && (
          <div className="flex justify-end opacity-0 animate-bubble-pop">
            <div className="bubble-out max-w-[78%] px-3 py-2.5 inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-wa-teal/80 animate-typing-dot" style={{ animationDelay: "0s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-wa-teal/80 animate-typing-dot" style={{ animationDelay: "0.2s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-wa-teal/80 animate-typing-dot" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}

        {(phase === "typing" || phase === "sent") && (
          <div key={`out-${index}`} className="flex justify-end opacity-0 animate-bubble-pop">
            <div className="bubble-out max-w-[78%] px-3 py-2">
              <p className="text-sm text-foreground leading-snug min-h-[1.25rem]">
                {typedReply}
                {phase === "typing" && (
                  <span className="inline-block w-[2px] h-3.5 bg-wa-teal/80 align-middle ml-0.5 animate-pulse" />
                )}
              </p>
              <div className="text-[10px] text-muted-foreground text-right mt-0.5 flex items-center justify-end gap-1">
                <span>{time}</span>
                {phase === "sent" && <DoubleCheck blue />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer status bar */}
      <div className="border-t border-border bg-card px-4 py-2.5 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-wa-green animate-ping-ring" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-wa-green" />
          </span>
          <span className="font-medium text-foreground">WhatsReply</span>
          <span className="text-muted-foreground/60">·</span>
          <span>auto-replying</span>
        </span>
        <span className="text-muted-foreground tabular-nums">
          <span className="font-medium text-foreground">{repliedCount}</span> replies sent
        </span>
      </div>
    </div>
  );
};

export default AnimatedChat;
