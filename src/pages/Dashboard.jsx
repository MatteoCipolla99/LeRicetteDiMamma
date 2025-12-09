import React, { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, PlusCircle, BookOpen, Heart, Star } from "lucide-react";
import { recipes } from "../data/recipes";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, favorites, isFavorite } = useAuth();

  // Redirect se non loggato (Protezione Rotta)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Calcolo statistiche dinamiche con useMemo per performance
  const stats = useMemo(() => {
    const totalRecipes = recipes.length;
    const totalReviews = recipes.reduce((acc, curr) => acc + curr.reviews, 0);
    const avgRating = (
      recipes.reduce((acc, curr) => acc + curr.rating, 0) / totalRecipes
    ).toFixed(1);

    return { totalRecipes, totalReviews, avgRating };
  }, []);

  // Filtriamo le ricette preferite dell'utente
  const favoriteRecipes = recipes.filter((recipe) => isFavorite(recipe.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Personalizzato */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="User"
              className="w-16 h-16 rounded-full border-4 border-white/30"
            />
            <div>
              <h1 className="text-3xl font-bold">Bentornato, {user.name}!</h1>
              <p className="text-orange-100">
                Ecco il riepilogo della tua cucina digitale.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* KPI Cards Dinamiche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-between border-l-4 border-orange-500">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalRecipes}
              </p>
              <p className="text-gray-500 font-medium">Ricette Disponibili</p>
            </div>
            <BookOpen className="w-10 h-10 text-orange-200" />
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-between border-l-4 border-red-500">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {favorites.length}
              </p>
              <p className="text-gray-500 font-medium">I tuoi Preferiti</p>
            </div>
            <Heart className="w-10 h-10 text-red-200" />
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-between border-l-4 border-yellow-500">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {stats.avgRating}
              </p>
              <p className="text-gray-500 font-medium">Media Voti Community</p>
            </div>
            <Star className="w-10 h-10 text-yellow-200" />
          </div>
        </div>

        {/* Sezione Preferiti */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Heart className="text-red-500 fill-current" size={24} />
              Le tue Ricette Salvate
            </h2>
            <Link
              to="/recipes"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            >
              Scopri nuove ricette <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-700">
                      {recipe.time} min
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">
                      {recipe.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 truncate">
                      {recipe.title}
                    </h3>
                    <Link
                      to={`/recipe/${recipe.id}`} // Nota: path corretto è /recipe/:id
                      className="inline-flex items-center mt-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium text-sm"
                    >
                      Cucina Ora
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-12 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Nessun preferito ancora
              </h3>
              <p className="text-gray-500 mb-6">
                Inizia ad esplorare e salva le ricette che vuoi provare!
              </p>
              <Link to="/recipes" className="btn-primary">
                Esplora Ricettario
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
