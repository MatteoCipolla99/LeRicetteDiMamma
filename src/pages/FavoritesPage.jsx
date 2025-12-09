import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { Heart, ChefHat, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const FavoritesPage = () => {
  // Nota: Questo componente si basa sul fatto che tu abbia creato useRecipes() nel RecipeContext
  const { user, favorites } = useAuth();
  const { allRecipes } = useRecipes();

  // Filtra le ricette complete basandosi sugli ID salvati nei preferiti
  const favoriteRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => favorites.includes(recipe.id));
  }, [allRecipes, favorites]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <SEO
          title="Area Riservata"
          description="Accedi per visualizzare e gestire il tuo ricettario personale."
        />
        <ChefHat className="w-20 h-20 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
          Area Riservata
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Accedi per visualizzare e gestire il tuo ricettario personale.
        </p>
        <div className="p-4 bg-primary-50 text-primary-700 rounded-lg shadow-md">
          💡 Usa il pulsante "Accedi" in alto a destra.
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
        <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 shadow-md">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
          Il Tuo Ricettario del Cuore
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Qui trovi tutte le ricette che hai salvato per le occasioni speciali.
        </p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-inner">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-4 font-serif">
            Nessun preferito
          </h3>
          <p className="text-gray-500 mb-8">
            Inizia ad esplorare e riempi questa pagina di bontà.
          </p>
          <Link
            to="/recipes"
            className="btn-primary flex items-center gap-2 w-fit mx-auto"
          >
            Esplora Ricette <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
