"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Songs/Song";
import Link from "next/link";

const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Recupera el token del almacenamiento local

        const response = await fetch("http://localhost:8000/api/songs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado Authorization
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {songs.map((song) => (
        <div
          key={song.title}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          {/* Imagen de la canción */}
          <div className="w-full h-100">
            <img
              src={`http://localhost:8000/storage/${song.image}`}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            {/* Título */}
            <h3 className="text-lg font-bold mb-2">{song.title}</h3>
            {/* Descripción */}
            <p className="text-gray-700 mb-4">{song.description}</p>
            {/* Reproductor de audio */}
            <audio controls className="w-full mb-4">
              <source
                src={`http://localhost:8000/storage/${song.file}`}
                type="audio/mpeg"
              />
              Tu navegador no soporta el elemento de audio.
            </audio>
            {/* Enlace para ver más detalles */}
            <Link
              href={`/songs/show/${song.id}`}
              className="text-blue-500 hover:underline"
            >
              Ver más detalles
            </Link>
            <div>
              <Link
              href={`/songs/edit/${song.id}`}
              className="text-blue-500 hover:underline"
              >
              Editar canción
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;