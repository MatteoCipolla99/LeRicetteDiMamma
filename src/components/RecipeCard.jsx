import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Heart, ChefHat, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useAuth();
  const isFav = isFavorite(recipe.id);

  // Colore badge difficoltà
  const difficultyColor = {
    Facile: "bg-green-100 text-green-700",
    Media: "bg-yellow-100 text-yellow-700",
    Difficile: "bg-red-100 text-red-700",
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Immagine */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficultyColor[recipe.difficulty] || "bg-gray-100 text-gray-700"
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(recipe.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFav
              ? "bg-red-500 text-white"
              : "bg-white/30 text-white hover:bg-white/50"
          }`}
        >
          <Heart size={20} className={isFav ? "fill-current" : ""} />
        </button>
      </div>

      {/* Contenuto */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-1">
          {recipe.category}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 font-serif line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        {/* Info Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.time} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings}</span>
          </div>
        </div>

        {/* Footer Card */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
            <ChefHat size={16} />
            <span>{recipe.rating || 0}</span>
          </div>
          <Link
            to={`/recipe/${recipe.id}`}
            className="flex items-center gap-1 text-sm font-bold text-orange-600 hover:gap-2 transition-all"
          >
            Vedi Ricetta <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
