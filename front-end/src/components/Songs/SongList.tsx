"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Songs/Song";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/skeleton";

const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("http://localhost:8000/api/songs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center text-gray-600 mb-6 text-lg">Cargando canciones...</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {songs.map((song) => (
          <div
            key={song.title}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Imagen de la canción */}
            <div className="w-full h-100 relative">
              <img
                src={`http://localhost:8000/storage/${song.image}`}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              {/* Título */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {song.title}
              </h3>
              {/* Descripción */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {song.description}
              </p>
              {/* Reproductor de audio */}
              <audio controls className="w-full mb-4">
                <source
                  src={`http://localhost:8000/storage/${song.file}`}
                  type="audio/mpeg"
                />
                Tu navegador no soporta el elemento de audio.
              </audio>
              {/* Botón centrado */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => router.push(`/songs/show/${song.id}`)}
                  className="bg-gray-800 text-white px-16 py-2 text-lg rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Ver más detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;