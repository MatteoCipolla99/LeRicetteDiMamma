import { createContext, useContext, useState, useEffect } from "react";
import storage from "../services/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.getUser()); // Pulito!
  const [favorites, setFavorites] = useState(() =>
    storage.get("favorites", [])
  ); // Pulito!

  useEffect(() => {
    if (user) storage.setUser(user);
    else storage.removeUser();
  }, [user]);

  useEffect(() => {
    storage.set("favorites", favorites);
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
