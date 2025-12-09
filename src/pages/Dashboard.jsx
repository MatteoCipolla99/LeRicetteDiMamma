import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlusCircle, Users, Heart } from "lucide-react";
import { recipes } from "../data/recipes";

const Dashboard = () => {
  const recentRecipes = recipes.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-lg text-white/90">
            Gestisci le tue ricette e la community
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-gray-500">Ricette</p>
            </div>
            <PlusCircle className="w-10 h-10 text-primary-500" />
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-gray-500">Utenti</p>
            </div>
            <Users className="w-10 h-10 text-primary-500" />
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">2500+</p>
              <p className="text-gray-500">Mi Piace</p>
            </div>
            <Heart className="w-10 h-10 text-primary-500" />
          </div>
        </div>

        {/* Recent Recipes */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Ricette Recenti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="rounded-lg mb-4 h-40 w-full object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                <p className="text-gray-500 mb-4">{recipe.category}</p>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="inline-flex items-center space-x-2 text-primary-500 hover:underline"
                >
                  <span>Visualizza</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
