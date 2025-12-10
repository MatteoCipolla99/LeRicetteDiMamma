import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard"; // Si assume sia ben stilizzato
import { Heart, ChefHat, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO"; // Si assume sia ben implementato

const FavoritesPage = () => {
  const { user, favorites } = useAuth();
  const { allRecipes } = useRecipes();

  // Filtra le ricette complete basandosi sugli ID salvati nei preferiti
  const favoriteRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => favorites.includes(recipe.id));
  }, [allRecipes, favorites]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-gray-50">
        <SEO
          title="Area Riservata"
          description="Accedi per visualizzare e gestire il tuo ricettario personale."
        />
        <ChefHat className="w-20 h-20 text-orange-400 mb-6" />
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">
          Area Riservata
        </h2>
        <p className="text-lg text-gray-500 mb-8 max-w-md">
          Devi accedere per visualizzare e gestire il tuo ricettario personale.
        </p>
        <div className="p-4 bg-orange-100 text-orange-700 rounded-xl font-medium shadow-md">
          💡 Clicca sul pulsante **Accedi** in alto a destra per continuare.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen animate-fade-in">
      <SEO
        title="I tuoi Preferiti"
        description="Tutte le ricette che hai salvato per cucinare in seguito."
      />

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 shadow-lg border-2 border-red-200">
          <Heart className="w-10 h-10 text-red-500 fill-current" />
        </div>
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-4">
          Il Tuo Ricettario del Cuore
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          Qui trovi tutte le ricette che hai salvato per le occasioni speciali o
          per quando hai voglia di un comfort food.
        </p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-red-300 shadow-xl">
          <Heart className="w-20 h-20 text-red-400 mx-auto mb-6 opacity-70" />
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">
            Nessuna Ricetta Preferita
          </h3>
          <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
            Aggiungi le ricette che ti ispirano di più cliccando sull'icona del
            cuore sulla pagina del piatto.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-600/40 gap-2"
          >
            Esplora Ricette <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
