import React, { useState } from "react";
import { Clock, Users, Star, Heart, TrendingUp, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RecipeCard = ({ recipe }) => {
  const { isAuthenticated, isFavorite, addFavorite, removeFavorite } =
    useAuth();
  const [animating, setAnimating] = useState(false);
  const isFav = isFavorite(recipe.id);

  const difficultyColor =
    {
      Facile: "bg-green-100 text-green-700",
      Media: "bg-yellow-100 text-yellow-700",
      Difficile: "bg-red-100 text-red-700",
    }[recipe.difficulty] || "bg-gray-100 text-gray-700";

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return alert("Accedi per salvare le ricette!");
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    isFav ? removeFavorite(recipe.id) : addFavorite(recipe.id);
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col h-full group cursor-pointer transition-all">
        <div className="relative h-64 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm ${difficultyColor}`}
            >
              {recipe.difficulty}
            </span>
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg transition-transform ${
                animating ? "scale-125" : ""
              }`}
              aria-label={
                isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
              }
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {recipe.rating >= 4.8 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              <span>Top Rated</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">
            {recipe.category}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" /> <span>{recipe.time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" /> <span>{recipe.servings} porz.</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{" "}
              <span className="font-medium">{recipe.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <span className="text-sm text-gray-500 flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>{recipe.reviews} recensioni</span>
            </span>
            <div className="flex items-center space-x-2 text-orange-500 font-medium group-hover:translate-x-1 transition-transform">
              <span className="text-sm">Vedi ricetta</span>
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
