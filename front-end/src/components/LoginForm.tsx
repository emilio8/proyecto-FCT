"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(";").shift();
    }
  }
  return null;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Verifica si el navegador es compatible con cookies
    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) {
        throw new Error("No se pudo obtener el token CSRF");
      }

      // Realiza la solicitud de inicio de sesión
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login fallido");
      }

      if (typeof window !== "undefined") {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // Guarda el token en localStorage
      }

      if (onSuccess) onSuccess();
      else router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      <p className="mt-4 text-center">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Regístrate
        </a>
      </p>
    </div>
  );
};

export default LoginForm;