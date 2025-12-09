import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = window.localStorage?.getItem("user");
        const savedFavorites = window.localStorage?.getItem("favorites");
        const savedReviews = window.localStorage?.getItem("userReviews");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        if (savedReviews) {
          setUserReviews(JSON.parse(savedReviews));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (email, password) => {
    if (email && password.length >= 6) {
      const userData = {
        id: Date.now(),
        name:
          email.split("@")[0].charAt(0).toUpperCase() +
          email.split("@")[0].slice(1),
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          email
        )}&background=f15a24&color=fff&size=128`,
        joinedDate: new Date().toISOString(),
      };

      setUser(userData);
      try {
        window.localStorage?.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving user:", error);
      }

      return { success: true, user: userData };
    }
    return { success: false, error: "Email o password non validi" };
  };

  const register = (name, email, password) => {
    if (name && email && password.length >= 6) {
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=f15a24&color=fff&size=128`,
        joinedDate: new Date().toISOString(),
      };

      setUser(userData);
      try {
        window.localStorage?.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving user:", error);
      }

      return { success: true, user: userData };
    }
    return {
      success: false,
      error:
        "Dati non validi. Assicurati che la password sia di almeno 6 caratteri.",
    };
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage?.removeItem("user");
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const addFavorite = (recipeId) => {
    const newFavorites = [...favorites, recipeId];
    setFavorites(newFavorites);
    try {
      window.localStorage?.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const removeFavorite = (recipeId) => {
    const newFavorites = favorites.filter((id) => id !== recipeId);
    setFavorites(newFavorites);
    try {
      window.localStorage?.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  const addReview = (recipeId, rating, comment) => {
    const newReview = {
      id: Date.now(),
      recipeId,
      rating,
      comment,
      userId: user?.id,
      userName: user?.name,
      date: new Date().toISOString(),
    };

    const newReviews = [...userReviews, newReview];
    setUserReviews(newReviews);

    try {
      window.localStorage?.setItem("userReviews", JSON.stringify(newReviews));
    } catch (error) {
      console.error("Error saving review:", error);
    }

    return newReview;
  };

  const getRecipeReviews = (recipeId) => {
    return userReviews.filter((review) => review.recipeId === recipeId);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    userReviews,
    addReview,
    getRecipeReviews,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
