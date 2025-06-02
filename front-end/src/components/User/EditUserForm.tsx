"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ChangePasswordModal from "./ChangePasswordModal";

const EditUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    surname1: "",
    surname2: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch(`http://localhost:8000/api/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

                const data = await response.json();

        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handlePasswordChange = async (updatedUserData: any) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña");
      }

      alert("Contraseña actualizada exitosamente.");
      setIsModalOpen(false); // Cierra el modal
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      alert("Usuario actualizado exitosamente");
      router.push(`/user/show/${id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 text-xl">Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="surname1" className="block text-gray-700 font-medium mb-2">
            Primer Apellido
          </label>
          <input
            type="text"
            id="surname1"
            name="surname1"
            value={user.surname1}
            onChange={(e) => setUser({ ...user, surname1: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="surname2" className="block text-gray-700 font-medium mb-2">
            Segundo Apellido
          </label>
          <input
            type="text"
            id="surname2"
            name="surname2"
            value={user.surname2}
            onChange={(e) => setUser({ ...user, surname2: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 hover:underline"
          >
            ¿Quieres cambiar la contraseña?
          </button>
        </div>
      </form>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user} // Pasar los datos del usuario al modal
        onSubmit={handlePasswordChange} // Maneja el envío
      />
    </>
  );
};

export default EditUserForm;