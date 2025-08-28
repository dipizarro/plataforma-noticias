"use client";

import { useState } from "react";
import ArticleActions from "./ArticleActions";

interface Article {
  source: { name: string };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

interface NewsCardProps {
  article: Article;
  showTranslation?: boolean;
  translation?: { title: string; description: string };
  onTranslate?: () => void;
  isTranslating?: boolean;
}

export default function NewsCard({ 
  article, 
  showTranslation = false, 
  translation, 
  onTranslate, 
  isTranslating = false 
}: NewsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Hace menos de 1 hora";
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600">
      {/* Imagen con lazy loading y placeholder mejorado */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {article.urlToImage && !imageError ? (
          <>
            {/* Placeholder mientras carga */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sin imagen</p>
            </div>
          </div>
        )}
        
        {/* Overlay con información de la fuente */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-black/70 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {article.source.name}
          </span>
        </div>
        
        {/* Overlay con fecha */}
        <div className="absolute top-3 right-3">
          <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 sm:p-6">
        {/* Título con mejor tipografía */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {showTranslation && translation ? translation.title : article.title}
        </h2>
        
        {/* Descripción con mejor espaciado */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {showTranslation && translation 
            ? truncateText(translation.description, 150)
            : truncateText(article.description || "Sin descripción disponible", 150)
          }
        </p>

        {/* Información adicional */}
        {article.author && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
            Por: {article.author}
          </p>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {onTranslate && (
              <button
                onClick={onTranslate}
                disabled={isTranslating}
                className="px-4 py-3 sm:py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md min-h-[44px] sm:min-h-[40px]"
              >
                {isTranslating ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traduciendo...
                  </span>
                ) : (
                  showTranslation ? "Ver original" : "Traducir"
                )}
              </button>
            )}
            <ArticleActions article={article} />
          </div>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors group/link min-h-[44px] sm:min-h-auto"
          >
            Leer más
            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
