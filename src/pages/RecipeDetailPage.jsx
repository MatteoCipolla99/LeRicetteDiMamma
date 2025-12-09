import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes";
import { useAuth } from "../context/AuthContext";
import { useShoppingList } from "../context/ShoppingListContext"; // NUOVO
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  ArrowLeft,
  Printer,
  Share2,
  ShoppingCart,
  Check,
} from "lucide-react";
import CookingTimer from "../components/CookingTimer";
import RecipeReviews from "../components/RecipeReviews";
import PrintableRecipe from "../components/PrintableRecipe";
import SEO from "../components/SEO"; // NUOVO

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Nota: Idealmente dovremmo usare useRecipes() qui per trovare anche le custom,
  // ma per semplicità uso l'array importato o lo stato globale se hai aggiornato il context
  const recipe = recipes.find((r) => r.id === parseInt(id));

  const { user, toggleFavorite, isFavorite } = useAuth();
  const { addIngredients } = useShoppingList(); // NUOVO

  const [localReviews, setLocalReviews] = useState(recipe?.reviews || []);
  const [isPrinting, setIsPrinting] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false); // Feedback visivo

  if (!recipe)
    return <div className="text-center py-20">Ricetta non trovata!</div>;

  const isFav = isFavorite(recipe.id);

  const handleAddReview = (newReview) => {
    setLocalReviews([
      ...localReviews,
      { ...newReview, id: Date.now(), user: user?.name || "Utente" },
    ]);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Guarda questa ricetta di ${recipe.title} su Le Ricette di Mamma!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      alert("Link copiato negli appunti!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCart = () => {
    addIngredients(recipe.ingredients);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isPrinting) {
    return (
      <PrintableRecipe recipe={recipe} onClose={() => setIsPrinting(false)} />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* SEO Dinamico */}
      <SEO
        title={recipe.title}
        description={`Scopri come preparare ${recipe.title}. Tempo: ${recipe.time} min. Difficoltà: ${recipe.difficulty}.`}
        image={recipe.image}
        type="article"
      />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Torna alle ricette
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Hero Image */}
        <div className="relative h-[400px] group">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white w-full">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <span className="bg-orange-500/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-orange-400">
                    {recipe.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mt-3 font-serif leading-tight shadow-black drop-shadow-lg">
                    {recipe.title}
                  </h1>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all text-white"
                    title="Condividi"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsPrinting(true)}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all text-white"
                    title="Stampa"
                  >
                    <Printer className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`p-3 rounded-full transition-all hover:scale-110 ${
                      isFav
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-white/20 backdrop-blur-md hover:bg-white/40 text-white"
                    }`}
                    title="Preferiti"
                  >
                    <Heart
                      className={`h-6 w-6 ${isFav ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 p-8 md:p-12">
          <div className="md:col-span-2 space-y-10">
            {/* Meta Info */}
            <div className="flex justify-between bg-orange-50 p-6 rounded-2xl text-orange-900 border border-orange-100">
              <div className="flex flex-col items-center gap-1">
                <Clock className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-lg">{recipe.time}'</span>
                <span className="text-xs uppercase tracking-wider opacity-70">
                  Tempo
                </span>
              </div>
              <div className="w-px bg-orange-200"></div>
              <div className="flex flex-col items-center gap-1">
                <Users className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-lg">{recipe.servings}</span>
                <span className="text-xs uppercase tracking-wider opacity-70">
                  Porzioni
                </span>
              </div>
              <div className="w-px bg-orange-200"></div>
              <div className="flex flex-col items-center gap-1">
                <ChefHat className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-lg">{recipe.difficulty}</span>
                <span className="text-xs uppercase tracking-wider opacity-70">
                  Difficoltà
                </span>
              </div>
            </div>

            {/* Ingredienti + Shopping List Btn */}
            <section>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 font-serif">
                  Ingredienti
                </h2>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    addedToCart
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                  }`}
                >
                  {addedToCart ? (
                    <Check size={18} />
                  ) : (
                    <ShoppingCart size={18} />
                  )}
                  {addedToCart ? "Aggiunti alla lista!" : "Aggiungi alla Spesa"}
                </button>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {recipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-orange-50/50 transition-colors border border-transparent hover:border-orange-100"
                  >
                    <div className="h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{ing}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Istruzioni */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif border-b pb-4">
                Procedimento
              </h2>
              <div className="space-y-8">
                {(recipe.instructions || recipe.steps).map((step, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg mt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-12 p-1 bg-gray-100 rounded-2xl">
              <CookingTimer />
            </div>
            <RecipeReviews
              reviews={localReviews}
              onAddReview={handleAddReview}
              isLoggedIn={!!user}
            />
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-28">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 -mt-10 border-4 border-white shadow-md">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 font-serif">
                Il Consiglio di Mamma
              </h3>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "
                {recipe.tips ||
                  "Ricordati di assaggiare sempre mentre cucini! Il segreto di ogni piatto è l'amore... e un pizzico di sale al momento giusto."}
                "
              </p>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
                  Valori Nutrizionali
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-500">Calorie</span>
                    <span className="font-bold text-gray-800">450 kcal</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-500">Carboidrati</span>
                    <span className="font-bold text-gray-800">55g</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-500">Proteine</span>
                    <span className="font-bold text-gray-800">18g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
