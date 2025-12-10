import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes";
import { useAuth } from "../context/AuthContext";
import { useShoppingList } from "../context/ShoppingListContext";
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
import SEO from "../components/SEO";

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
      <SEO
        title={recipe.title}
        description={`Scopri come preparare ${recipe.title}. Tempo: ${recipe.time} min. Difficoltà: ${recipe.difficulty}.`}
        image={recipe.image}
        type="article"
      />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Torna al ricettario
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Hero Image e Dettagli Principali */}
        <div className="relative h-[450px] group">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white w-full">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <span className="bg-orange-500/90 backdrop-blur text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-orange-400 shadow-md">
                    {recipe.category}
                  </span>
                  <h1 className="text-5xl md:text-6xl font-extrabold mt-3 font-serif leading-tight shadow-black drop-shadow-lg">
                    {recipe.title}
                  </h1>
                </div>

                {/* Azioni */}
                <div className="flex gap-4">
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all text-white shadow-lg"
                    title="Condividi"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsPrinting(true)}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all text-white shadow-lg"
                    title="Stampa"
                  >
                    <Printer className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`p-3 rounded-full transition-all hover:scale-110 shadow-lg ${
                      isFav
                        ? "bg-red-500 text-white shadow-red-500/50"
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
          <div className="md:col-span-2 space-y-12">
            {/* Meta Info Migliorata */}
            <div className="flex justify-around bg-orange-50 p-8 rounded-2xl text-orange-900 border border-orange-100 shadow-inner">
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-7 w-7 text-orange-600" />
                <span className="font-extrabold text-2xl">{recipe.time}'</span>
                <span className="text-xs uppercase tracking-wider font-bold opacity-80">
                  Tempo di Cottura
                </span>
              </div>
              <div className="w-px bg-orange-200"></div>
              <div className="flex flex-col items-center gap-2">
                <Users className="h-7 w-7 text-orange-600" />
                <span className="font-extrabold text-2xl">
                  {recipe.servings}
                </span>
                <span className="text-xs uppercase tracking-wider font-bold opacity-80">
                  Porzioni
                </span>
              </div>
              <div className="w-px bg-orange-200"></div>
              <div className="flex flex-col items-center gap-2">
                <ChefHat className="h-7 w-7 text-orange-600" />
                <span className="font-extrabold text-2xl">
                  {recipe.difficulty}
                </span>
                <span className="text-xs uppercase tracking-wider font-bold opacity-80">
                  Difficoltà
                </span>
              </div>
            </div>

            {/* Ingredienti + Shopping List Btn con feedback */}
            <section>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-800 font-serif">
                  Ingredienti
                </h2>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-md transition-all transform hover:-translate-y-0.5 shadow-md ${
                    addedToCart
                      ? "bg-green-500 text-white shadow-green-500/30"
                      : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/30"
                  }`}
                >
                  {addedToCart ? (
                    <Check size={20} />
                  ) : (
                    <ShoppingCart size={20} />
                  )}
                  {addedToCart ? "Aggiunti alla lista!" : "Aggiungi alla Spesa"}
                </button>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {recipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors border-l-4 border-orange-400"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-orange-500" />
                    </div>
                    <span className="text-gray-700 font-medium text-lg">
                      {ing}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Istruzioni con stile 'stepper' */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 font-serif border-b pb-4">
                Procedimento (Passo dopo Passo)
              </h2>
              <div className="space-y-10">
                {(recipe.instructions || recipe.steps).map((step, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-extrabold text-xl shadow-lg border-2 border-orange-600 group-hover:bg-white group-hover:text-orange-600 transition-colors duration-500">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-12 p-6 bg-gray-100 rounded-2xl shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Tempo di Cottura? Usa il nostro Timer!
              </h3>
              <CookingTimer />
            </div>

            <RecipeReviews
              reviews={localReviews}
              onAddReview={handleAddReview}
              isLoggedIn={!!user}
            />
          </div>

          {/* Sidebar Consigli e Nutrizionali */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl sticky top-28 space-y-8">
              {/* Il Consiglio di Mamma */}
              <div>
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-extrabold text-2xl mb-3 text-gray-900 font-serif">
                  Il Consiglio di Mamma
                </h3>
                <p className="text-gray-600 italic leading-relaxed border-l-4 border-orange-400 pl-4 py-2 bg-orange-50 rounded-r-lg">
                  "
                  {recipe.tips ||
                    "Ricordati di assaggiare sempre mentre cucini! Il segreto di ogni piatto è l'amore... e un pizzico di sale al momento giusto."}
                  "
                </p>
              </div>

              {/* Valori Nutrizionali */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-extrabold text-gray-800 mb-4 text-sm uppercase tracking-wider">
                  Valori Nutrizionali (stima)
                </h4>
                <div className="space-y-3 text-md">
                  <div className="flex justify-between p-3 bg-gray-50 rounded font-medium">
                    <span className="text-gray-600">Calorie</span>
                    <span className="font-bold text-gray-900">450 kcal</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Carboidrati</span>
                    <span className="font-bold text-gray-900">55g</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Proteine</span>
                    <span className="font-bold text-gray-900">18g</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Grassi</span>
                    <span className="font-bold text-gray-900">20g</span>
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
