import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div className="flex space-x-4">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
        <Link href="/songs/create" className="hover:underline">
          Crear Canción
        </Link>
        <Link href="/perfil" className="hover:underline">
          Perfil
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;