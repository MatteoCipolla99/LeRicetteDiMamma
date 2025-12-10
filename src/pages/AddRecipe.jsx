import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import {
  Plus,
  Trash2,
  ChefHat,
  Upload,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react";

// Rimpiazziamo 'primary' con 'orange' per coerenza
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
    ingredients: ["", ""], // Due campi iniziali per una migliore UX
    steps: ["", ""], // Due campi iniziali
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
    // Impedisci di rimuovere l'ultimo elemento vuoto per gli step/ingredienti
    if (list.length > 1 || list[index] !== "") {
      list.splice(index, 1);
      setFormData({ ...formData, [field]: list });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Filtra campi vuoti in ingredienti/step prima di salvare
    const finalData = {
      ...formData,
      ingredients: formData.ingredients.filter((ing) => ing.trim() !== ""),
      steps: formData.steps.filter((step) => step.trim() !== ""),
    };

    await new Promise((resolve) => setTimeout(resolve, 800));

    addRecipe(finalData);
    setIsSubmitting(false);
    navigate("/recipes");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-1" /> Torna indietro
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-orange-600 to-red-500 p-10 text-white flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-extrabold mb-2">
              Condividi la Tua Ricetta
            </h1>
            <p className="text-orange-100 text-lg">
              Porta il tuo sapore unico nella nostra community.
            </p>
          </div>
          <div className="bg-white/30 p-4 rounded-full backdrop-blur-sm shadow-xl">
            <ChefHat size={36} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          {/* Sezione Info Generali */}
          <section className="border-b pb-8 border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
              1. Informazioni Base
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="label">Titolo della Ricetta *</label>
                <input
                  required
                  type="text"
                  name="title"
                  className="input-field text-xl font-serif"
                  placeholder="Es. Tiramisù Classico di Mamma"
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
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-lg">
                  {["Facile", "Media", "Difficile"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, difficulty: d })
                      }
                      className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                        formData.difficulty === d
                          ? "bg-white border border-orange-500 text-orange-700 shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Tempo Totale (minuti) *</label>
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
                <label className="label">URL Immagine della Ricetta</label>
                <div className="relative">
                  <input
                    type="url"
                    name="image"
                    className="input-field pl-10"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                  <Upload
                    size={20}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  Usa un'immagine di alta qualità. Sarà usata un'immagine
                  predefinita se lasci vuoto.
                </p>
              </div>
            </div>
          </section>

          {/* Ingredienti */}
          <section className="bg-orange-50 p-6 md:p-8 rounded-2xl border border-orange-200">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
              2. Ingredienti Necessari
            </h3>
            <div className="space-y-4">
              {formData.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-center group">
                  <span className="py-2 text-gray-500 font-mono font-bold w-6 flex-shrink-0 text-right">
                    {i + 1}.
                  </span>
                  <input
                    type="text"
                    className="input-field bg-white"
                    placeholder="Es. 300g Farina 00, 4 Uova, 1 Bottiglia di Passata..."
                    value={ing}
                    onChange={(e) => handleInputChange(e, i, "ingredients")}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i, "ingredients")}
                    className={`text-gray-400 hover:text-red-500 p-2 transition-colors ${
                      i > 0 || ing !== "" ? "opacity-100" : "opacity-0"
                    }`}
                    disabled={
                      i === 0 && ing === "" && formData.ingredients.length === 1
                    }
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addItem("ingredients")}
              className="mt-6 flex items-center gap-2 text-orange-600 font-bold hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} /> Aggiungi Ingrediente
            </button>
          </section>

          {/* Procedimento */}
          <section className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
              3. Procedimento (Passaggi)
            </h3>
            <div className="space-y-6">
              {formData.steps.map((step, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm mt-3.5 shadow-sm">
                    {i + 1}
                  </div>
                  <textarea
                    className="input-field bg-white min-h-[100px]"
                    placeholder={`Descrivi il passaggio ${
                      i + 1
                    } in dettaglio...`}
                    value={step}
                    onChange={(e) => handleInputChange(e, i, "steps")}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i, "steps")}
                    className={`text-gray-400 hover:text-red-500 p-2 transition-colors self-start mt-3 ${
                      i > 0 || step !== "" ? "opacity-100" : "opacity-0"
                    }`}
                    disabled={
                      i === 0 && step === "" && formData.steps.length === 1
                    }
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addItem("steps")}
              className="mt-6 flex items-center gap-2 text-gray-600 font-bold hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} /> Aggiungi Passaggio
            </button>
          </section>

          {/* Bottoni Finali */}
          <div className="pt-8 border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-full font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary flex items-center gap-2 px-10 py-3 rounded-full text-lg shadow-xl ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Salvando...
                </>
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
