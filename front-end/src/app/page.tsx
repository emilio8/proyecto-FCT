"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import SongList from "../components/SongList";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("No autenticado");
        }
      } catch (err) {
        router.push("/login"); // Redirige al login si no está autenticado
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <main className="mt-8">
        <SongList />
      </main>
    </div>
  );
}