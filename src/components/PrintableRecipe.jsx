import React from "react";
import { X, Printer } from "lucide-react";

const PrintableRecipe = ({ recipe, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto">
      {/* Header Non Stampabile */}
      <div className="print:hidden sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
        <h2 className="text-lg font-bold text-gray-500">Modalità Stampa</h2>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Printer size={18} /> Stampa ora
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            <X size={18} /> Chiudi
          </button>
        </div>
      </div>

      {/* Contenuto Stampabile */}
      <div className="max-w-3xl mx-auto p-8 print:p-0">
        <header className="border-b-2 border-black pb-6 mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-600 italic">Le Ricette di Mamma Concetta</p>
        </header>

        <div className="grid grid-cols-3 gap-8 mb-8 text-sm">
          <div className="text-center p-4 border border-gray-300 rounded">
            <span className="block font-bold uppercase tracking-wider text-xs">
              Tempo
            </span>
            <span className="text-xl">{recipe.time} min</span>
          </div>
          <div className="text-center p-4 border border-gray-300 rounded">
            <span className="block font-bold uppercase tracking-wider text-xs">
              Porzioni
            </span>
            <span className="text-xl">{recipe.servings} pp</span>
          </div>
          <div className="text-center p-4 border border-gray-300 rounded">
            <span className="block font-bold uppercase tracking-wider text-xs">
              Difficoltà
            </span>
            <span className="text-xl">{recipe.difficulty}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h3 className="font-bold text-xl mb-4 border-b border-gray-300 pb-2">
              Ingredienti
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2">•</span> {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-2/3">
            <h3 className="font-bold text-xl mb-4 border-b border-gray-300 pb-2">
              Procedimento
            </h3>
            <div className="space-y-4">
              {recipe.instructions
                ? recipe.instructions.map((step, i) => (
                    <div key={i} className="mb-4">
                      <strong className="block mb-1 text-sm text-gray-500">
                        Passaggio {i + 1}
                      </strong>
                      <p className="leading-relaxed text-gray-900">{step}</p>
                    </div>
                  ))
                : // Fallback se usi steps invece di instructions nel DB
                  recipe.steps.map((step, i) => (
                    <div key={i} className="mb-4">
                      <strong className="block mb-1 text-sm text-gray-500">
                        Passaggio {i + 1}
                      </strong>
                      <p className="leading-relaxed text-gray-900">{step}</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          Stampato da Le Ricette di Mamma Concetta - Buon Appetito!
        </footer>
      </div>
    </div>
  );
};

export default PrintableRecipe;
