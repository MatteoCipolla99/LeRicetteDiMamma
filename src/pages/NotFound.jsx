import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50 animate-fade-in">
      <div className="w-48 h-48 bg-orange-200 rounded-full flex items-center justify-center mb-8 shadow-2xl">
        <Frown className="w-24 h-24 text-orange-600 stroke-1" />
      </div>
      <h1 className="text-8xl font-extrabold text-orange-600 mb-2 font-mono drop-shadow-lg">
        404
      </h1>
      <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
        Ops! Piatto Bruciato
      </h2>
      <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
        Sembra che la pagina che stai cercando non sia nel nostro menu. Potrebbe
        essere stata mangiata o spostata in un'altra dispensa.
      </p>
      <Link
        to="/"
        className="px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 transform hover:scale-[1.05]"
      >
        Torna in Cucina (Home)
      </Link>
    </div>
  );
};

export default NotFound;
