"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" });

      const xsrfToken = getCookie("XSRF-TOKEN");

      const response = await fetch("http://localhost:8000/api/songs", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": xsrfToken ? decodeURIComponent(xsrfToken) : "",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear la canción");
      }

      const data = await response.json();
      setSuccess("Canción creada correctamente");
      setForm({ title: "", image: null, file: null, description: "" });

      router.push(`/songs/show/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear Canción</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Imagen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
            Archivo de Audio
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="audio/*"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Crear Canción
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongsForm;