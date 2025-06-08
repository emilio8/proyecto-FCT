"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Songs/Song";
import { useRouter, useParams } from "next/navigation";
import Skeleton from "../Skeleton";
import SongFilter from "@/components/Songs/SongsFilter";
import SongSearch from "@/components/Songs/SongSearch";
import SongOrder from "@/components/Songs/SongOrder";
import { useSongFilter } from "@/hooks/useSongFilter";
import { useSongOrder } from "@/hooks/useSongOrder";

const UserSongsList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID del usuario logueado desde la URL

  // Hook de filtrado
  const {
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    users,
    filteredSongs,
  } = useSongFilter(songs);

  // Hook de ordenamiento - aplicado a las canciones ya filtradas
  const {
    sortOption,
    setSortOption,
    sortedSongs,
  } = useSongOrder(filteredSongs);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token) {
          throw new Error("No se encontró el token de autenticación.");
        }
        
        // Verificar si el ID de la URL coincide con el userId del localStorage
        if (parseInt(id || "0", 10) !== parseInt(userId || "0", 10)) {
          alert("No tienes permiso para acceder a esta página.");
          router.push("/"); // Redirigir al inicio
          return;
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
        const userSongs = data.filter((song) => song.user_id === parseInt(id as string));

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
  }, [id, router]);

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

  if (songs.length === 0) {
    return <div className="text-center text-gray-600">No tienes canciones subidas.</div>;
  }

  return (
    <div className="flex flex-col mt-4 items-center px-4">
      {/* Contenedor de filtros y controles */}
      <div className="w-full max-w-6xl mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Filtro */}
          <div className="flex gap-2">
            <SongFilter
              selectedUser={selectedUser}
              onUserChange={setSelectedUser}
              users={users}
            />
          </div>
          {/* Barra de búsqueda */}
          <div className="flex-1">
            <SongSearch
              onSearch={setSearchQuery}
              placeholder="Buscar por título o creador..."
            />
          </div>
          {/* Ordenamiento */}
          <div>
            <SongOrder
              onSortChange={setSortOption}
              currentSort={sortOption}
            />
          </div>
        </div>
      </div>

      {/* Mensaje cuando no hay resultados */}
      {sortedSongs.length === 0 && !loading && (
        <div className="text-center text-gray-500 text-lg mt-3 mb-6 w-full">
          No se encontraron canciones que coincidan con los filtros seleccionados.
        </div>
      )}

      {/* Grid de canciones - Ancho completo */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSongs.map((song) => (
            <div
              key={song.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full h-150 relative">
                <img
                  src={`http://localhost:8000/storage/${song.image}`}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {song.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {song.description}
                </p>
                <audio controls className="w-full mb-3 h-8">
                  <source src={`http://localhost:8000/storage/${song.file}`} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
                <p className="text-gray-700 text-sm mb-2">
                  Esta canción ha sido creada por <span className="font-bold">{song.user.name ?? "Desconocido"}</span>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => router.push(`/songs/show/${song.id}`)}
                    className="bg-gray-800 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Ver más detalles
                  </button>
                  <button
                    onClick={() => router.push(`/songs/edit/${song.id}`)}
                    className="bg-gray-800 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Editar canción
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSongsList;