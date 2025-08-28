export default function SkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Skeleton para imagen */}
            <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
              {/* Skeleton para badges de fuente y fecha */}
              <div className="absolute top-3 left-3">
                <div className="w-16 sm:w-20 h-6 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-20 sm:w-24 h-6 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Skeleton para contenido */}
            <div className="p-4 sm:p-6">
              {/* Skeleton para título */}
              <div className="space-y-3 mb-3">
                <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              
              {/* Skeleton para descripción */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
              </div>
              
              {/* Skeleton para autor */}
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
              
              {/* Skeleton para botones */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="h-10 sm:h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-24"></div>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 sm:h-10 sm:w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-10 w-10 sm:h-10 sm:w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
