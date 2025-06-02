"use client";

import Navbar from "../components/Navbar";
import SongList from "../components/Songs/SongList";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mt-8">
        <SongList />
      </main>
    </div>
  );
}