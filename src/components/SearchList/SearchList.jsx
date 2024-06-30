import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useGetArticlesQuery } from '../../api/API';
import { ThemeContext } from '../../ThemeContext'; // Importar el contexto de tema

const SearchList = ({ isLoading, isError }) => {
  const { theme } = useContext(ThemeContext); // Obtener el tema actual del contexto
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allArticles = { articles: { results: [], totalResults: 0 } }, error: articlesError, isLoading: articlesLoading, refetch } = useGetArticlesQuery({
    keyword: searchTerm ? searchTerm : 'all',
    articlesPage: currentPage,
    articlesCount: articlesPerPage,
    lang: "eng",
    articlesSortBy: "relevance",
    articlesSortByAsc: false,
    resultType: "articles",
    forceMaxDataTimeWindow: 31,
  });

  // Llamar a refetch cada vez que cambie currentPage, articlesPerPage o searchTerm
  useEffect(() => {
    refetch();
  }, [currentPage, articlesPerPage, searchTerm, refetch]);

  // Resetear la página actual al cambiar los artículos por página
  useEffect(() => {
    setCurrentPage(1);
  }, [articlesPerPage]);

  const handleArticlesPerPageChange = (e) => {
    const newArticlesPerPage = parseInt(e.target.value);
    setArticlesPerPage(newArticlesPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  // Función para truncar el texto del artículo
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  // Calcular los índices de los artículos a mostrar en la página actual
  const indexOfLastArticle = Math.min(currentPage * articlesPerPage, allArticles.articles.results.length);
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = allArticles.articles.results.slice(indexOfFirstArticle, indexOfLastArticle);

  // Renderizado de la lista de artículos
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Resultados de búsqueda</h2>

      {/* Barra de búsqueda */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          id="search"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-64"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Selector de cantidad de artículos por página */}
      <div className="mb-4 flex justify-center">
        <select
          id="articlesPerPage"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" 
          value={articlesPerPage}
          onChange={handleArticlesPerPageChange}
        >
          {[3, 6, 9, 12, 15].map((option) => (
            <option key={option} value={option}>
              Mostrar {option} por página
            </option>
          ))}
        </select>
      </div>

      {/* Lista de artículos */}
      <ul className="divide-y divide-gray-200">
        {currentArticles.map((article) => (
          <li key={article.uri} className="py-4 flex items-center">
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-36 h-24 object-cover rounded-md"
              />
            )}
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600 mt-2">{truncateText(article.body, 150)}</p>
              <div className="flex items-center mt-3">
                <span className="text-gray-500">
                  {article.date} - {article.time}
                </span>
                <span className="ml-4 bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  {article.lang}
                </span>
              </div>
              <p className="mt-2">
                <Link to={`/article/${article.uri}`} className="text-blue-500 hover:underline">Leer más</Link>
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
          >
            Anterior
          </button>
          <span className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Página {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(allArticles.articles.totalResults / articlesPerPage) || allArticles.articles.totalResults === 0}
            className={`bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage === Math.ceil(allArticles.articles.totalResults / articlesPerPage) || allArticles.articles.totalResults === 0 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
          >
            Siguiente
          </button>
        </nav>
      </div>
    </div>
  );
};

SearchList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default SearchList;
