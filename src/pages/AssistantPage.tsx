import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Mic, MicOff, ChevronDown } from "lucide-react";
import { AgentType, ChatMessage } from "../data/types";

const agents: { value: AgentType; label: string; greeting: string; suggestions: string[] }[] = [
  { value: "crm", label: "Agent CRM", greeting: "Bonjour, je suis l'agent CRM. Comment puis-je vous aider ?", suggestions: ["Afficher mes clients récents", "Créer un prospect", "Analyser mes performances"] },
  { value: "emailing", label: "Agent Emailing", greeting: "Bonjour, je suis l'agent Emailing. Comment puis-je vous aider ?", suggestions: ["Créer une campagne", "Voir les statistiques", "Importer des contacts"] },
  { value: "produits", label: "Agent Produits", greeting: "Bonjour, je suis l'agent Produits. Comment puis-je vous aider ?", suggestions: ["Lister les produits", "Ajouter un article", "Consulter le stock"] },
  { value: "facturation", label: "Agent Facturation", greeting: "Bonjour, je suis l'agent Facturation. Comment puis-je vous aider ?", suggestions: ["Créer une facture", "Voir les impayés", "Exporter en PDF"] },
];

const fakeResponses: Record<string, string> = {
  "Afficher mes clients récents": "Voici vos 3 derniers clients :\n\n1. **Nexora Technologies** — Paris\n2. **AquaFlow SAS** — Bordeaux\n3. **BioVital Santé** — Lyon\n\nVoulez-vous voir plus de détails ?",
  "Créer un prospect": "Pour créer un prospect, rendez-vous dans **Tiers → Créer un tiers** et sélectionnez le type \"Prospect\". Souhaitez-vous que je vous guide ?",
  "Analyser mes performances": "📊 **Résumé du mois :**\n- 13 tiers au total\n- 8 clients actifs\n- 4 prospects en cours\n- Taux de conversion : 67%\n\nExcellente progression !",
};

const AssistantPage = () => {
  const [agent, setAgent] = useState<AgentType>("crm");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [agentDropdown, setAgentDropdown] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  const currentAgent = agents.find(a => a.value === agent)!;

  useEffect(() => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: currentAgent.greeting,
      agent,
      timestamp: new Date(),
    }]);
  }, [agent]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: "user", content: text, agent, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply = fakeResponses[text] || `Je comprends votre demande concernant "${text}". Je traite cela pour vous. En attendant, n'hésitez pas à explorer les autres fonctionnalités d'Agenist.`;
      const assistantMsg: ChatMessage = { id: `a${Date.now()}`, role: "assistant", content: reply, agent, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    }, 800);
  };

  const toggleRecording = () => {
    setRecording(!recording);
    if (!recording) {
      setTimeout(() => {
        setRecording(false);
        sendMessage("Afficher mes clients récents");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px-56px)] md:h-[calc(100vh-64px-48px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-3">
          <Bot size={22} className="text-primary" />
          <h1 className="text-xl font-semibold">Assistant IA</h1>
        </div>

        {/* Agent selector */}
        <div className="relative">
          <button
            onClick={() => setAgentDropdown(!agentDropdown)}
            className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <span className="truncate max-w-[100px] sm:max-w-none">{currentAgent.label}</span>
            <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
          </button>
          {agentDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-card rounded-lg shadow-elevated border border-border py-1 z-10 animate-scale-in">
              {agents.map(a => (
                <button
                  key={a.value}
                  onClick={() => { setAgent(a.value); setAgentDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors ${a.value === agent ? "text-primary font-medium" : ""}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-card rounded-xl border border-border p-3 md:p-5 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[85%] md:max-w-[70%] px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-[13px] md:text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
            >
              {msg.content.split("\n").map((line, i) => (
                <span key={i}>
                  {line.replace(/\*\*(.*?)\*\*/g, "").length !== line.length
                    ? line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j}>{part.slice(2, -2)}</strong>
                          : part
                      )
                    : line}
                  {i < msg.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </motion.div>
          </div>
        ))}

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
            {currentAgent.suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-[11px] md:text-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-border hover:bg-secondary hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground text-left"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="mt-3 md:mt-4 flex items-center gap-1.5 md:gap-2">
        <button
          onClick={toggleRecording}
          className={`p-2 md:p-2.5 rounded-lg transition-colors flex-shrink-0 ${recording ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-card border border-border hover:bg-secondary text-muted-foreground"}`}
        >
          {recording ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage(input)}
          placeholder="Message..."
          className="flex-1 h-10 md:h-11 px-3 md:px-4 text-[13px] md:text-sm bg-card rounded-lg border border-border outline-none focus:ring-2 focus:ring-ring/20 transition-all placeholder:text-muted-foreground min-w-0"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="p-2 md:p-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AssistantPage;
