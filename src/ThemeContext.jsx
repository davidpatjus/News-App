import React, { createContext, useState } from 'react';

// Crear un contexto para el tema
export const ThemeContext = createContext();

// Proveedor de tema que contiene el estado del tema y la función para cambiarlo
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Estado inicial del tema

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Alternar entre 'light' y 'dark'
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
