import React from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Clock,
  TrendingUp,
  Heart,
  ArrowRight,
  Star,
  Users,
} from "lucide-react";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const featuredRecipes = recipes.slice(0, 3);

  const stats = [
    {
      icon: ChefHat,
      value: "50+",
      label: "Ricette",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Users,
      value: "1000+",
      label: "Utenti",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Star,
      value: "4.8",
      label: "Rating Medio",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Heart,
      value: "2500+",
      label: "Mi Piace",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Le Ricette più Amate
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Le Ricette Tradizionali della{" "}
                <span className="text-yellow-300">Mamma</span>
              </h1>

              <p className="text-xl text-primary-50 mb-8 leading-relaxed">
                Scopri i segreti della cucina italiana con le ricette autentiche
                tramandate di generazione in generazione.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/recipes"
                  className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center space-x-2 group"
                >
                  <span>Esplora le Ricette</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-secondary border-white text-white hover:bg-white hover:bg-opacity-10">
                  Guarda il Video
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600"
                  alt="Cucina italiana"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-gray-800 p-6 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <ChefHat className="w-8 h-8 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary-500">50+</p>
                      <p className="text-sm text-gray-600">
                        Ricette Autentiche
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex p-4 rounded-full ${stat.color} mb-4`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
              Ricette in Evidenza
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Le ricette più amate dalla nostra community, provate e consigliate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/recipes"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Vedi Tutte le Ricette</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Ricette Veloci
              </h3>
              <p className="text-gray-600">
                Piatti deliziosi pronti in meno di 30 minuti per le tue giornate
                impegnative
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex p-4 bg-purple-100 rounded-full mb-4">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Cucina Tradizionale
              </h3>
              <p className="text-gray-600">
                Ricette autentiche della tradizione italiana, tramandate con
                amore
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                <Star className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Sempre Aggiornate
              </h3>
              <p className="text-gray-600">
                Nuove ricette aggiunte ogni settimana per ispirarti in cucina
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Inizia a Cucinare Oggi!
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Registrati gratuitamente e salva le tue ricette preferite
          </p>
          <button className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
            Registrati Gratis
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
