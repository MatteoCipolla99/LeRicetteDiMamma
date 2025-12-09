import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

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
  ];
  const difficulties = ["Tutte", "Facile", "Media", "Difficile"];

  const hasActiveFilters =
    activeCategory !== "Tutte" || activeDifficulty !== "Tutte";

  const resetFilters = () => {
    setActiveCategory("Tutte");
    setActiveDifficulty("Tutte");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
      {/* Intestazione Filtri */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-800">Filtra Ricette</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={14} /> Resetta
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Filtro Categoria */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === category
                    ? "bg-orange-500 text-white border-orange-500 shadow-md transform scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro Difficoltà */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
            Difficoltà
          </label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setActiveDifficulty(difficulty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeDifficulty === difficulty
                    ? "bg-orange-500 text-white border-orange-500 shadow-md transform scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
