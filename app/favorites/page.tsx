"use client";

import { useFavorites } from "@/app/contexts/FavoritesContext";
import NewsCard from "@/app/components/NewsCard";
import EmptyState from "@/app/components/EmptyState";

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Mis Favoritos ❤️
        </h1>
        <EmptyState
          title="No tienes favoritos aún"
          message="Los artículos que marques como favoritos aparecerán aquí. ¡Explora las noticias y guarda las que más te interesen!"
          showSearch={true}
          showCategories={true}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Mis Favoritos ❤️
        </h1>
        <button
          onClick={clearFavorites}
          className="px-6 py-3 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors font-semibold shadow-sm hover:shadow-md"
        >
          Limpiar favoritos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
          />
        ))}
      </div>
    </div>
  );
}
