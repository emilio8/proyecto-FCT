"use client";

import { useState } from "react";

const ChangePasswordModal = ({
  isOpen,
  onClose,
  userData,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  userData: { name: string; surname1: string; surname2: string; email: string }; // Datos del usuario
  onSubmit: (updatedUserData: any) => void; // Función para manejar el envío
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(null);

    // Crear un objeto con los datos del usuario y la nueva contraseña
    const updatedUserData = {
      ...userData,
      password: newPassword, // Agregar la nueva contraseña
    };

    onSubmit(updatedUserData); // Llama a la función para manejar el envío
    onClose(); // Cierra el modal
  };

  if (!isOpen) {
    return null; // Si el modal no está abierto, no se renderiza
  }

return (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Fondo translúcido con transparencia */}
    <div className="absolute inset-0  bg-opacity-20 backdrop-blur-sm" onClick={onClose}></div>

    {/* Contenido del modal */}
    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-md relative z-10">
      <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
            Nueva Contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default ChangePasswordModal;