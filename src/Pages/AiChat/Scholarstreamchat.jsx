import { useState, useRef, useEffect } from "react";
import useAxios from "../../Hooks/useAxios/useAxios";

const WELCOME =
  "Hi! I'm Scholar AI 👋 Ask me anything about scholarships or your application!";

export default function ScholarStreamChat() {
  const axiosInstance = useAxios();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const updated = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      // Build conversation history as context (skip the welcome message)
      // const history = updated
      //   .slice(1)
      //   .map((m) =>
      //     m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`,
      //   )
      //   .join("\n");

      // const prompt = `Previous conversation:\n${history}\n\nNow respond to the latest user message.`;

      const { data } = await axiosInstance.post("/api/chat", { input });

      const reply = data?.data || "Sorry, couldn't get a response. Try again!";

      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bounce  { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn   { from{opacity:0;transform:scale(0.9) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.45)} 50%{box-shadow:0 0 0 10px rgba(99,102,241,0)} }
        .ss-msg  { animation: fadeUp 0.2s ease forwards; }
        .ss-win  { animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .ss-fab  { animation: pulse-ring 2s infinite; }
        .ss-fab-open { animation: none !important; }
        .ss-scroll::-webkit-scrollbar { width: 4px; }
        .ss-scroll::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
      `}</style>

      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`ss-fab ${open ? "ss-fab-open bg-gradient-to-r from-indigo-500 to-purple-600" : ""} fixed bottom-7 lg:bottom-10
         right-5 md:right-15 lg:right-48 z-50 w-14 h-14 rounded-full border-none bg-primary text-base-content text-2xl shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform`}
      >
        {open ? "✕" : "🎓"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="ss-win fixed bottom-24 right-7 z-40 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/35 flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Scholar AI</p>
              <p className="text-white/75 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Always here to help
              </p>
            </div>
            {/* Clear chat button */}
            <button
              onClick={() =>
                setMessages([{ role: "assistant", content: WELCOME }])
              }
              className="ml-auto text-white/60 hover:text-white text-xs transition-colors"
              title="Clear chat"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="ss-scroll flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-indigo-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ss-msg flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs mr-2 mt-1 shrink-0">
                    🎓
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[18px_18px_4px_18px] shadow-md shadow-indigo-200"
                      : "bg-white text-indigo-950 rounded-[18px_18px_18px_4px] shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="ss-msg flex items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs mr-2 shrink-0">
                  🎓
                </div>
                <div className="bg-white rounded-[18px_18px_18px_4px] px-4 py-3 shadow-sm flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"
                      style={{
                        animation: "bounce 1.2s infinite",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3.5 py-3 bg-white border-t border-indigo-100 flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about scholarships..."
              rows={1}
              className="flex-1 resize-none border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-indigo-950 bg-indigo-50/50 leading-relaxed max-h-24 overflow-y-auto focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={`w-10 h-10 rounded-xl border-none text-white text-lg flex items-center justify-center shrink-0 transition-all
                ${
                  input.trim() && !loading
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer hover:scale-105 active:scale-95 shadow-md shadow-indigo-200"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
