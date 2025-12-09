import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ChefHat, Star } from "lucide-react";
import { recipes } from "../data/recipes";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl text-gray-500">Ricetta non trovata 😔</p>
        <Link to="/recipes" className="mt-4 text-primary-500 hover:underline">
          Torna alle ricette
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-96 object-cover brightness-75"
        />
        <div className="absolute top-8 left-8">
          <Link
            to="/recipes"
            className="inline-flex items-center space-x-2 bg-white bg-opacity-80 px-4 py-2 rounded-lg hover:bg-opacity-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Torna Indietro</span>
          </Link>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-5xl font-bold">{recipe.name}</h1>
          <p className="text-lg mt-2">{recipe.category}</p>
        </div>
      </header>

      {/* Recipe Info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-primary-500" />
              <span>Tempo: {recipe.time} min</span>
            </div>
            <div className="flex items-center gap-4">
              <ChefHat className="w-6 h-6 text-primary-500" />
              <span>Difficoltà: {recipe.difficulty}</span>
            </div>
            <div className="flex items-center gap-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <span>Rating: {recipe.rating} / 5</span>
            </div>
          </div>

          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold mb-2">Ingredienti</h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Preparazione</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetailPage;
