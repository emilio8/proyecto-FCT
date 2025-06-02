"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Songs/Song";
import { useRouter, useParams } from "next/navigation";

const UserSongsList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID del usuario logueado desde la URL

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No se encontró el token de autenticación.");
        }

        const response = await fetch("http://localhost:8000/api/songs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las canciones.");
        }

        const data: Song[] = await response.json();
        // Filtrar canciones por userId
        const userSongs = data.filter((song) => song.user_id === parseInt(id));

        setSongs(userSongs);
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
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600 text-xl">Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (songs.length === 0) {
    return <div className="text-center text-gray-600">No tienes canciones subidas.</div>;
  }
return (
  <div className="flex justify-center">
    <div
      className={`${
        songs.length === 1
          ? "flex justify-center items-center"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      } p-6`}
    >
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="w-full h-100 relative">
            <img
              src={`http://localhost:8000/storage/${song.image}`}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{song.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{song.description}</p>
            <audio controls className="w-full mb-4">
              <source src={`http://localhost:8000/storage/${song.file}`} type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => router.push(`/songs/show/${song.id}`)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Ver más detalles
              </button>
              <button
                onClick={() => router.push(`/songs/edit/${song.id}`)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Editar canción
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
export default UserSongsList;