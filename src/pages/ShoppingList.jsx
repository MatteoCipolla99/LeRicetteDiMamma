import React from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import {
  ShoppingCart,
  Trash2,
  CheckCircle,
  Circle,
  ArrowLeft,
  Drumstick,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const { items, toggleItem, removeItem, clearList } = useShoppingList();
  const navigate = useNavigate();

  // Separiamo gli elementi spuntati da quelli non spuntati
  const uncheckedItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-3xl animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-1" /> Torna indietro
      </button>

      <div className="flex items-center gap-4 mb-8 border-b-2 border-orange-100 pb-4">
        <ShoppingCart className="text-orange-600 w-10 h-10" />
        <h1 className="text-4xl font-serif font-bold text-gray-800">
          La Tua Lista Spesa
        </h1>
      </div>

      {items.length > 0 ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Lista e Bottone Svuota */}
          <div className="p-5 bg-orange-50 flex justify-between items-center border-b border-orange-200">
            <span className="font-extrabold text-lg text-orange-800 uppercase tracking-wide">
              {uncheckedItems.length} Prodotti da Acquistare
            </span>
            <button
              onClick={clearList}
              className="text-red-600 hover:text-red-800 flex items-center gap-1 font-bold text-sm bg-red-50/50 px-3 py-1.5 rounded-full transition-colors"
            >
              <Trash2 size={16} /> Svuota Lista
            </button>
          </div>

          {/* Elementi da Acquistare */}
          <ul className="divide-y divide-gray-100">
            {uncheckedItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center justify-between p-4 px-6 cursor-pointer transition-colors hover:bg-orange-50/50`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center gap-4">
                  <Circle className="text-gray-400 w-6 h-6 flex-shrink-0 hover:text-orange-500 transition-colors" />
                  <span className="text-lg text-gray-800 font-medium">
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-gray-300 hover:text-red-500 p-2 opacity-70 hover:opacity-100 transition-opacity"
                  title="Rimuovi"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>

          {/* Elementi Acquistati */}
          {checkedItems.length > 0 && (
            <div className="p-4 px-6 bg-gray-50 border-t border-gray-200">
              <p className="font-extrabold text-gray-500 uppercase text-xs tracking-widest mb-2">
                Acquistati ({checkedItems.length})
              </p>
              <ul className="space-y-2">
                {checkedItems.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between p-2 cursor-pointer transition-colors opacity-70`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />
                      <span className="text-lg text-gray-500 line-through italic">
                        {item.text}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                      title="Rimuovi definitivamente"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl shadow-xl border-2 border-dashed border-gray-300">
          <Drumstick className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <p className="text-2xl font-serif font-bold text-gray-800 mb-2">
            Il carrello è vuoto.
          </p>
          <p className="text-gray-500 mb-6">
            Aggiungi ingredienti dalle tue ricette preferite!
          </p>
          <button
            onClick={() => navigate("/recipes")}
            className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg"
          >
            Trova Ricette
          </button>
        </div>
      )}
    </div>
  );
};
export default ShoppingList;
