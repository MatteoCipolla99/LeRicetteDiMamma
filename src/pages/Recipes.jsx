import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Primi", "Secondi", "Dolci", "Antipasti"];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || recipe.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Tutte le Ricette</h1>
          <p className="text-xl text-white/90">
            Sfoglia, cerca e trova la tua prossima ricetta preferita
          </p>
        </div>
      </header>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Cerca ricetta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRecipes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Nessuna ricetta trovata 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Vuoi scoprire tutte le ricette?
        </h2>
        <p className="mb-6 text-lg">Registrati e salva le tue preferite!</p>
        <Link
          to="/signup"
          className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center space-x-2"
        >
          <span>Registrati Ora</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
};

export default Recipes;
