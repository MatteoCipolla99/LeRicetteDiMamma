import React from "react";
import {
  ChefHat,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1c1917] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-600 p-2 rounded-lg">
                <ChefHat className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold">Le Ricette</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La tradizione culinaria italiana a portata di click. Cucinare è un
              atto d'amore.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-white">
              Esplora
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  to="/recipes"
                  className="hover:text-orange-500 transition-colors"
                >
                  Tutte le Ricette
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cat=Primi"
                  className="hover:text-orange-500 transition-colors"
                >
                  Primi Piatti
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cat=Dolci"
                  className="hover:text-orange-500 transition-colors"
                >
                  Dolci della Nonna
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-white">
              Link Utili
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-white">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Ricevi la ricetta segreta della settimana.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="bg-gray-800 text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-600 text-sm"
              />
              <button className="bg-orange-600 p-3 rounded-xl hover:bg-orange-700 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Le Ricette di Mamma Concetta.
            Fatto con ❤️ e 🍝.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
