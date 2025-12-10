import React from "react";
import { Link } from "react-router-dom";
import { Frown, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#fffbf0] text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-10 text-9xl opacity-5 rotate-12">
        🍕
      </div>
      <div className="absolute bottom-1/4 right-10 text-9xl opacity-5 -rotate-12">
        🍝
      </div>

      <div className="relative z-10 animate-fade-in-up">
        <div className="w-40 h-40 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-xl">
          <span className="text-6xl">🍳</span>
        </div>

        <h1 className="text-9xl font-serif font-extrabold text-orange-500 mb-2 leading-none text-shadow-sm">
          404
        </h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ops! Piatto Bruciato
        </h2>

        <p className="text-xl text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
          Sembra che la pagina che cerchi sia finita nel forno troppo a lungo ed
          è sparita. Torniamo in cucina prima che si bruci qualcos'altro!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary px-8">
            <Home size={20} /> Torna in Cucina
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-orange-200 hover:text-orange-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> Indietro
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
