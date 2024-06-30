import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetArticlesQuery } from '../../api/API';
import { ThemeContext } from '../../ThemeContext'; // Importa el contexto de tema

const TopHeadlines = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(12); // Número inicial de artículos por página
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Obtén el tema actual del contexto

  const { data, error, isLoading } = useGetArticlesQuery({
    action: "getArticles",
    keyword: "", // Puedes ajustar según sea necesario
    keywordOper: "or",
    articlesPage: currentPage,
    lang: "eng",
    articlesCount: articlesPerPage,
    dataType: "news",
    articlesSortBy: "date",
    articlesSortByAsc: false,
    resultType: "articles",
    forceMaxDataTimeWindow: 31,
  });

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleArticlesPerPageChange = (value) => {
    setArticlesPerPage(value);
    setCurrentPage(1); // Resetear a la primera página al cambiar el número de artículos por página
  };

  if (isLoading) {
    return <div className={`text-center my-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Cargando...</div>;
  }

  if (error) {
    return <div className={`text-center my-8 text-red-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Error al cargar los artículos: {error.message}</div>;
  }

  // Verificar que data y data.articles estén definidos para evitar errores
  if (!data || !data.articles) {
    return <div className={`text-center my-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>No se encontraron artículos.</div>;
  }

  return (
    <div className={`flex flex-col justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} content-center items-center w-full`}>
      <h1 className={`text-7xl font-bold mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Noticias en Tendencia
      </h1>

      {/* Selector de artículos por página */}
      <div className="mb-4">
        <label htmlFor="articlesPerPage" className={`mr-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Noticias por página:</label>
        <select
          id="articlesPerPage"
          value={articlesPerPage}
          onChange={(e) => handleArticlesPerPageChange(parseInt(e.target.value))}
          className={`px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        >
          {[3, 6, 9, 12, 15].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Listado de noticias */}
      <ul className={`flex flex-wrap gap-4 content-center items-center px-20 ${theme === 'dark' ? 'dark:bg-gray-800' : ''}`}>
        {data.articles.results
          .filter(article => article.image) // Filtrar artículos que tienen imagen
          .map((item, index) => (
            <li key={`${index}-${item.title}`} className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow ${theme === 'dark' ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}>
              <a onClick={() => handleArticleClick(item.uri)}>
                <img className="rounded-t-lg" src={item.image} alt="" />
              </a>
              <div className="p-5">
                <a onClick={() => handleArticleClick(item.uri)}>
                  <h5 className={`mb-2 text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h5>
                </a>
                <p className={`mb-3 font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  {item.body.substring(0, 20)} ...
                </p>
                <a className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ${theme === 'dark' ? 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'bg-blue-700 hover:bg-blue-800'}`} onClick={() => handleArticleClick(item.uri)}>
                  Leer más
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
            </li>
          ))}
      </ul>

      {/* Paginación */}
      <div className="mt-8">
        <nav className="flex justify-center">
          <ul className="flex gap-2">
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: Math.ceil(data.articles.total / articlesPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage === index + 1 ? 'bg-blue-600' : ''}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage === Math.ceil(data.articles.total / articlesPerPage)}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage === Math.ceil(data.articles.total / articlesPerPage) ? 'bg-gray-300 cursor-not-allowed' : ''}`}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopHeadlines;
