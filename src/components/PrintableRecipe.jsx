import React from "react";

const PrintableRecipe = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Ingredienti:</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Preparazione:</h3>
        <ol className="list-decimal list-inside">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="mb-1">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <p>
          <strong>Tempo di cottura:</strong> {recipe.cookingTime} min
        </p>
        <p>
          <strong>Porzioni:</strong> {recipe.servings}
        </p>
      </section>
    </div>
  );
};

export default PrintableRecipe;
