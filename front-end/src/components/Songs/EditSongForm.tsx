"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { SongCreate } from "@/types/Songs/SongsCreate";

const EditSongForm = () => {
  const [form, setForm] = useState<SongCreate>({
    title: "",
    image: null,
    file: null,
    description: "",
  });
  const [existingImage, setExistingImage] = useState<string | null>(null); // URL de la imagen existente
  const [existingFile, setExistingFile] = useState<string | null>(null); // URL del archivo existente
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Obtiene el parámetro `id` de la URL dinámica

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:8000/api/songs/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar la canción");
        }

        const data = await response.json();

        // Verificar si el usuario autenticado es el propietario
        const loggedInUserId = localStorage.getItem("userId");
        if (data.user_id !== parseInt(loggedInUserId || "0", 10)) {
          alert("No puedes editar canciones que no son tuyas.");
          router.push("/"); // Redirigir al inicio
          return;
        }
        setForm({
          title: data.title,
          image: null, // No cargamos el archivo directamente
          file: null, // No cargamos el archivo directamente
          description: data.description,
        });
        setExistingImage(`${data.image}`); // URL de la imagen existente
        setExistingFile(`${data.file}`); // URL del archivo existente
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    if (id) {
      fetchSong();
    }
  }, [id]);

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

      const response = await fetch(`http://localhost:8000/api/songs/${id}`, {
        method: "POST", // Cambia a "PUT" si tu backend usa este método para actualizar
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": xsrfToken ? decodeURIComponent(xsrfToken) : "",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al actualizar la canción");
      }

      setSuccess("Canción actualizada correctamente");
      router.push(`/songs/show/${id}`); // Redirige a la lista de canciones
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 text-xl">Cargando datos de la canción...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Canción</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}
      <div>
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
      {existingImage && (
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Imagen actual:</p>
          <img src={existingImage} alt="Imagen actual" className="w-full h-80 object-cover rounded-lg" />
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
          Cambiar imagen
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
      {existingFile && (
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Archivo de audio actual:</p>
          <audio controls className="w-full">
            <source src={existingFile} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
          Cambiar archivo de audio
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="audio/*"
          onChange={handleChange}
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
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Actualizar Canción
      </button>
    </form>
  );
};

export default EditSongForm;