import { useEffect, useState } from "react";

/**
 * Reveals `text` character-by-character to mimic live typing.
 * A soft blinking caret trails the last shown character until the text is complete.
 */
export default function Typewriter({
  text,
  speed = 14,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!text) return;
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setCount(text.length);
        return;
      }
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  const done = count >= text.length;
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className={`inline-block w-[1px] h-[1em] -mb-[2px] ml-[1px] bg-current align-baseline ${
          done ? "animate-pulse opacity-40" : "opacity-80"
        }`}
        style={{ animation: done ? undefined : "tw-caret 0.9s steps(1) infinite" }}
      />
      <style>{`@keyframes tw-caret { 0%,49%{opacity:0.85} 50%,100%{opacity:0} }`}</style>
    </span>
  );
}
