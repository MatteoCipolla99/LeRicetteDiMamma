import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChefHat, Menu, X, User, LogOut, BarChart3 } from "lucide-react";
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
    { name: "Dashboard", path: "/dashboard", protected: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <ChefHat className="w-8 h-8 text-primary-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-display font-bold text-gray-800">
                Le Ricette{" "}
                <span className="text-primary-500">Mamma Concetta</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? "text-primary-500 border-b-2 border-primary-500"
                        : "text-gray-600 hover:text-primary-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Esci</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <User className="w-4 h-4" />
                  <span>Accedi</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-fadeIn">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Esci</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Accedi
                  </button>
                )}
              </div>
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
