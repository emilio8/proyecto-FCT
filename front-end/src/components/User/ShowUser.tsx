"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ShowUser = () => {
  const [user, setUser] = useState({
    name: "",
    surname1: "",
    surname2: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); // Obtiene el ID del usuario desde la URL
  const router = useRouter(); // Para redirigir al usuario

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

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmLogout) {
      localStorage.removeItem("authToken"); // Elimina el token de autenticación
      router.push("/login"); // Redirige a la página de inicio de sesión
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 text-xl">Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">Error: {error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Detalles del Usuario</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            <strong>Nombre:</strong> {user.name}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            <strong>Primer Apellido:</strong> {user.surname1}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            <strong>Segundo Apellido:</strong> {user.surname2 || "No especificado"}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            <strong>Correo Electrónico:</strong> {user.email}
          </p>
        </div>
      </div>
      <div className="mt-6 text-center flex justify-center gap-4">
        <button
          onClick={() => router.push(`/user/edit/${id}`)} // Redirige a la página de edición
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Editar Usuario
        </button>
        <button
          onClick={handleLogout} // Maneja el cierre de sesión
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default ShowUser;