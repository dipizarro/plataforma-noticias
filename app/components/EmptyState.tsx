"use client";

import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  message?: string;
  showSearch?: boolean;
  showCategories?: boolean;
}

export default function EmptyState({ 
  title = "No se encontraron resultados", 
  message = "No pudimos encontrar noticias que coincidan con tu búsqueda. Intenta con otros términos o explora nuestras categorías.",
  showSearch = true,
  showCategories = true
}: EmptyStateProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-96">
      <div className="text-center max-w-md mx-auto p-6">
        {/* Icono de búsqueda vacía */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Título y mensaje */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{message}</p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showSearch && (
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium"
            >
              Buscar noticias
            </button>
          )}
          
          {showCategories && (
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Explorar categorías
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
