"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SongList from "@/components/SongList";
import Link from "next/link";

type Song = {
  id: number;
  title: string;
  description: string;
  image: string;
  file: string;
  // Agrega aquí otras propiedades si tu objeto canción las tiene
};

export default function SongShow() {
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        {song && (
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Imagen de la canción */}
            <img
              src={`${song.image}`}
              alt={song.title}
              className="w-full h-200 object-cover rounded-md mb-4"
            />
            {/* Título */}
            <h1 className="text-2xl font-bold mb-4">{song.title}</h1>
            {/* Descripción */}
            <p className="text-gray-700 mb-4">{song.description}</p>
            {/* Reproductor de audio */}
            <audio controls className="w-full">
              <source
                src={`${song.file}`}
                type="audio/mpeg"
              />
              Tu navegador no soporta el elemento de audio.
            </audio>
            <Link
                href={`/songs/edit/${song.id}`}
                className="text-blue-500 hover:underline"
            >
            Editar canción
            </Link>
            <p>
            <Link
                href={`/songs/delete/${song.id}`}
                className="text-blue-500 hover:underline text-aling-rigth"
                >
            Borra canción
            </Link>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}