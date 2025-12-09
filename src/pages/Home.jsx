import React from "react";
import { Link } from "react-router-dom";
// AGGIUNTO PlusCircle agli import
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
  // In un'app reale potresti voler mescolare l'array
  const featuredRecipes = allRecipes.slice(0, 3);

  const categories = [
    { name: "Primi Piatti", icon: "🍝", desc: "Pasta, Risotti e Zuppe" },
    { name: "Secondi Piatti", icon: "🍖", desc: "Carne, Pesce e Arrosti" },
    { name: "Dolci", icon: "🍰", desc: "Torte, Biscotti e Creme" },
    { name: "Contorni", icon: "🥗", desc: "Verdure e Insalate" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center">
        {/* Immagine di sfondo con overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Cooking Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
              Dal 1999
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Il sapore autentico <br />
              <span className="text-orange-400">di casa tua.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Scopri le ricette segrete di Mamma Concetta. Tradizione, passione
              e ingredienti genuini per portare la felicità in tavola ogni
              giorno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/recipes"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                Inizia a Cucinare <ArrowRight size={20} />
              </Link>
              <Link
                to="/add-recipe"
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-lg transition-all flex items-center justify-center"
              >
                Condividi la tua Ricetta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="bg-orange-50 py-12 border-b border-orange-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Utensils className="w-8 h-8 text-orange-500" />,
              title: "Ricette Autentiche",
              desc: "Testate dalla Mamma",
            },
            {
              icon: <Clock className="w-8 h-8 text-orange-500" />,
              title: "Veloci & Facili",
              desc: "Per chi ha poco tempo",
            },
            {
              icon: <Award className="w-8 h-8 text-orange-500" />,
              title: "Ingredienti Sani",
              desc: "Solo il meglio",
            },
            {
              icon: <Star className="w-8 h-8 text-orange-500" />,
              title: "Community Top",
              desc: "Chef appassionati",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-3 p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Cosa vuoi mangiare oggi?
            </h2>
            <p className="text-gray-500">
              Esplora le nostre categorie principali
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/recipes`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col justify-end p-6">
                  <span className="text-4xl mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                    {cat.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {cat.desc}
                  </p>
                </div>
                <img
                  src={`https://source.unsplash.com/random/400x500/?food,${
                    cat.name.split(" ")[0]
                  }`}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED RECIPES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
                Scelti per te
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-800 mt-2">
                I piatti del momento
              </h2>
            </div>
            <Link
              to="/recipes"
              className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors"
            >
              Vedi tutti <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/recipes" className="btn-primary w-full justify-center">
              Vedi tutti i piatti
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 rounded-l-full blur-3xl transform translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Hai una ricetta segreta?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Entra a far parte della nostra famiglia di chef. Condividi le tue
            creazioni, ricevi recensioni e salva i tuoi piatti preferiti nel tuo
            ricettario digitale.
          </p>
          <Link
            to="/add-recipe"
            className="inline-flex items-center px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-2xl"
          >
            <PlusCircle className="mr-2" /> Aggiungi Ricetta
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
