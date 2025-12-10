import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X, ChefHat } from "lucide-react";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: email.split("@")[0],
      email: email,
      avatar:
        "https://ui-avatars.com/api/?name=" +
        email +
        "&background=ea580c&color=fff",
      token: "simulated-jwt-token",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="text-orange-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-extrabold text-gray-900 mb-2">
            Bentornato
          </h2>
          <p className="text-gray-500 mb-8">
            Accedi per salvare le tue ricette preferite.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="mario@esempio.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-4">
              Accedi
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Non hai un account?{" "}
            <span className="text-orange-600 font-bold cursor-pointer hover:underline">
              Registrati
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
