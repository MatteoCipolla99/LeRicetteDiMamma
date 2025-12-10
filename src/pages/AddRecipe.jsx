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
  Clock,
  Users,
  AlignLeft,
} from "lucide-react";

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
    ingredients: ["", ""],
    steps: ["", ""],
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

  const addItem = (field) =>
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  const removeItem = (index, field) => {
    const list = [...formData[field]];
    if (list.length > 1 || list[index] !== "") {
      list.splice(index, 1);
      setFormData({ ...formData, [field]: list });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
    <div className="min-h-screen bg-[#fffbf0] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-orange-600 mb-8 font-bold transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Annulla
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white">
          <div className="bg-gray-900 text-white p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <ChefHat className="w-16 h-16 mx-auto mb-6 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold mb-4">
              Crea la tua Ricetta
            </h1>
            <p className="text-gray-400 text-lg">
              Condividi la tua arte culinaria con la community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
            {/* 1. Base Info */}
            <section>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Informazioni Generali
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="label">Titolo Ricetta</label>
                  <input
                    required
                    type="text"
                    name="title"
                    className="input-field text-xl"
                    placeholder="es. Lasagne alla Bolognese"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="label">Categoria</label>
                  <div className="relative">
                    <select
                      name="category"
                      className="input-field appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {[
                        "Primi Piatti",
                        "Secondi Piatti",
                        "Dolci",
                        "Antipasti",
                        "Contorni",
                        "Pizze",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none text-gray-400">
                      ▼
                    </div>
                  </div>
                </div>
                <div>
                  <label className="label">Difficoltà</label>
                  <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
                    {["Facile", "Media", "Difficile"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, difficulty: d })
                        }
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          formData.difficulty === d
                            ? "bg-white text-orange-600 shadow-sm border border-gray-100"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <label className="label">Tempo (min)</label>
                  <input
                    required
                    type="number"
                    name="time"
                    className="input-field pl-11"
                    placeholder="45"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                  <Clock
                    className="absolute left-4 top-[2.35rem] text-gray-400"
                    size={18}
                  />
                </div>
                <div className="relative">
                  <label className="label">Porzioni</label>
                  <input
                    type="number"
                    name="servings"
                    className="input-field pl-11"
                    placeholder="4"
                    value={formData.servings}
                    onChange={handleInputChange}
                  />
                  <Users
                    className="absolute left-4 top-[2.35rem] text-gray-400"
                    size={18}
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <label className="label">URL Immagine (Opzionale)</label>
                  <input
                    type="url"
                    name="image"
                    className="input-field pl-11"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                  <Upload
                    className="absolute left-4 top-[2.35rem] text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </section>

            {/* 2. Ingredients */}
            <section className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center text-sm font-bold shadow-sm">
                  2
                </span>
                Ingredienti
              </h3>
              <div className="space-y-3">
                {formData.ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-2 group">
                    <input
                      type="text"
                      className="input-field bg-white border-transparent focus:border-orange-500"
                      placeholder={`Ingrediente ${i + 1}`}
                      value={ing}
                      onChange={(e) => handleInputChange(e, i, "ingredients")}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(i, "ingredients")}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addItem("ingredients")}
                className="mt-4 text-orange-600 font-bold text-sm flex items-center gap-2 hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} /> Aggiungi altro
              </button>
            </section>

            {/* 3. Steps */}
            <section>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                  3
                </span>
                Procedimento
              </h3>
              <div className="space-y-6">
                {formData.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="font-serif font-bold text-2xl text-gray-200 mt-2">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="flex-1 relative">
                      <textarea
                        className="input-field min-h-[100px] resize-y"
                        placeholder="Descrivi questo passaggio..."
                        value={step}
                        onChange={(e) => handleInputChange(e, i, "steps")}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(i, "steps")}
                        className="absolute right-2 top-2 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addItem("steps")}
                className="mt-4 text-gray-600 font-bold text-sm flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} /> Aggiungi passaggio
              </button>
            </section>

            <div className="pt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-12 py-4 text-lg w-full md:w-auto"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Save size={20} /> Pubblica Ricetta
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
