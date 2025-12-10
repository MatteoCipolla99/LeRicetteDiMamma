import React, { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Star, ChefHat } from "lucide-react";
import { recipes } from "../data/recipes";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, favorites, isFavorite } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  const stats = useMemo(() => {
    const totalRecipes = recipes.length;
    const avgRating = (
      recipes.reduce((acc, curr) => acc + curr.rating, 0) / (totalRecipes || 1)
    ).toFixed(1);
    return { totalRecipes, avgRating };
  }, []);

  const favoriteRecipes = recipes.filter((recipe) => isFavorite(recipe.id));

  return (
    <div className="min-h-screen bg-[#fffbf0] pb-20">
      {/* Immersive Header */}
      <div className="relative bg-gray-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 animate-fade-in">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <img
              src={user.avatar}
              alt={user.name}
              className="relative w-28 h-28 rounded-full border-4 border-gray-900 object-cover shadow-2xl"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold mb-2">
              Ciao, {user.name}
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Ecco cosa succede nella tua cucina oggi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="bg-orange-100 p-4 rounded-full mb-4 text-orange-600">
              <BookOpen size={32} />
            </div>
            <span className="text-4xl font-extrabold text-gray-900">
              {stats.totalRecipes}
            </span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
              Ricette Globali
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="bg-red-100 p-4 rounded-full mb-4 text-red-500">
              <Heart size={32} />
            </div>
            <span className="text-4xl font-extrabold text-gray-900">
              {favorites.length}
            </span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
              Preferiti
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="bg-yellow-100 p-4 rounded-full mb-4 text-yellow-600">
              <Star size={32} />
            </div>
            <span className="text-4xl font-extrabold text-gray-900">
              {stats.avgRating}
            </span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
              Media Voti
            </span>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            Il tuo Ricettario del Cuore
          </h2>
          <Link
            to="/recipes"
            className="text-orange-600 font-bold hover:text-orange-700 flex items-center gap-1"
          >
            Sfoglia tutto <ArrowRight size={18} />
          </Link>
        </div>

        {favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteRecipes.map((recipe) => (
              <Link
                to={`/recipe/${recipe.id}`}
                key={recipe.id}
                className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex items-center gap-4"
              >
                <img
                  src={recipe.image}
                  className="w-24 h-24 rounded-2xl object-cover"
                  alt={recipe.title}
                />
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase">
                    {recipe.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-gray-800 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs font-bold">
                    <ChefHat size={14} /> {recipe.difficulty}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Nessun preferito
            </h3>
            <p className="mt-1 text-gray-500">
              Inizia a esplorare e salva ciò che ami.
            </p>
            <Link to="/recipes" className="mt-6 inline-flex btn-primary">
              Esplora Ricette
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
