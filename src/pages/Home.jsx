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

  // Prendiamo 3 ricette a caso o le più recenti per la sezione "In Evidenza"
  const featuredRecipes = allRecipes.slice(0, 3);

  const categories = [
    { name: "Primi Piatti", icon: "🍝", desc: "Pasta, Risotti e Zuppe" },
    { name: "Secondi Piatti", icon: "🍖", desc: "Carne, Pesce e Arrosti" },
    {
      name: "Dolci",
      name_tag: "Dessert",
      icon: "🍰",
      desc: "Torte, Biscotti e Creme",
    },
    {
      name: "Contorni",
      name_tag: "Contorni",
      icon: "🥗",
      desc: "Verdure e Insalate",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION - Più Contrasto e Bold */}
      <section className="relative h-[90vh] flex items-center bg-gray-900">
        {/* Immagine di sfondo con un overlay più scuro per il contrasto */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Cooking Background"
            className="w-full h-full object-cover opacity-70" // Leggera opacità sull'immagine
          />
          <div className="absolute inset-0 bg-black/50"></div>{" "}
          {/* Overlay più scuro */}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-extrabold uppercase tracking-widest mb-4 inline-block shadow-md">
              MAMMA CONCETTA
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-extrabold mb-6 leading-none">
              Sapori che <br />
              <span className="text-orange-400">raccontano storie.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
              Scopri le ricette segrete di famiglia. Tradizione, passione e
              ingredienti genuini per portare la felicità in tavola.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/recipes"
                className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-[1.02] shadow-xl shadow-orange-600/40 flex items-center justify-center gap-2"
              >
                Inizia a Cucinare <ArrowRight size={20} />
              </Link>
              <Link
                to="/add-recipe"
                className="px-10 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/50 rounded-full font-bold text-lg transition-all flex items-center justify-center"
              >
                Condividi la tua Ricetta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP - Più Pulito */}
      <div className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Utensils className="w-8 h-8 text-orange-600" />,
              title: "Ricette Autentiche",
              desc: "Testate dalla Mamma",
            },
            {
              icon: <Clock className="w-8 h-8 text-orange-600" />,
              title: "Veloci & Facili",
              desc: "Per chi ha poco tempo",
            },
            {
              icon: <Award className="w-8 h-8 text-orange-600" />,
              title: "Ingredienti Sani",
              desc: "Solo il meglio",
            },
            {
              icon: <Star className="w-8 h-8 text-orange-600" />,
              title: "Community Top",
              desc: "Chef appassionati",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group p-3"
            >
              <div className="mb-3 p-4 bg-orange-100 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mt-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES - Effetti Hover più Ricchi */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-extrabold text-gray-800 mb-4">
              Cosa prepari oggi?
            </h2>
            <p className="text-lg text-gray-500">
              Esplora le nostre categorie principali e trova l'ispirazione.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/recipes`}
                className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 flex flex-col justify-end p-8 transition-opacity duration-300">
                  <span className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-500">
                    {cat.icon}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">{cat.desc}</p>
                </div>
                <img
                  src={`https://source.unsplash.com/random/400x500/?food,${
                    cat.name_tag || cat.name.split(" ")[0]
                  }`}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED RECIPES - Layout più pulito */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12 border-b-2 border-orange-100 pb-4">
            <div>
              <span className="text-orange-600 font-extrabold uppercase tracking-widest text-sm">
                IN EVIDENZA
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-800 mt-2">
                I piatti preferiti dalla community
              </h2>
            </div>
            <Link
              to="/recipes"
              className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors group"
            >
              Vedi tutte le ricette{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Si assume che RecipeCard abbia un buon stile */}
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link
              to="/recipes"
              className="w-full justify-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all inline-flex items-center gap-2"
            >
              Vedi tutte le ricette <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Più Impatto Visivo */}
      <section className="py-24 bg-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-white mb-6 leading-tight">
            Hai una ricetta segreta?
          </h2>
          <p className="text-xl text-orange-100 mb-12 leading-relaxed">
            Entra a far parte della nostra famiglia di chef. Condividi le tue
            creazioni e ispira migliaia di cuochi amatoriali.
          </p>
          <Link
            to="/add-recipe"
            className="inline-flex items-center px-12 py-4 bg-white text-orange-700 rounded-full font-extrabold text-xl hover:bg-orange-50 transition-colors shadow-2xl shadow-black/30 transform hover:scale-105"
          >
            <PlusCircle className="mr-3 h-6 w-6" /> Aggiungi Ricetta
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
