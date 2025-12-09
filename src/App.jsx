import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

// Pages
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Chatbot />

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-display font-bold mb-4">
                    Ricette della Mamma
                  </h3>
                  <p className="text-gray-300">
                    Le ricette tradizionali della cucina italiana, tramandate
                    con amore di generazione in generazione.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Link Veloci</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <a
                        href="/"
                        className="hover:text-primary-400 transition-colors"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/recipes"
                        className="hover:text-primary-400 transition-colors"
                      >
                        Ricette
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard"
                        className="hover:text-primary-400 transition-colors"
                      >
                        Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Seguici</h4>
                  <p className="text-gray-300 mb-4">
                    Resta aggiornato sulle nuove ricette e consigli di cucina
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>
                  © 2024 Ricette della Mamma. Tutti i diritti riservati. Fatto
                  con ❤️
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
