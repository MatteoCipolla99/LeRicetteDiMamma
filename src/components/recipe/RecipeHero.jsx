import React from "react";
import { Share2, Printer, Heart } from "lucide-react";

export const RecipeHero = ({
  recipe,
  isFav,
  onToggleFav,
  onShare,
  onPrint,
}) => {
  return (
    <div className="relative h-[50vh] min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl group mb-12">
      <img
        src={recipe.image || "https://via.placeholder.com/800x600"}
        alt={recipe.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              {recipe.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold mb-4 leading-tight">
              {recipe.title}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onShare}
              className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-white border border-white/10"
            >
              <Share2 size={24} />
            </button>
            <button
              onClick={onPrint}
              className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-white border border-white/10"
            >
              <Printer size={24} />
            </button>
            <button
              onClick={onToggleFav}
              className={`p-4 rounded-full transition-all border ${
                isFav
                  ? "bg-red-500 border-red-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Heart size={24} className={isFav ? "fill-current" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
