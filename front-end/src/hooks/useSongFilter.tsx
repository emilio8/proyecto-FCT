import { useState, useMemo } from "react";
import { Song } from "@/types/Songs/Song";

export const useSongFilter = (songs: Song[]) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  // Obtener lista única de usuarios
  const users = useMemo(() => {
    const uniqueUsers = Array.from(
      new Set(songs.map(song => song.user?.name).filter(Boolean))
    );
    return uniqueUsers.sort();
  }, [songs]);

  const filteredSongs = useMemo(() => {
    let filtered = songs;

    // Filtrar por usuario seleccionado en el dropdown
    if (selectedUser) {
      filtered = filtered.filter(song => song.user?.name === selectedUser);
    }

    // Filtrar por búsqueda (título o creador)
    if (searchQuery.trim()) {
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.user?.name && song.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [songs, searchQuery, selectedUser]);

  return {
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    users,
    filteredSongs,
  };
};