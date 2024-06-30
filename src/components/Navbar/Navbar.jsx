import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext'; // Importar el contexto de tema

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`p-4 flex justify-between items-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'}`}>
      {/* Logo o título de la aplicación */}
      <Link to="/" className="text-xl font-bold">NEWS APP</Link>

      {/* Grupo de enlaces */}
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/search" className="hover:text-gray-200">Vista de Búsqueda</Link>

        {/* Selector de tema */}
        <select
          className={`bg-white border border-gray-300 rounded-md py-1 px-2 ${theme === 'dark' ? 'text-black' : 'text-gray-800'}`}
          onChange={() => toggleTheme()} // Cambiar el tema al seleccionar una opción
          value={theme} // Valor actual del tema seleccionado
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
