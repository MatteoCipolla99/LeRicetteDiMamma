import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // CORRETTO: path singolare e import dell'hook

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth(); // CORRETTO: uso dell'hook invece di useContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuliamo un oggetto user con i dati inseriti
    // In un'app reale qui faresti una chiamata API
    login({
      name: email.split("@")[0], // Usa la parte prima della @ come nome
      email: email,
      avatar: "https://ui-avatars.com/api/?name=" + email,
      token: "simulated-jwt-token",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 font-serif">
            Bentornato!
          </h2>
          <p className="text-gray-500 text-sm">
            Accedi per gestire le tue ricette
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="mario.rossi@esempio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-orange-500/30 mt-2"
          >
            Accedi
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          Non hai un account? Chiedi a Mamma Concetta!
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
