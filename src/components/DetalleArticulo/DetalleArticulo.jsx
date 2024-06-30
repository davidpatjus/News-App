import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SimilarArticles from '../SimilarArticles/SimilarArticles';
import { ThemeContext } from '../../ThemeContext'; // Importar el contexto de tema

const DetalleArticulo = ({ article }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Consumir el contexto de tema

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  const shareArticle = () => {
    if (!navigator.share) {
      console.log('La función de compartir no está soportada en este navegador.');
      return;
    }

    if (!article.title || !article.url) {
      console.error('No se puede compartir el artículo porque falta información.');
      return;
    }

    navigator.share({
      title: article.title,
      text: article.title,
      url: article.url,
    }).then(() => console.log('Artículo compartido con éxito.')).catch((error) => console.error('Error al compartir:', error));
  };

  const limiteTexto = (texto, limite) => {
    if (!texto) {
      return '';
    }
    return texto.length > limite ? texto.slice(0, limite) + '...' : texto;
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={`relative ${theme === 'dark' ? 'dark' : 'light'}`}> {/* Aplicar clase condicional para el tema */}
      <button onClick={handleClose} className={`absolute top-8 right-8 text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-700'} hover:text-gray-900 z-10 bg-red-500 px-4 rounded-lg shadow-lg`}>
        Cerrar
      </button>
      <div className={`max-w-3xl mx-auto p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        {article.image && (
          <div className="mb-4">
            <img src={article.image} alt={article.title} className="w-full h-auto rounded-lg object-cover" style={{ aspectRatio: '16/9' }} />
          </div>
        )}
        <p className="text-gray-600">{limiteTexto(article.body, 300)}</p>
        <div className="flex items-center mt-3">
          <span className="text-gray-500">{article.date} - {article.time}</span>
          <span className="ml-4 bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{article.lang}</span>
        </div>
        <div className="mt-4">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Leer artículo completo</a>
        </div>
        <div className="mt-4">
          <button onClick={shareArticle} className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${theme === 'dark' ? 'dark:bg-blue-500 dark:hover:bg-blue-600' : ''}`}>
            Compartir artículo
          </button>
        </div>
      </div>

      <SimilarArticles currentArticle={article} />
    </div>
  );
};

DetalleArticulo.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    lang: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default DetalleArticulo;
