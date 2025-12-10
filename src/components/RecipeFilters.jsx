import React from "react";
import { SlidersHorizontal, X } from "lucide-react";

const RecipeFilters = ({
  activeCategory,
  setActiveCategory,
  activeDifficulty,
  setActiveDifficulty,
}) => {
  const categories = [
    "Tutte",
    "Primi Piatti",
    "Secondi Piatti",
    "Dolci",
    "Antipasti",
    "Contorni",
    "Pizze e Lievitati",
  ];
  const difficulties = ["Tutte", "Facile", "Media", "Difficile"];

  const hasActiveFilters =
    activeCategory !== "Tutte" || activeDifficulty !== "Tutte";

  const resetFilters = () => {
    setActiveCategory("Tutte");
    setActiveDifficulty("Tutte");
  };

  return (
    <div className="mb-12 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-serif text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="text-orange-500" size={20} />
          Filtra per Gusto
        </h3>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <X size={14} /> Resetta filtri
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Categories Scrollable Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Difficulty Row */}
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest self-center mr-2">
            Difficoltà:
          </span>
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setActiveDifficulty(difficulty)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                activeDifficulty === difficulty
                  ? "bg-gray-800 text-white shadow-md"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
