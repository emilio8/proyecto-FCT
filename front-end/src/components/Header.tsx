const Header = () => {
  return (
    <div className="bg-gray-800 text-white">
      <div className="flex items-center justify-center">
        <img
          src="/logo_libro_blanco.png"
          alt="Biblioteca de canciones"
          className="h-25 w-auto object-contain"
        />
        <h1 className="text-3xl font-bold">Biblioteca de Canciones</h1>
      </div>
    </div>
  );
};

export default Header;