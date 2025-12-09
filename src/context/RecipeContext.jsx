import { createContext, useContext, useState, useEffect } from "react";
import { recipes as initialRecipes } from "../data/recipes";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [allRecipes, setAllRecipes] = useState(() => {
    try {
      const savedCustomRecipes = localStorage.getItem("customRecipes");
      const customRecipes = savedCustomRecipes
        ? JSON.parse(savedCustomRecipes)
        : [];
      // Unisci evitando duplicati di ID
      const initialIds = new Set(initialRecipes.map((r) => r.id));
      const uniqueCustom = customRecipes.filter((r) => !initialIds.has(r.id));
      return [...initialRecipes, ...uniqueCustom];
    } catch (e) {
      console.error("Errore caricamento ricette:", e);
      return initialRecipes;
    }
  });

  useEffect(() => {
    const customRecipes = allRecipes.filter((r) => r.isCustom);
    localStorage.setItem("customRecipes", JSON.stringify(customRecipes));
  }, [allRecipes]);

  const addRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now(),
      isCustom: true,
      rating: 0,
      reviews: 0,
      image:
        newRecipe.image ||
        "https://images.unsplash.com/photo-1495521841625-f342405df322?w=800",
    };
    setAllRecipes((prev) => [recipeWithId, ...prev]);
  };

  const deleteRecipe = (id) => {
    setAllRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ allRecipes, addRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);
