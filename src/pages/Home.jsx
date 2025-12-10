import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Utensils,
  Award,
  Clock,
  Star,
  PlusCircle,
} from "lucide-react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { allRecipes } = useRecipes();
  const featuredRecipes = allRecipes.slice(0, 3);

  const categories = [
    { name: "Primi", icon: "🍝", label: "Primi Piatti", count: 34 },
    { name: "Secondi", icon: "🍖", label: "Secondi Piatti", count: 22 },
    { name: "Dolci", icon: "🍰", label: "Dolci & Dessert", count: 18 },
    { name: "Veggie", icon: "🥗", label: "Contorni", count: 12 },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION REDESIGNED */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20">
        {/* Background dinamico */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fffbf0] z-10" />
          <img
            src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover animate-fade-in scale-105"
            alt="Cucina Italiana"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center text-white max-w-4xl">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-bold tracking-widest uppercase">
                Nuove ricette ogni giorno
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-extrabold mb-6 leading-[1.1] text-shadow-lg">
              Cucina con il <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-amber-200 italic pr-2">
                Cuore
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Le ricette della tradizione italiana, tramandate da Mamma
              Concetta, ora a portata di click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/recipes"
                className="btn-primary text-lg px-10 py-4 shadow-orange-500/20"
              >
                Esplora il Menu
              </Link>
              <Link
                to="/add-recipe"
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all"
              >
                Crea Ricetta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - FLOATING CARDS */}
      <section className="py-24 relative -mt-32 z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                to="/recipes"
                key={i}
                className="group bg-white p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform block">
                  {cat.icon}
                </span>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">
                  {cat.label}
                </h3>
                <span className="text-sm text-gray-400 font-medium mt-1">
                  {cat.count} ricette
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Piatti della Settimana
              </h2>
              <p className="text-gray-500 text-lg">
                Selezionati con cura per te, perfetti per la stagione.
              </p>
            </div>
            <Link
              to="/recipes"
              className="flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700 transition-colors group text-lg"
            >
              Vedi tutto{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500 rounded-full blur-[100px] opacity-20 translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <Utensils className="w-16 h-16 text-orange-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              La tua cucina merita un pubblico
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
              Condividi i segreti della nonna, sperimenta nuovi sapori e
              costruisci il tuo ricettario digitale.
            </p>
            <Link to="/add-recipe" className="btn-primary text-lg inline-flex">
              <PlusCircle size={20} /> Inizia a Scrivere
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
