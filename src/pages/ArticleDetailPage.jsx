import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DetalleArticulo from '../components/DetalleArticulo/DetalleArticulo';
import { useGetArticleByIdQuery } from '../api/API';
import { ThemeContext } from '../ThemeContext'; // Ajusta la importación según la ubicación de tu contexto de tema

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { data: articleData, error, isLoading } = useGetArticleByIdQuery(id);
  const [article, setArticle] = useState(null);
  const { theme } = useContext(ThemeContext); // Obtener el estado actual del tema desde el contexto

  useEffect(() => {
    if (articleData) {
      // Accedemos a articleData.info ya que el resultado probablemente es { id: { info: { ... } } }
      setArticle(articleData[id]?.info || null);
    }
  }, [articleData]);

  if (isLoading) {
    return <div className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Cargando artículo...</div>;
  }

  if (error || !article) {
    return <div className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Error al cargar el artículo</div>;
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <DetalleArticulo article={article} />
    </div>
  );
};

export default ArticleDetailPage;
