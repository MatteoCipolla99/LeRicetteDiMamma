import React from "react";
import { ChefHat, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="text-orange-500 w-8 h-8" />
              <span className="text-xl font-bold font-serif">
                Le Ricette di Mamma
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La tradizione culinaria italiana portata direttamente nella tua
              cucina. Ricette tramandate con amore, dal cuore alla tavola.
            </p>
          </div>

          {/* Links Rapidi */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Esplora</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/recipes"
                  className="hover:text-white transition-colors"
                >
                  Tutte le Ricette
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cat=Primi"
                  className="hover:text-white transition-colors"
                >
                  Primi Piatti
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cat=Dolci"
                  className="hover:text-white transition-colors"
                >
                  Dolci della Nonna
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  La tua Cucina
                </Link>
              </li>
            </ul>
          </div>

          {/* Note Legali */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lavora con noi
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-500">
              Resta Aggiornato
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Ricevi la ricetta della settimana!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button className="bg-orange-500 p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Mail size={20} />
              </button>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Le Ricette di Mamma Concetta.
            Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
