import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Heart, ChefHat, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useAuth();
  const isFav = isFavorite(recipe.id);

  const difficultyColor = {
    Facile: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Media: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Difficile: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full relative">
      {/* Immagine con Overlay Gradiente */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            recipe.image ||
            "https://via.placeholder.com/400x300?text=Nessuna+Immagine"
          } // Fallback image
          alt={recipe.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badge Difficoltà */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-sm ${
              difficultyColor[recipe.difficulty] || "bg-gray-100 text-gray-700"
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Bottone Cuore */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(recipe.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
            isFav
              ? "bg-red-500 text-white shadow-red-500/30"
              : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart size={20} className={isFav ? "fill-current" : ""} />
        </button>
      </div>

      {/* Contenuto */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Categoria fluttuante */}
        <div className="-mt-10 mb-3 relative z-10">
          <span className="bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-md uppercase tracking-wide">
            {recipe.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-3 font-serif line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        {/* Info Meta */}
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 border-b border-gray-50 pb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={18} className="text-orange-400" />
            <span className="font-medium">{recipe.time}'</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={18} className="text-orange-400" />
            <span className="font-medium">{recipe.servings} pp.</span>
          </div>
          <div className="ml-auto flex items-center gap-1 text-yellow-500 font-bold">
            <ChefHat size={18} />
            <span>{recipe.rating || "N/A"}</span>
          </div>
        </div>

        {/* Footer Card */}
        <div className="mt-auto pt-2">
          <Link
            to={`/recipe/${recipe.id}`}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-50 text-orange-700 font-bold group-hover:bg-orange-600 group-hover:text-white transition-all duration-300"
          >
            Scopri Ricetta <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
