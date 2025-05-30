"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type Song = {
  id: number;
  title: string;
  description: string;
  image: string;
  file: string;
};

export default function SongDetails() {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useParams();
  const id = searchParams.id; // Obtiene el parámetro `id` de la URL

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Recupera el token del almacenamiento local

        const response = await fetch(`http://localhost:8000/api/songs/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado Authorization
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("No autenticado o canción no encontrada");
        }

        const data = await response.json();
        setSong(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        router.push("/login"); // Redirige al login si no está autenticado
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSong();
    }
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <img
        src={song?.image}
        alt={song?.title}
        className="w-full h-auto object-cover rounded-md mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">{song?.title}</h1>
      <p className="text-gray-700 mb-4">{song?.description}</p>
      <audio controls className="w-full">
        <source src={song?.file} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      <div className="mt-4 flex items-center justify-between">
       <button
          onClick={() => router.push(`/songs/edit/${song?.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Editar canción
        </button>
        <button
          onClick={async () => {
            const confirmDelete = confirm("¿Estás seguro de que deseas borrar esta canción?");
            if (!confirmDelete) return;

            try {
              const token = localStorage.getItem("authToken");

              const response = await fetch(`http://localhost:8000/api/songs/${song?.id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                credentials: "include",
              });

              if (!response.ok) {
                throw new Error("Error al borrar la canción");
              }

              alert("Canción borrada exitosamente");
              router.push("/songs");
            } catch (err) {
              alert(err instanceof Error ? err.message : "Error desconocido");
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
        >
          Borrar canción
        </button>
      </div>
    </div>
  );
}