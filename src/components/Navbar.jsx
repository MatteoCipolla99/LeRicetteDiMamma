import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useShoppingList } from "../context/ShoppingListContext";
import {
  ChefHat,
  Heart,
  ShoppingCart,
  LogOut,
  User,
  Menu,
  X,
  PlusCircle,
  Search,
  Home,
} from "lucide-react";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useShoppingList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location]);

  const NavLink = ({ to, icon: Icon, label, primary = false, onClick }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 ${
          primary
            ? "bg-primary-500 text-white hover:bg-primary-600 shadow-primary-200/50 shadow-lg"
            : isActive
            ? "bg-primary-50 text-primary-700"
            : "text-dark-500 hover:text-primary-700 hover:bg-cream-100"
        }`}
      >
        {Icon && <Icon size={18} strokeWidth={2.5} />}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg py-3 shadow-soft-sm border-b border-cream-100"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-3 group relative z-10"
            >
              <div className="bg-primary-500 text-white p-2.5 rounded-xl rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-primary-500/30">
                <ChefHat size={28} strokeWidth={2} />
              </div>
              <span className="font-serif font-black text-2xl text-dark-900 tracking-tight group-hover:text-primary-700 transition-colors">
                Le Ricette di Mamma
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-cream-200/50 shadow-sm">
              <NavLink to="/" label="Home" />
              <NavLink to="/recipes" icon={Search} label="Cerca" />
              <NavLink to="/favorites" icon={Heart} label="Preferiti" />
              <NavLink
                to="/shopping-list"
                icon={ShoppingCart}
                label={`Lista (${totalItems})`}
              />
            </div>

            {/* User Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/add-recipe"
                    className="btn-primary !py-2.5 !px-5 !text-sm flex gap-2"
                  >
                    <PlusCircle size={18} /> Nuova Ricetta
                  </Link>
                  <div className="flex items-center gap-3 pl-4 border-l border-cream-300">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 font-bold text-dark-700 hover:text-primary-700"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                        <User size={18} />
                      </div>
                      <span>{user.name}</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-cream-300 hover:text-red-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary !py-2.5 !px-6"
                >
                  Accedi
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-dark-700 hover:bg-cream-100 rounded-xl relative z-10"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay COMPLETO */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col animate-fade-in lg:hidden">
          <div className="flex-1 overflow-y-auto pt-32 pb-20 px-6">
            <nav className="space-y-4">
              <NavLink
                to="/"
                icon={Home}
                label="Home"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavLink
                to="/recipes"
                icon={Search}
                label="Cerca Ricette"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavLink
                to="/favorites"
                icon={Heart}
                label="Preferiti"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavLink
                to="/shopping-list"
                icon={ShoppingCart}
                label={`Lista Spesa (${totalItems})`}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <div className="pt-6 border-t border-cream-200">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-4 bg-primary-50 rounded-2xl mb-3"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">Vedi profilo</p>
                      </div>
                    </Link>
                    <Link
                      to="/add-recipe"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-primary w-full justify-center mb-3"
                    >
                      <PlusCircle size={18} /> Aggiungi Ricetta
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-red-500 font-bold py-3 rounded-2xl hover:bg-red-50"
                    >
                      Esci
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full justify-center"
                  >
                    Accedi
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
