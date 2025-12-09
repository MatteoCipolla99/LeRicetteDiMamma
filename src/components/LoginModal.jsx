import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
            >
              Chiudi
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Accedi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
