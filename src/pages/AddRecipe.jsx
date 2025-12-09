import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { Plus, Trash2, ChefHat, Upload, Save, ArrowLeft } from "lucide-react";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Primi Piatti",
    difficulty: "Facile",
    time: "",
    servings: "",
    ingredients: [""],
    steps: [""],
    image: "",
  });

  const handleInputChange = (e, index, field) => {
    if (field) {
      const list = [...formData[field]];
      list[index] = e.target.value;
      setFormData({ ...formData, [field]: list });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeItem = (index, field) => {
    const list = [...formData[field]];
    list.splice(index, 1);
    setFormData({ ...formData, [field]: list });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuliamo un piccolo ritardo di rete per UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    addRecipe(formData);
    setIsSubmitting(false);
    navigate("/recipes");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-1" /> Torna indietro
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2">
              Nuova Creazione
            </h1>
            <p className="text-primary-100">
              Condividi il tuo capolavoro con la community.
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <ChefHat size={32} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Sezione Info Generali */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
              Informazioni Base
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label">Titolo della Ricetta *</label>
                <input
                  required
                  type="text"
                  name="title"
                  className="input-field text-lg font-serif"
                  placeholder="Es. Risotto allo Zafferano"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="label">Categoria</label>
                <select
                  name="category"
                  className="input-field bg-white"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {[
                    "Primi Piatti",
                    "Secondi Piatti",
                    "Dolci",
                    "Antipasti",
                    "Contorni",
                    "Pizze e Lievitati",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Difficoltà</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Facile", "Media", "Difficile"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, difficulty: d })
                      }
                      className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                        formData.difficulty === d
                          ? "bg-primary-50 border-primary-500 text-primary-700 ring-1 ring-primary-500"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Tempo (minuti) *</label>
                <input
                  required
                  type="number"
                  min="1"
                  name="time"
                  className="input-field"
                  placeholder="45"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="label">Porzioni (persone)</label>
                <input
                  type="number"
                  min="1"
                  name="servings"
                  className="input-field"
                  placeholder="4"
                  value={formData.servings}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">URL Immagine</label>
                <div className="relative">
                  <input
                    type="url"
                    name="image"
                    className="input-field pl-10"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                  <Upload
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-1">
                  Lascia vuoto per usare un'immagine predefinita.
                </p>
              </div>
            </div>
          </section>

          {/* Ingredienti */}
          <section className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Ingredienti</h3>
              <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                {formData.ingredients.length} elementi
              </span>
            </div>
            <div className="space-y-3">
              {formData.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 group">
                  <span className="py-3 text-gray-400 font-mono text-sm w-6">
                    {i + 1}.
                  </span>
                  <input
                    type="text"
                    className="input-field bg-white"
                    placeholder="Es. 300g Farina 00"
                    value={ing}
                    onChange={(e) => handleInputChange(e, i, "ingredients")}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i, "ingredients")}
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addItem("ingredients")}
              className="mt-4 flex items-center gap-2 text-primary-600 font-semibold hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} /> Aggiungi Ingrediente
            </button>
          </section>

          {/* Procedimento */}
          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Procedimento</h3>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {formData.steps.length} passaggi
              </span>
            </div>
            <div className="space-y-4">
              {formData.steps.map((step, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm mt-1">
                    {i + 1}
                  </div>
                  <textarea
                    className="input-field bg-white min-h-[80px]"
                    placeholder={`Descrivi il passaggio ${i + 1}...`}
                    value={step}
                    onChange={(e) => handleInputChange(e, i, "steps")}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i, "steps")}
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors self-start opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addItem("steps")}
              className="mt-4 flex items-center gap-2 text-gray-600 font-semibold hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} /> Aggiungi Passaggio
            </button>
          </section>

          <div className="pt-6 border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-lg shadow-xl"
            >
              {isSubmitting ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save size={20} /> Salva Ricetta
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
