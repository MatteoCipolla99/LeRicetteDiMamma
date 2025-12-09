import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { recipes } from "../data/recipes";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Ciao! Sono l'assistente di Mamma Concetta. 👩‍🍳 Dimmi un ingrediente (es. 'uova', 'melanzane') e ti consiglierò una ricetta!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Aggiungi messaggio utente
    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const searchText = input.toLowerCase();
    setInput("");

    // 2. Logica "Intelligente" di ricerca
    setTimeout(() => {
      // Cerca ricette che contengono l'ingrediente nel titolo o negli ingredienti
      const foundRecipes = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(searchText) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(searchText))
      );

      let botResponse;

      if (foundRecipes.length > 0) {
        botResponse = {
          type: "bot",
          text: `Ho trovato ${foundRecipes.length} ricette per te!`,
          recipes: foundRecipes.slice(0, 3), // Mostra max 3 risultati
        };
      } else {
        const responses = [
          "Mmm, non mi viene in mente nulla con questo ingrediente. Prova con 'pasta' o 'pollo'!",
          "La mamma non ha ancora cucinato questo! Hai altri ingredienti nel frigo?",
          "Niente da fare. Sei sicuro di aver scritto bene?",
        ];
        botResponse = {
          type: "bot",
          text: responses[Math.floor(Math.random() * responses.length)],
        };
      }
      setMessages((prev) => [...prev, botResponse]);
    }, 600); // Ritardo simulato per sembrare umano
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-96 animate-fade-in-up">
          {/* Header */}
          <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold">MammaBot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.type === "user"
                      ? "bg-orange-500 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.recipes && (
                    <div className="mt-3 space-y-2">
                      {msg.recipes.map((r) => (
                        <Link
                          key={r.id}
                          to={`/recipe/${r.id}`}
                          className="block bg-orange-50 hover:bg-orange-100 p-2 rounded border border-orange-100 transition-colors flex items-center gap-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <img
                            src={r.image}
                            className="w-8 h-8 rounded object-cover"
                            alt=""
                          />
                          <span className="font-bold text-orange-700 truncate">
                            {r.title}
                          </span>
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
            className="p-3 bg-white border-t border-gray-100 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cerca un ingrediente..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "scale-0" : "scale-100"
        } transition-transform duration-200 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Chatbot;
