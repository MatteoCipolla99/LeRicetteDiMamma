import React from "react";
import { Check, ShoppingCart } from "lucide-react";

export const IngredientList = ({ ingredients, onAddToCart, addedToCart }) => {
  return (
    <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold font-serif text-gray-900">
          Ingredienti
        </h3>
        <button
          onClick={onAddToCart}
          disabled={addedToCart}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
            addedToCart
              ? "bg-green-500 text-white"
              : "bg-white text-orange-600 hover:bg-orange-100 border border-orange-200"
          }`}
        >
          {addedToCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          {addedToCart ? "Aggiunti!" : "Aggiungi alla lista"}
        </button>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors cursor-default group"
          >
            <div className="w-6 h-6 rounded-full border-2 border-orange-200 flex items-center justify-center mt-0.5 group-hover:border-orange-500 group-hover:bg-orange-500 transition-all">
              <Check
                size={12}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-gray-700 font-medium">{ing}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
