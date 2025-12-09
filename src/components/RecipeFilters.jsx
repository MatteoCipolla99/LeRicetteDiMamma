import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const RecipeFilters = ({ filters, setFilters, onSearch }) => {
  const categories = [
    "Tutti",
    "Primi Piatti",
    "Secondi Piatti",
    "Dolci",
    "Antipasti",
    "Contorni",
  ];
  const difficulties = ["Tutte", "Facile", "Media", "Difficile"];
  const sortOptions = [
    { value: "rating", label: "Più votate" },
    { value: "time-asc", label: "Tempo: crescente" },
    { value: "time-desc", label: "Tempo: decrescente" },
    { value: "name", label: "Nome A-Z" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cerca ricette per nome o ingrediente..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Filters Header */}
      <div className="flex items-center space-x-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold text-gray-800">Filtri</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setFilters({
                    ...filters,
                    category: category === "Tutti" ? "" : category,
                  })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  (filters.category === "" && category === "Tutti") ||
                  filters.category === category
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Difficoltà
          </label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() =>
                  setFilters({
                    ...filters,
                    difficulty: difficulty === "Tutte" ? "" : difficulty,
                  })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  (filters.difficulty === "" && difficulty === "Tutte") ||
                  filters.difficulty === difficulty
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ordina per
          </label>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {(filters.search || filters.category || filters.difficulty !== "") && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() =>
              setFilters({
                search: "",
                category: "",
                difficulty: "",
                sort: "rating",
              })
            }
            className="px-4 py-2 text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            Resetta filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;
