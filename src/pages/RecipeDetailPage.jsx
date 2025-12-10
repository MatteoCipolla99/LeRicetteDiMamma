import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes";
import { useAuth } from "../context/AuthContext";
import { useShoppingList } from "../context/ShoppingListContext";
import { ArrowLeft } from "lucide-react";
import CookingTimer from "../components/CookingTimer";
import RecipeReviews from "../components/RecipeReviews";
import PrintableRecipe from "../components/PrintableRecipe";
import SEO from "../components/SEO";

// Importa i nuovi sotto-componenti
import { RecipeHero } from "../components/recipe/RecipeHero";
import { IngredientList } from "../components/recipe/IngredientList";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const { user, toggleFavorite, isFavorite } = useAuth();
  const { addIngredients } = useShoppingList();

  const [localReviews, setLocalReviews] = useState(recipe?.reviews || []);
  const [isPrinting, setIsPrinting] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!recipe)
    return (
      <div className="text-center py-20 font-bold text-xl">
        Ricetta non trovata!
      </div>
    );

  const handleAddToCart = () => {
    addIngredients(recipe.ingredients);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator
        .share({
          title: recipe.title,
          text: `Guarda questa ricetta di ${recipe.title}!`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiato!");
    }
  };

  if (isPrinting)
    return (
      <PrintableRecipe recipe={recipe} onClose={() => setIsPrinting(false)} />
    );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in max-w-6xl">
      <SEO
        title={recipe.title}
        description={`Ricetta per ${recipe.title}`}
        image={recipe.image}
      />

      <button
        onClick={() => navigate(-1)}
        className="group flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors font-bold"
      >
        <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-orange-100 transition-colors">
          <ArrowLeft size={20} />
        </div>
        Torna indietro
      </button>

      {/* 1. HERO SECTION */}
      <RecipeHero
        recipe={recipe}
        isFav={isFavorite(recipe.id)}
        onToggleFav={() => toggleFavorite(recipe.id)}
        onShare={handleShare}
        onPrint={() => setIsPrinting(true)}
      />

      <div className="grid lg:grid-cols-12 gap-12">
        {/* COLONNA PRINCIPALE (Ingredienti e Step) */}
        <div className="lg:col-span-8 space-y-12">
          {/* 2. INGREDIENTI */}
          <IngredientList
            ingredients={recipe.ingredients}
            onAddToCart={handleAddToCart}
            addedToCart={addedToCart}
          />

          {/* 3. PROCEDIMENTO (Tenuto qui per semplicità ma potrebbe essere un componente) */}
          <section>
            <h3 className="text-3xl font-bold font-serif text-gray-900 mb-8 flex items-center gap-3">
              <span className="bg-orange-500 w-8 h-1 rounded-full"></span>{" "}
              Procedimento
            </h3>
            <div className="space-y-0 border-l-2 border-orange-100 ml-4 md:ml-6 pl-8 md:pl-10 relative">
              {(recipe.instructions || recipe.steps).map((step, idx) => (
                <div key={idx} className="mb-10 relative">
                  <span className="absolute -left-[calc(2.5rem+1px)] md:-left-[calc(3rem+1px)] top-0 w-8 h-8 md:w-10 md:h-10 bg-white border-4 border-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 text-lg leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. RECENSIONI */}
          <RecipeReviews
            reviews={localReviews}
            onAddReview={(r) =>
              setLocalReviews([
                ...localReviews,
                { ...r, id: Date.now(), user: user?.name || "Tu" },
              ])
            }
            isLoggedIn={!!user}
          />
        </div>

        {/* SIDEBAR (Timer e Info) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl mb-8">
              <h4 className="font-bold text-lg mb-2">Serve un timer?</h4>
              <p className="text-gray-400 text-sm mb-6">
                Non bruciare nulla! Usa il timer integrato.
              </p>
              <CookingTimer />
            </div>

            {/* Qui potresti aggiungere altri widget in futuro (es. Ricette correlate) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
