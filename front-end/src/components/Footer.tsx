const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Biblioteca de canciones. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;