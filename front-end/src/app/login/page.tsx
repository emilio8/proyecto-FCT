"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Función para obtener el valor de una cookie por nombre
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(';').shift();
    }
  }
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Obtener la cookie CSRF de Laravel
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      // 2. Obtener el valor del token CSRF de la cookie
      const xsrfToken = getCookie('XSRF-TOKEN');

      // 3. Hacer login con los datos y el token CSRF
      if (!xsrfToken) {
        throw new Error('No se pudo obtener el token CSRF');
      }
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': xsrfToken as string,
        },
        credentials: 'include', // Importante para enviar cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login fallido');
      }

      // Redirigir si todo va bien
      router.push('/dashboard'); // o la ruta que quieras

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Iniciar sesión</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}