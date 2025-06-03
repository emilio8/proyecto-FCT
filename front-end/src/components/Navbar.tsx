"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from '@/components/Header';
import router from "next/router";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          // Redirigir al usuario a /login si no está autenticado
          router.push("/login");
          return;
        }

        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener el ID del usuario");
        }

        const data = await response.json();
        setUserId(data.id); // Asume que el backend devuelve un objeto con el ID del usuario

        // Almacena el ID del usuario en localStorage
        localStorage.setItem("userId", data.id);

      } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <><Header /><nav className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      {/* Enlaces de navegación izquierda */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Inicio
        </Link>
        <Link href="/songs/create" className="hover:text-gray-300 transition-colors">
          Crear Canción
        </Link>
        <Link href={`/songs/user/${userId}`} className="hover:text-gray-300 transition-colors">
          Mis Canciones
        </Link>
      </div>

      {/* Enlace de perfil alineado a la derecha */}
      <div>
        {userId ? (
          <Link
            href={`/user/show/${userId}`}
            className="hover:text-gray-300 transition-colors"
          >
            Perfil
          </Link>
        ) : (
          <span className="text-gray-500">Cargando...</span>
        )}
      </div>
    </nav></>
  );
};

export default Navbar;