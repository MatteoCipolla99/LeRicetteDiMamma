import React from "react";
import { useRecipeFilters } from "../hooks/useRecipeFilters";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import RecipeFilters from "../components/RecipeFilters";
import { Search, Frown } from "lucide-react";

const Recipes = () => {
  // Logica delegata all'hook custom per mantenere il componente pulito
  const { filteredRecipes, filters, setFilter, resetFilters } =
    useRecipeFilters(recipes);

  return (
    // Padding top aumentato (pt-32) per compensare la navbar fixed
    <div className="container mx-auto px-4 pt-32 pb-12 min-h-screen animate-fade-in">
      {/* Header di Pagina Stiloso */}
      <div className="text-center mb-16 relative">
        <h1 className="relative z-10 inline-block text-5xl font-extrabold text-dark-900 font-serif mb-4 leading-tight">
          Tutte le Ricette
          {/* Sottolineatura decorativa SVG */}
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-primary-300 -z-10"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10 Q 50 0 100 10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </h1>
        <p className="text-xl text-dark-500 max-w-2xl mx-auto mt-4 font-medium">
          Dai grandi classici alle nuove scoperte. <br />
          Cosa cuciniamo oggi?
        </p>
      </div>

      {/* Barra di Ricerca Premium */}
      <div className="mb-12 max-w-3xl mx-auto relative">
        {/* Glow effect dietro la barra */}
        <div className="absolute inset-0 bg-primary-200 rounded-3xl blur-xl opacity-30 -z-10 transform rotate-1"></div>

        <div className="relative group z-10">
          <input
            type="text"
            placeholder="Cerca una ricetta (es. Carbonara)..."
            // Classe .input-field definita nel CSS globale
            className="input-field !pl-16 !py-5 !text-lg !rounded-3xl shadow-soft-lg group-hover:-translate-y-1 transition-all"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
          />
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400 group-focus-within:text-primary-600 transition-colors h-7 w-7"
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* Sezione Filtri */}
      <div className="mb-12 max-w-4xl mx-auto">
        <RecipeFilters
          activeCategory={filters.category}
          setActiveCategory={(val) => setFilter("category", val)}
          activeDifficulty={filters.difficulty}
          setActiveDifficulty={(val) => setFilter("difficulty", val)}
        />
      </div>

      {/* Conteggio Risultati */}
      <div className="mb-8 text-sm font-bold text-dark-400 uppercase tracking-wider text-center md:text-left">
        Risultati:{" "}
        <span className="text-primary-600">{filteredRecipes.length}</span>
      </div>

      {/* Griglia Risultati */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        // Stato vuoto (Empty State)
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-cream-200">
          <Frown className="w-16 h-16 text-cream-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-dark-700 mb-2 font-serif">
            Nessuna ricetta trovata
          </h3>
          <p className="text-dark-500 mb-6">
            Prova a cambiare i filtri o cerca qualcos'altro.
          </p>
          <button
            onClick={resetFilters}
            className="text-primary-600 font-bold hover:underline hover:text-primary-700 transition-colors"
          >
            Resetta tutti i filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
