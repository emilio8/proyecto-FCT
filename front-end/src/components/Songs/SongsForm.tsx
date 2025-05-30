"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa el hook useRouter
import { SongCreate } from "@/types/Songs/SongsCreate";

const SongsForm = () => {
  const [form, setForm] = useState<SongCreate>({
    title: "",
    image: null,
    file: null,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); // Inicializa el hook useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "image" || name === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("title", form.title);
    if (form.image) formData.append("image", form.image);
    if (form.file) formData.append("file", form.file);
    if (form.description) formData.append("description", form.description);

    try {
      const token = localStorage.getItem("authToken"); // Recupera el token del almacenamiento local
      await fetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" });

      const xsrfToken = getCookie("XSRF-TOKEN");

      const response = await fetch("http://localhost:8000/api/songs", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": xsrfToken ? decodeURIComponent(xsrfToken) : "",
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado Authorization
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear la canción");
      }

      const data = await response.json(); // Obtén los datos de la canción creada
      setSuccess("Canción creada correctamente");
      setForm({ title: "", image: null, file: null, description: "" });

      router.push(`/songs/show/${data.id}`); // Redirige al show de la canción creada
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Crear Canción</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        type="file"
        name="file"
        accept="audio/*"
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Crear Canción
      </button>
    </form>
  );
};

export default SongsForm;