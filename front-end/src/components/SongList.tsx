"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Songs/Song";

const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/songs");
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
    <div>
      {songs.map((song) => (
        <div key={song.title} className="song">
          <h3>{song.title}</h3>
          <img src={song.image} alt={song.title} />
            <audio controls>
            <source src={song.file} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
            </audio>
          <p>{song.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SongList;