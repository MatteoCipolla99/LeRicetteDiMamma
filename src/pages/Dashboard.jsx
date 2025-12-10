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
    // La media dei voti è più un placeholder senza un sistema di voto completo
    const avgRating = (
      recipes.reduce((acc, curr) => acc + curr.rating, 0) / (totalRecipes || 1)
    ).toFixed(1);

    return { totalRecipes, avgRating };
  }, []);

  // Filtriamo le ricette preferite dell'utente
  const favoriteRecipes = recipes.filter((recipe) => isFavorite(recipe.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Personalizzato - Più Impatto */}
      <header className="bg-gradient-to-br from-orange-600 to-red-500 text-white py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user.name
                  .split(" ")
                  .join("+")}&background=fff&color=fb923c&bold=true`
              }
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-white/50 shadow-lg object-cover"
            />
            <div>
              <h1 className="text-4xl font-extrabold font-serif">
                Bentornato, {user.name}!
              </h1>
              <p className="text-orange-200 text-lg mt-1">
                Il tuo riepilogo della cucina digitale. Pronti per cucinare?
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* KPI Cards Dinamiche - Design Moderno */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-orange-500">
            <BookOpen className="w-10 h-10 text-orange-400 mb-3" />
            <p className="text-4xl font-extrabold text-gray-900">
              {stats.totalRecipes}
            </p>
            <p className="text-gray-500 font-medium mt-1">
              Ricette Disponibili
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-red-500">
            <Heart className="w-10 h-10 text-red-400 mb-3" />
            <p className="text-4xl font-extrabold text-gray-900">
              {favorites.length}
            </p>
            <p className="text-gray-500 font-medium mt-1">I tuoi Preferiti</p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-yellow-500">
            <Star className="w-10 h-10 text-yellow-400 mb-3" />
            <p className="text-4xl font-extrabold text-gray-900">
              {stats.avgRating}
            </p>
            <p className="text-gray-500 font-medium mt-1">
              Media Voti Community
            </p>
          </div>
        </div>

        {/* Sezione Preferiti */}
        <section>
          <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 font-serif flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500" size={28} />
              Il tuo Ricettario Digitale
            </h2>
            <Link
              to="/recipes"
              className="text-orange-600 hover:text-orange-700 font-bold flex items-center group transition-colors"
            >
              Scopri nuove ricette{" "}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-md">
                      {recipe.time} min
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
                      {recipe.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 mt-1 truncate">
                      {recipe.title}
                    </h3>
                    <Link
                      to={`/recipe/${recipe.id}`} // Nota: path corretto è /recipe/:id
                      className="inline-flex items-center px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-bold text-md shadow-md"
                    >
                      Cucina Ora
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-2 border-dashed border-gray-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 font-serif">
                Nessun preferito ancora
              </h3>
              <p className="text-gray-500 mb-8 text-lg">
                Salva le ricette che ti piacciono di più cliccando sull'icona
                del cuore!
              </p>
              <Link
                to="/recipes"
                className="inline-flex items-center px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg"
              >
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
