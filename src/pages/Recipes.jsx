import { useState, useMemo } from "react";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import RecipeFilters from "../components/RecipeFilters";
import { Search } from "lucide-react"; // Assicurati di avere lucide-react installato

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
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-600 font-serif">
        Le Nostre Ricette
      </h1>

      {/* Barra di Ricerca e Filtri */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cerca una ricetta (es. Carbonara)..."
            className="w-full pl-10 pr-4 py-2 border-2 border-orange-200 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-orange-400 h-5 w-5" />
        </div>

        {/* Passiamo le funzioni di stato al componente filtri */}
        <RecipeFilters
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
          activeDifficulty={selectedDifficulty}
          setActiveDifficulty={setSelectedDifficulty}
        />
      </div>

      {/* Griglia Risultati */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            Nessuna ricetta trovata con questi criteri.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Tutte");
              setSelectedDifficulty("Tutte");
            }}
            className="mt-4 text-orange-600 hover:underline"
          >
            Resetta filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
