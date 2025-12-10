import { useState, useMemo } from "react";

export const useRecipeFilters = (recipes) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "Tutte",
    difficulty: "Tutte",
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      // ERRORE CORRETTO QUI: Rimosso "XS" che c'era nella versione precedente
      const matchesCategory =
        filters.category === "Tutte" || recipe.category === filters.category;

      const matchesDifficulty =
        filters.difficulty === "Tutte" ||
        recipe.difficulty === filters.difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recipes, filters]);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () =>
    setFilters({ search: "", category: "Tutte", difficulty: "Tutte" });

  return { filteredRecipes, filters, setFilter, resetFilters };
};
