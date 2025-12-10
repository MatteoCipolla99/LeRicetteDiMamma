import { createContext, useContext, useState, useEffect } from "react";

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("shoppingList");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const addIngredients = (ingredients) => {
    const newItems = ingredients.map((ing) => ({
      id: Date.now() + Math.random(),
      text: ing,
      checked: false,
      quantity: 1, // FIX CRITICO: aggiunta proprietà quantity
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const addSingleItem = (text) => {
    const newItem = {
      id: Date.now(),
      text,
      checked: false,
      quantity: 1,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateQuantity = (id, newQuantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
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

  const clearChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        addIngredients,
        addSingleItem,
        updateQuantity,
        toggleItem,
        removeItem,
        clearList,
        clearChecked,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);
