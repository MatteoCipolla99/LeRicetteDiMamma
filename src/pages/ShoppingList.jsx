import React from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import {
  ShoppingCart,
  Trash2,
  CheckCircle,
  Circle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const { items, toggleItem, removeItem, clearList } = useShoppingList();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-orange-600 flex items-center gap-1"
        >
          <ArrowLeft size={20} /> Indietro
        </button>
        <h1 className="text-3xl font-serif font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart className="text-orange-500" /> Lista Spesa
        </h1>
      </div>
      {items.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 bg-orange-50 flex justify-between items-center border-b border-orange-100">
            <span className="font-bold text-orange-800">
              {items.length} Prodotti
            </span>
            <button
              onClick={clearList}
              className="text-red-500 hover:text-red-700 flex items-center gap-1 font-medium text-sm"
            >
              <Trash2 size={14} /> Svuota
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${
                  item.checked ? "bg-gray-50/50" : ""
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center gap-4">
                  {item.checked ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-300" />
                  )}
                  <span
                    className={`text-lg ${
                      item.checked
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-gray-300 hover:text-red-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Il carrello è vuoto.</p>
        </div>
      )}
    </div>
  );
};
export default ShoppingList;
