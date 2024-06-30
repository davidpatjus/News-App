import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useGetArticlesQuery } from '../../api/API'; // Ajusta la importación según la ubicación de tu archivo API
import { ThemeContext } from '../../ThemeContext'; // Importa el contexto de tema

const SimilarArticles = ({ currentArticle }) => {
  const { theme } = useContext(ThemeContext); // Obtén el tema actual del contexto

  // Verifica si currentArticle o currentArticle.source.title están definidos
  if (!currentArticle || !currentArticle.source || !currentArticle.source.title) {
    return (
      <div className={`mt-8 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <h3 className="text-xl font-semibold mb-4">Noticias Similares</h3>
        <div className="text-gray-500">No se encontraron artículos similares.</div>
      </div>
    );
  }

  // Si currentArticle y currentArticle.source.title están definidos, procede con la consulta
  const { data: articlesData, error, isLoading } = useGetArticlesQuery({
    action: "getArticles",
    keyword: currentArticle.source.title, // Ajusta según tus necesidades de búsqueda
    keywordOper: "or", // Ajusta según tus necesidades de búsqueda
    articlesPage: 10,
    lang: "eng",
    articlesCount: 12, // Cantidad de artículos que deseas obtener
    dataType: "news",
    articlesSortBy: "relevance", // Ordena por relevancia
    articlesSortByAsc: false, // Orden descendente
    resultType: "articles",
    forceMaxDataTimeWindow: 31,
  });

  if (isLoading) {
    return <div className={`text-center my-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Cargando artículos similares...</div>;
  }

  if (error) {
    return <div className={`text-center my-8 text-red-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Error al cargar artículos similares: {error.message}</div>;
  }

  // Filtrar artículos relevantes
  const filteredArticles = articlesData?.articles?.results.filter(article => article.relevance > 0);

  return (
    <div className={`mt-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h3 className="text-xl font-semibold mb-4">Noticias Similares</h3>
      <div className="overflow-x-auto whitespace-no-wrap">
        <div className="flex space-x-4 p-4">
          {filteredArticles && filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.uri} className={`w-64 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-md`}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block mb-2">
                  <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg" />
                </a>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold hover:text-blue-500 truncate">{article.title}</a>
                <p className="text-gray-600 line-clamp-3 mt-2">{article.body}</p>
                <div className="flex items-center mt-3">
                  <span className="text-gray-500">{article.date} - {article.time}</span>
                  <span className="ml-4 bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{article.lang}</span>
                </div>
              </div>
            ))
          ) : (
            <div className={`text-gray-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>No se encontraron artículos similares.</div>
          )}
        </div>
      </div>
    </div>
  );
};

SimilarArticles.propTypes = {
  currentArticle: PropTypes.object.isRequired,
};

export default SimilarArticles;
