"use client";

import { useRouter } from "next/navigation";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
}

export default function ErrorDisplay({ 
  title = "¡Ups! Algo salió mal", 
  message = "No pudimos cargar el contenido que solicitaste. Por favor, intenta de nuevo.",
  showRetry = true,
  showHome = true,
  onRetry
}: ErrorDisplayProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-96">
      <div className="text-center max-w-md mx-auto p-6">
        {/* Icono de error */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Título y mensaje */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{message}</p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && (
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium"
            >
              Intentar de nuevo
            </button>
          )}
          
          {showHome && (
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Ir al inicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
