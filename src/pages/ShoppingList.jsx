import React, { useState } from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import {
  ShoppingCart,
  Trash2,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const {
    items,
    toggleItem,
    removeItem,
    clearList,
    clearChecked,
    addSingleItem,
    updateQuantity,
  } = useShoppingList();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState("");

  const uncheckedItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addSingleItem(newItem.trim());
      setNewItem("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf0] pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-orange-600 mb-6 font-bold flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={20} /> Indietro
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative min-h-[600px] border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 h-32 relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <ShoppingCart className="text-white w-12 h-12 relative z-10" />
          </div>

          <div className="px-8 md:px-12 -mt-10 pb-8 flex-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg mb-8 text-center border border-gray-100">
              <h1 className="text-3xl font-serif font-extrabold text-gray-900">
                Lista della Spesa
              </h1>
              <p className="text-gray-500 mt-1 font-medium">
                {uncheckedItems.length} prodotti da comprare
              </p>
            </div>

            {/* Form Aggiungi Manualmente */}
            <form
              onSubmit={handleAddItem}
              className="mb-8 flex gap-2 bg-orange-50 p-3 rounded-2xl border border-orange-100"
            >
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Aggiungi un prodotto..."
                className="flex-1 px-4 py-2 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={!newItem.trim()}
                className="p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>

            {items.length > 0 ? (
              <div className="space-y-8">
                {/* To Buy */}
                <ul className="space-y-3">
                  {uncheckedItems.map((item) => (
                    <li
                      key={item.id}
                      className="group flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          onClick={() => toggleItem(item.id)}
                          className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-orange-500 transition-colors cursor-pointer"
                        />
                        <span className="text-lg font-medium text-gray-800 flex-1">
                          {item.text}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-white rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-white rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Checked Items */}
                {checkedItems.length > 0 && (
                  <div className="pt-8 border-t-2 border-dashed border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Nel Carrello ({checkedItems.length})
                      </h3>
                      <button
                        onClick={clearChecked}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Rimuovi acquistati
                      </button>
                    </div>
                    <ul className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                      {checkedItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className="flex items-center gap-3 p-2 cursor-pointer group"
                        >
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <Check size={14} strokeWidth={3} />
                          </div>
                          <span className="text-lg text-gray-500 line-through decoration-2 decoration-gray-300 flex-1">
                            {item.text}
                          </span>
                          <span className="text-sm text-gray-400">
                            x{item.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="text-red-400 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-8 flex justify-center">
                  <button
                    onClick={clearList}
                    className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-full transition-colors"
                  >
                    Svuota Lista Completa
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">
                  Il carrello è vuoto.
                </p>
                <button
                  onClick={() => navigate("/recipes")}
                  className="mt-4 text-orange-600 font-bold hover:underline"
                >
                  Sfoglia ricette
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingList;
