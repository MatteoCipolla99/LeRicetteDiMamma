import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { recipes } from "../data/recipes";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Ciao! 👋 Sono il tuo assistente virtuale per le ricette. Posso aiutarti a trovare la ricetta perfetta per ogni occasione!\n\nProva a chiedermi:\n• Ricette veloci per la cena\n• Un primo piatto facile\n• Dolci tradizionali\n• Ricette con ingredienti specifici",
      time: new Date().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRecipesByIngredient = (ingredient) => {
    return recipes.filter((r) =>
      r.ingredients.some((ing) =>
        ing.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  };

  const findRecipesByTag = (tag) => {
    return recipes.filter((r) =>
      r.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
    );
  };

  const formatRecipeList = (recipesList, title) => {
    if (recipesList.length === 0) {
      return "Mi dispiace, non ho trovato ricette con questi criteri. Prova a modificare la ricerca!";
    }

    let response = `${title}\n\n`;
    recipesList.slice(0, 5).forEach((r, idx) => {
      response += `${idx + 1}. ${r.title}\n`;
      response += `   ⏱️ ${r.time} min | 👥 ${r.servings} porzioni | ${r.difficulty}\n`;
      response += `   ⭐ ${r.rating}/5 (${r.reviews} recensioni)\n\n`;
    });

    if (recipesList.length > 5) {
      response += `\n...e altre ${
        recipesList.length - 5
      } ricette! Vai alla pagina Ricette per vedere tutto.`;
    }

    return response;
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("ciao") ||
      lowerMessage.includes("salve") ||
      lowerMessage.includes("buongiorno")
    ) {
      return "Ciao! 👋 Benvenuto! Come posso aiutarti oggi con le ricette?";
    }

    if (lowerMessage.includes("grazie")) {
      return "Prego! 😊 È un piacere aiutarti. Hai bisogno di altro?";
    }

    if (
      lowerMessage.includes("cosa puoi fare") ||
      lowerMessage.includes("aiuto") ||
      lowerMessage.includes("comandi")
    ) {
      return `Posso aiutarti in molti modi! Ecco cosa posso fare:\n\n🔍 Cercare ricette per:\n• Categoria (primi, secondi, dolci)\n• Difficoltà (facile, media, difficile)\n• Tempo di preparazione\n• Ingredienti specifici\n• Occasioni (veloce, domenicale)\n\n💡 Suggerimenti:\n• "Ricette veloci per cena"\n• "Dolce facile"\n• "Ricette con pomodoro"\n• "Primi piatti"\n\nProva a farmi una domanda!`;
    }

    const ingredientMatch = lowerMessage.match(
      /con\s+(\w+)|ingrediente[:\s]*(\w+)|usando\s+(\w+)/
    );
    if (ingredientMatch) {
      const ingredient =
        ingredientMatch[1] || ingredientMatch[2] || ingredientMatch[3];
      const found = findRecipesByIngredient(ingredient);
      return formatRecipeList(found, `🔍 Ricette con ${ingredient}:`);
    }

    if (
      lowerMessage.includes("primo") ||
      lowerMessage.includes("pasta") ||
      lowerMessage.includes("risotto")
    ) {
      const primi = recipes.filter((r) => r.category === "Primi Piatti");
      return formatRecipeList(primi, "🍝 Primi Piatti disponibili:");
    }

    if (
      lowerMessage.includes("secondo") ||
      lowerMessage.includes("carne") ||
      lowerMessage.includes("pesce")
    ) {
      const secondi = recipes.filter((r) => r.category === "Secondi Piatti");
      return formatRecipeList(secondi, "🍖 Secondi Piatti disponibili:");
    }

    if (
      lowerMessage.includes("dolce") ||
      lowerMessage.includes("dessert") ||
      lowerMessage.includes("torta")
    ) {
      const dolci = recipes.filter((r) => r.category === "Dolci");
      return formatRecipeList(dolci, "🍰 Dolci disponibili:");
    }

    if (
      lowerMessage.includes("facile") &&
      (lowerMessage.includes("veloce") ||
        lowerMessage.includes("rapida") ||
        lowerMessage.includes("semplice"))
    ) {
      const faciliVeloci = recipes.filter(
        (r) => r.difficulty === "Facile" && r.time <= 30
      );
      return formatRecipeList(
        faciliVeloci,
        "⚡ Ricette facili e veloci (max 30 min):"
      );
    }

    if (lowerMessage.includes("facile")) {
      const facili = recipes.filter((r) => r.difficulty === "Facile");
      return formatRecipeList(facili, "👍 Ricette facili:");
    }

    if (
      lowerMessage.includes("veloce") ||
      lowerMessage.includes("rapida") ||
      lowerMessage.includes("30 minuti")
    ) {
      const veloci = recipes.filter((r) => r.time <= 30);
      return formatRecipeList(veloci, "⚡ Ricette veloci (max 30 minuti):");
    }

    if (
      lowerMessage.includes("cena") ||
      lowerMessage.includes("sera") ||
      lowerMessage.includes("serale")
    ) {
      const perCena = recipes.filter(
        (r) =>
          r.time <= 45 &&
          (r.category === "Primi Piatti" || r.category === "Secondi Piatti")
      );
      return formatRecipeList(perCena, "🌙 Ricette perfette per cena:");
    }

    if (
      lowerMessage.includes("pranzo") ||
      lowerMessage.includes("domenica") ||
      lowerMessage.includes("domenicale")
    ) {
      const perPranzo = recipes.filter(
        (r) => r.tags.includes("domenicale") || r.difficulty === "Difficile"
      );
      return formatRecipeList(perPranzo, "🍽️ Ricette per pranzi speciali:");
    }

    if (
      lowerMessage.includes("miglior") ||
      lowerMessage.includes("top") ||
      lowerMessage.includes("popolari")
    ) {
      const topRated = [...recipes].sort((a, b) => b.rating - a.rating);
      return formatRecipeList(topRated, "⭐ Le ricette più apprezzate:");
    }

    if (
      lowerMessage.includes("vegetariana") ||
      lowerMessage.includes("vegetariano")
    ) {
      const vegetariane = recipes.filter((r) => r.tags.includes("vegetariano"));
      return formatRecipeList(vegetariane, "🥗 Ricette vegetariane:");
    }

    const specificRecipe = recipes.find(
      (r) =>
        r.title.toLowerCase().includes(lowerMessage) ||
        lowerMessage.includes(r.title.toLowerCase().split(" ")[0])
    );

    if (specificRecipe) {
      return (
        `📖 ${specificRecipe.title}\n\n` +
        `⏱️ Tempo: ${specificRecipe.time} minuti\n` +
        `👥 Porzioni: ${specificRecipe.servings}\n` +
        `📊 Difficoltà: ${specificRecipe.difficulty}\n` +
        `⭐ Rating: ${specificRecipe.rating}/5 (${specificRecipe.reviews} recensioni)\n\n` +
        `💡 Consiglio: ${specificRecipe.tips}\n\n` +
        `Vai alla pagina della ricetta per vedere ingredienti e preparazione completa!`
      );
    }

    if (
      lowerMessage.includes("suggerimento") ||
      lowerMessage.includes("consiglio") ||
      lowerMessage.includes("proponi")
    ) {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      return (
        `💫 Ti suggerisco: ${random.title}!\n\n` +
        `Questa ricetta è ${random.difficulty.toLowerCase()} e richiede solo ${
          random.time
        } minuti.\n` +
        `Ha un rating di ${random.rating}⭐ con ${random.reviews} recensioni.\n\n` +
        `💡 ${random.tips}`
      );
    }

    if (lowerMessage.includes("quante") || lowerMessage.includes("numero")) {
      return (
        `📚 Attualmente abbiamo ${recipes.length} ricette disponibili!\n\n` +
        `📊 Distribuzione:\n` +
        `• Primi Piatti: ${
          recipes.filter((r) => r.category === "Primi Piatti").length
        }\n` +
        `• Secondi Piatti: ${
          recipes.filter((r) => r.category === "Secondi Piatti").length
        }\n` +
        `• Dolci: ${recipes.filter((r) => r.category === "Dolci").length}\n\n` +
        `Aggiungiamo nuove ricette ogni settimana!`
      );
    }

    return (
      `🤔 Non sono sicuro di aver capito la tua richiesta.\n\n` +
      `Prova a chiedere:\n` +
      `• "Ricette veloci per cena"\n` +
      `• "Primi piatti facili"\n` +
      `• "Dolci tradizionali"\n` +
      `• "Ricette con pomodoro"\n` +
      `• "Dammi un suggerimento"\n\n` +
      `Oppure scrivi "aiuto" per vedere tutti i comandi!`
    );
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        type: "bot",
        text: getBotResponse(inputValue),
        time: new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Ricette veloci",
    "Primi piatti",
    "Dolci facili",
    "Suggerimento",
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 hover:scale-110 z-40 group"
          aria-label="Apri chat assistente"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-40">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full relative">
                <Bot className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold flex items-center space-x-1">
                  <span>Assistente Ricette</span>
                  <Sparkles className="w-4 h-4" />
                </h3>
                <p className="text-xs text-orange-100">
                  Online • Risponde subito
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              aria-label="Chiudi chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user"
                        ? "text-orange-100"
                        : "text-gray-400"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3 border border-gray-100">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Domande rapide:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrivi un messaggio..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Invia messaggio"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
