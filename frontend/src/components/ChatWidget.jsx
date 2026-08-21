import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const suggestions = [
  "What projects has Atharva built?",
  "What are his top skills?",
  "Is he open to work?",
  "How can I contact him?",
];

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);
  const [sessionId] = useState(() => {
    let s = sessionStorage.getItem("ag_chat_session");
    if (!s) {
      s = crypto.randomUUID();
      sessionStorage.setItem("ag_chat_session", s);
    }
    return s;
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || streaming) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: message }, { role: "assistant", text: "" }]);
    setStreaming(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const data = part.replace(/^data: /, "");
          if (data === "[DONE]") break;
          try {
            const { token } = JSON.parse(data);
            if (token) {
              const clean = token.replaceAll("**", "");
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", text: copy[copy.length - 1].text + clean };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", text: "Connection hiccup — try again, or email atharvagawande05@gmail.com." };
        return copy;
      });
    }
    setStreaming(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-testid="chat-toggle-btn"
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-lime text-black shadow-[0_0_30px_rgba(202,255,0,0.35)] transition-transform duration-300 hover:scale-110"
        whileTap={{ scale: 0.92 }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[95] flex h-[520px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden border border-white/10 bg-black/80 backdrop-blur-2xl"
            data-testid="chat-panel"
          >
            <div className="border-b border-white/10 p-5">
              <p className="flex items-center gap-2 font-tech text-xs uppercase tracking-[0.3em] text-lime">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime" /> Ask Me Anything
              </p>
              <p className="mt-1.5 text-xs font-light text-muted">Talks like Atharva himself — trained on his resume.</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5" data-testid="chat-messages">
              {messages.length === 0 && (
                <div className="flex h-full flex-col justify-center gap-2.5">
                  {suggestions.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      data-testid={`chat-suggestion-${i}`}
                      className="border border-white/15 px-4 py-3 text-left text-sm font-light text-muted transition-colors duration-300 hover:border-lime/50 hover:text-lime"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"} data-testid={`chat-message-${i}`}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] border border-lime/40 bg-lime/10 px-4 py-2.5 text-sm font-light text-white"
                        : "max-w-[85%] border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-light text-gray-200"
                    }
                  >
                    {m.text || (streaming && i === messages.length - 1 ? <span className="animate-pulse text-lime">●●●</span> : null)}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-white/10 p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                data-testid="chat-input"
                placeholder="Ask about projects, skills..."
                className="flex-1 bg-transparent text-sm font-light text-white outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={streaming}
                data-testid="chat-send-btn"
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center bg-lime text-black transition-opacity duration-300 disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
