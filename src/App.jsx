import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TopHeadlines from './components/topHeadlines/topHeadlines'; // Ajusta la ruta adecuadamente
import SearchList from './components/SearchList/SearchList'; // Ajusta la ruta adecuadamente
import ArticleDetailPage from './pages/ArticleDetailPage';
import { ThemeProvider } from './ThemeContext'; // Importar el proveedor de tema

function App() {
  return (
    <Router>
      {/* Envolver toda la aplicación con el ThemeProvider */}
      <ThemeProvider> 
        <div className="App">
          <Navbar />
          <Routes>
            {/* Ruta para mostrar las principales noticias */}
            <Route path="/" element={<TopHeadlines />} />

            {/* Ruta para mostrar la lista de búsqueda */}
            <Route path="/search" element={<SearchList />} />

            {/* Ruta para mostrar los detalles de un artículo específico */}
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            
            {/* 
              Asegúrate de que 'articles' se pase correctamente como un array a SearchList y DetalleArticulo.
              Agrega más rutas según sea necesario.
            */}

          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
