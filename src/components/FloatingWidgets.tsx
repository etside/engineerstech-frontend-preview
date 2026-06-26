import { useState } from "react";
import { MessageCircle, X, Send, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

const faqResponses: Record<string, string> = {
  services: "We offer Enterprise & SaaS Solutions (CRM, HRM, ERP), Web & Mobile Apps (Android & iOS), UI/UX & Design, and Consultation & Strategy.",
  pricing: "Our pricing is competitive and affordable. We keep a lean team of skilled engineers which allows us to offer enterprise-quality at lower costs. Contact us for a custom quote!",
  contact: "You can reach us at info@engineerstechbd.com or call +880-18737-22228. We're based in Dhaka, Bangladesh.",
  glowup: "GlowUp is our featured SaaS product — Bangladesh's Beauty & Wellness Platform. Visit glowupbd.app to learn more!",
  team: "Our team consists entirely of software engineers led by CEO Nazmul Alom Sakib, COO Al Shahriar, and CMO Sheikh Md. Junaeid.",
};

const FloatingWidgets = () => {
  const { getSetting } = useSettings();
  const whatsapp = getSetting("company_info", { whatsapp: "8801873722228" }).whatsapp || "8801873722228";
  const whatsappDigits = whatsapp.replace(/\D/g, "");
  const scheduleUrl = getSetting("schedule_call_url", "https://calendar.app.google/EPrxGuqYSGBhL4WN7");

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hi! 👋 I'm the engineersTech assistant. Ask me about our services, pricing, team, or GlowUp!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim().toLowerCase();
    setMessages((m) => [...m, { from: "user", text: input.trim() }]);
    setInput("");

    const match = Object.keys(faqResponses).find((k) => userMsg.includes(k));
    const reply = match
      ? faqResponses[match]
      : "Thanks for your question! For detailed info, please contact us at info@engineerstechbd.com or call +880-18737-22228.";

    setTimeout(() => setMessages((m) => [...m, { from: "bot", text: reply }]), 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Schedule a Call */}
      <a
        href={scheduleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full gradient-bg text-primary-foreground text-xs font-medium shadow-lg hover:opacity-90 transition-opacity animate-pulse-glow"
        aria-label="Schedule a Call"
      >
        <CalendarDays className="h-3.5 w-3.5" />
        Schedule a Call
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappDigits}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Chat window */}
      {chatOpen && (
        <div className="absolute bottom-20 right-0 mb-2 w-72 sm:w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          <div className="gradient-bg p-3 sm:p-4 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-primary-foreground">engineersTech Assistant</span>
            <button onClick={() => setChatOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="h-60 sm:h-72 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-xs sm:text-sm ${
                    m.from === "user"
                      ? "gradient-bg text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 sm:p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a question..."
              className="flex-1 bg-secondary rounded-lg px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button size="icon" className="gradient-bg border-0 shrink-0 h-8 w-8 sm:h-9 sm:w-9" onClick={handleSend}>
              <Send size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* AI Chat button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
        aria-label="Open chat"
      >
        {chatOpen ? <X size={24} className="text-primary-foreground" /> : <MessageCircle size={24} className="text-primary-foreground" />}
      </button>
    </div>
  );
};

export default FloatingWidgets;
