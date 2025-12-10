import React from "react";
import { X, Printer } from "lucide-react";

const PrintableRecipe = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto">
      {/* UI Controls (Hidden on Print) */}
      <div className="print:hidden sticky top-0 bg-white/90 backdrop-blur border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
        <span className="text-gray-500 font-bold">Anteprima di Stampa</span>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 font-bold"
          >
            <Printer size={18} /> Stampa
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 font-bold"
          >
            <X size={18} /> Chiudi
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-3xl mx-auto p-12 print:p-0 font-serif text-gray-900">
        <header className="border-b-4 border-gray-900 pb-8 mb-8">
          <p className="text-sm font-sans uppercase tracking-widest text-gray-500 mb-2">
            Le Ricette di Mamma Concetta
          </p>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            {recipe.title}
          </h1>

          <div className="flex gap-8 text-sm font-sans font-bold border-t border-gray-200 pt-4 mt-4">
            <div>
              TEMPO: <span className="text-lg">{recipe.time} min</span>
            </div>
            <div>
              PORZIONI: <span className="text-lg">{recipe.servings} pp</span>
            </div>
            <div>
              DIFFICOLTÀ:{" "}
              <span className="text-lg uppercase">{recipe.difficulty}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Ingredients Column */}
          <div className="md:w-1/3">
            <h3 className="font-bold text-xl mb-6 uppercase tracking-wider border-b border-gray-300 pb-2">
              Ingredienti
            </h3>
            <ul className="space-y-3 font-sans text-sm">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps Column */}
          <div className="md:w-2/3">
            <h3 className="font-bold text-xl mb-6 uppercase tracking-wider border-b border-gray-300 pb-2">
              Procedimento
            </h3>
            <div className="space-y-6">
              {(recipe.instructions || recipe.steps).map((step, i) => (
                <div key={i}>
                  <strong className="block mb-1 text-sm font-sans text-gray-500 uppercase">
                    Passaggio {i + 1}
                  </strong>
                  <p className="text-lg leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            {recipe.tips && (
              <div className="mt-12 p-6 border border-gray-300 rounded bg-gray-50 print:bg-transparent">
                <strong className="block text-sm font-sans uppercase mb-2">
                  Il Consiglio dello Chef:
                </strong>
                <p className="italic">"{recipe.tips}"</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs font-sans text-gray-400">
          Stampato da <strong>LeRicetteDiMamma.it</strong> • Buon Appetito!
        </footer>
      </div>
    </div>
  );
};

export default PrintableRecipe;
