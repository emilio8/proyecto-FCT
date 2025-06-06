import { useState, useMemo, useCallback } from "react";
import { Song } from "@/types/Songs/Song";

export type SortOption =
  | "newest"
  | "oldest"
  | "title-asc"
  | "title-desc"
  | "creador-asc"
  | "creador-desc"
  | "none";

export const useSongOrder = (songs: Song[]) => {
  const [sortOption, setSortOption] = useState<SortOption>("none");

  const handleSetSortOption = useCallback((sort: SortOption) => {
    setSortOption(sort);
  }, []);

  const sortedSongs = useMemo(() => {
    if (sortOption === "none") {
      return songs;
    }

    return [...songs].sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        
        case "oldest":
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        
        case "title-asc":
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        
        case "title-desc":
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        
        case "creador-asc":
          const creadorA = a.user?.name?.toLowerCase() || "";
          const creadorB = b.user?.name?.toLowerCase() || "";
          return creadorA.localeCompare(creadorB);
        
        case "creador-desc":
          const creadorA2 = a.user?.name?.toLowerCase() || "";
          const creadorB2 = b.user?.name?.toLowerCase() || "";
          return creadorB2.localeCompare(creadorA2);
        
        default:
          return 0;
      }
    });
  }, [songs, sortOption]);

  return {
    sortOption,
    setSortOption: handleSetSortOption,
    sortedSongs,
  };
};