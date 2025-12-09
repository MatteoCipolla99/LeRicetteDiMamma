import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Stato Utente (persistente)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Stato Preferiti (persistente)
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem("favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const login = (userData) => {
    // Simulazione login
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]); // Opzionale: pulire i preferiti al logout
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
  };

  const toggleFavorite = (recipeId) => {
    if (!user) {
      alert("Devi essere loggato per salvare i preferiti!");
      return;
    }
    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const isFavorite = (recipeId) => favorites.includes(recipeId);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
