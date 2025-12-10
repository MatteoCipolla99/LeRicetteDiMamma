import { useState, useMemo } from "react";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import RecipeFilters from "../components/RecipeFilters"; // Si assume che questo componente esista e sia ben stilizzato
import { Search } from "lucide-react";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tutte");

  // Logica di filtraggio ottimizzata con useMemo
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tutte" || recipe.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "Tutte" ||
        recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-4 text-gray-900 font-serif">
        Scopri le Ricette
      </h1>
      <p className="text-center text-lg text-gray-500 mb-12">
        Migliaia di piatti dalla tradizione ai moderni, tutti testati dalla
        Mamma.
      </p>

      {/* Barra di Ricerca e Filtri - Layout Unificato */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Cerca una ricetta (es. Tiramisù, Pasta al forno)..."
            className="w-full pl-12 pr-6 py-3 text-lg border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 h-6 w-6" />
        </div>

        {/* Passiamo le funzioni di stato al componente filtri (si assume che sia ben stilizzato con bottoni o select) */}
        <RecipeFilters
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
          activeDifficulty={selectedDifficulty}
          setActiveDifficulty={setSelectedDifficulty}
        />
      </div>

      {/* Conteggio Risultati */}
      <div className="text-center text-gray-600 mb-8 font-medium">
        Trovate **{filteredRecipes.length}** ricette
      </div>

      {/* Griglia Risultati */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {/* Si assume che RecipeCard abbia un buon stile */}
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-xl border-dashed border-2 border-gray-300">
          <p className="text-2xl font-bold text-gray-800 mb-4 font-serif">
            Ops! Nessuna ricetta trovata
          </p>
          <p className="text-lg text-gray-500 mb-6">
            Prova a modificare i termini di ricerca o a resettare i filtri.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Tutte");
              setSelectedDifficulty("Tutte");
            }}
            className="inline-flex items-center px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg"
          >
            Resetta tutti i filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
