import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-orange-100 p-6 rounded-full mb-6">
        <Frown className="w-16 h-16 text-orange-500" />
      </div>
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-4">
        Ops! Piatto Bruciato
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        Sembra che la pagina che stai cercando non sia nel nostro menu. Potrebbe
        essere stata mangiata o spostata in un'altra dispensa.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30"
      >
        Torna alla Home
      </Link>
    </div>
  );
};

export default NotFound;
