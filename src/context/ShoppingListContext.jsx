import { createContext, useContext, useState, useEffect } from "react";

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const addIngredients = (ingredients) => {
    const newItems = ingredients.map((ing) => ({
      id: Date.now() + Math.random(),
      text: ing,
      checked: false,
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearList = () => setItems([]);

  return (
    <ShoppingListContext.Provider
      value={{ items, addIngredients, toggleItem, removeItem, clearList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);
