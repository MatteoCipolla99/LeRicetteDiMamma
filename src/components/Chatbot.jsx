import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { recipes } from "../data/recipes";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Ciao tesoro! 👵 Sono Mamma Concetta Virtuale. Hai fame? Dimmi un ingrediente (es. 'uova') e ti dico cosa cucinare!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const searchText = input.toLowerCase();
    setInput("");

    // Simulazione "pensiero" della mamma
    setTimeout(() => {
      const foundRecipes = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(searchText) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(searchText))
      );

      let botResponse;
      if (foundRecipes.length > 0) {
        botResponse = {
          type: "bot",
          text: `Ho trovato ${foundRecipes.length} ricette deliziose per te! Ecco le migliori:`,
          recipes: foundRecipes.slice(0, 3),
        };
      } else {
        const responses = [
          "Mmm, non ho niente con questo ingrediente nel mio quaderno. Sicuro di aver scritto bene? 🤔",
          "Oggi la dispensa piange! Prova con qualcos'altro, magari 'pasta' o 'pollo'?",
          "Tesoro, ma che ingredienti strani usi? La mamma cucina classico! Riprova con altro.",
        ];
        botResponse = {
          type: "bot",
          text: responses[Math.floor(Math.random() * responses.length)],
        };
      }
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-sans">
      {/* Chat Window */}
      <div
        className={`transition-all duration-300 ease-out origin-bottom-right transform ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-10 pointer-events-none"
        } mb-4 w-[90vw] md:w-96 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col h-[500px]`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-lg leading-none">
                MammaBot
              </h3>
              <span className="text-xs text-orange-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>{" "}
                Online
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.type === "user"
                    ? "bg-orange-500 text-white rounded-tr-none"
                    : "bg-white border border-gray-100 text-gray-700 rounded-tl-none"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>

                {/* Recipe Suggestions */}
                {msg.recipes && (
                  <div className="mt-3 space-y-2">
                    {msg.recipes.map((r) => (
                      <Link
                        key={r.id}
                        to={`/recipe/${r.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-orange-50 p-2 rounded-xl transition-colors group border border-gray-100 hover:border-orange-200"
                      >
                        <img
                          src={r.image}
                          className="w-10 h-10 rounded-lg object-cover"
                          alt=""
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-xs truncate group-hover:text-orange-700">
                            {r.title}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {r.time} min • {r.difficulty}
                          </p>
                        </div>
                        <div className="text-orange-400">
                          <ChefHat size={14} />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white/50 border-t border-gray-100 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chiedi alla mamma..."
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 disabled:scale-95 shadow-lg shadow-orange-500/30"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>

      {/* Toggle Button (Floating Action Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-[0_8px_30px_rgb(234,88,12,0.4)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.6)] hover:scale-110 transition-all duration-300 z-50 ${
          isOpen ? "rotate-90 scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        {/* Notification Dot */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-orange-500"></span>
        </span>

        {/* Tooltip */}
        <span className="absolute right-20 bg-white text-gray-800 text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chiedi un consiglio! 🍳
        </span>
      </button>

      {/* Close Button when open */}
      <button
        onClick={() => setIsOpen(false)}
        className={`absolute bottom-0 right-0 w-16 h-16 bg-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 rotate-0"
            : "scale-0 opacity-0 rotate-90"
        }`}
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
