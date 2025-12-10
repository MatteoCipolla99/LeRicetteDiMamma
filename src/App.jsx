import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import { AppProviders } from "./providers/AppProviders"; // Assicurati di aver creato questo file come detto prima
import "./index.css";

// Lazy loading delle pagine
const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddRecipe = lazy(() => import("./pages/AddRecipe"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ShoppingList = lazy(() => import("./pages/ShoppingList"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Componente Loading (preservato dall'originale)
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-orange-200 border-dashed rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  return (
    <AppProviders>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-orange-50/30 font-sans selection:bg-orange-200 selection:text-orange-900">
          <Navbar />

          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Chatbot />
          <Footer />
        </div>
      </Router>
    </AppProviders>
  );
}

export default App;
