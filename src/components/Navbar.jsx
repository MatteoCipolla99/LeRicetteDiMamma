import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChefHat,
  Menu,
  X,
  User,
  LogOut,
  Heart,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ricette", path: "/recipes" },
  ];

  const authLinks = [
    { name: "Preferiti", path: "/favorites", icon: <Heart size={18} /> },
    {
      name: "Nuova Ricetta",
      path: "/add-recipe",
      icon: <PlusCircle size={18} />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-orange-500 p-2 rounded-xl transform group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-serif text-gray-800 leading-none">
                  Le Ricette
                </span>
                <span className="text-sm font-medium text-orange-500 leading-none">
                  di Mamma Concetta
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium text-sm transition-all hover:-translate-y-0.5 ${
                    isActive(link.path)
                      ? "text-orange-600 font-bold"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Link Autenticati */}
              {isAuthenticated && (
                <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                  {authLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-500"
                      }`}
                      title={link.name}
                    >
                      {link.icon}
                      <span className="hidden lg:inline">{link.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu / Login Btn */}
            <div className="hidden md:flex items-center ml-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 bg-gray-50 pl-2 pr-4 py-1.5 rounded-full border border-gray-100">
                  <img
                    src={user.avatar}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-white shadow-sm"
                  />
                  <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                    title="Esci"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <User size={18} /> Accedi
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in-down">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium ${
                    isActive(link.path) ? "text-orange-500" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    La tua area
                  </p>
                  {authLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      {link.icon} {link.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-red-500 font-medium pt-2"
                  >
                    <LogOut size={18} /> Esci
                  </button>
                </div>
              )}

              {!isAuthenticated && (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary mt-4 py-3"
                >
                  Accedi o Registrati
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
