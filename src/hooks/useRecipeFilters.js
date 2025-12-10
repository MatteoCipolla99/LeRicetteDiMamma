import { useState, useMemo, useEffect } from "react";

export const useRecipeFilters = (recipes) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "Tutte",
    difficulty: "Tutte",
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debouncing per la ricerca (migliora performance)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => clearTimeout(handler);
  }, [filters.search]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Ricerca full-text (titolo + ingredienti + categoria)
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch =
        !debouncedSearch ||
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchLower)
        ) ||
        recipe.category.toLowerCase().includes(searchLower);

      // Filtro categoria (normalizzazione)
      const matchesCategory =
        filters.category === "Tutte" || recipe.category === filters.category;

      // Filtro difficoltà
      const matchesDifficulty =
        filters.difficulty === "Tutte" ||
        recipe.difficulty === filters.difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recipes, debouncedSearch, filters.category, filters.difficulty]);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", category: "Tutte", difficulty: "Tutte" });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "Tutte" ||
    filters.difficulty !== "Tutte";

  return {
    filteredRecipes,
    filters,
    setFilter,
    resetFilters,
    hasActiveFilters,
    isSearching: filters.search !== debouncedSearch,
  };
};
