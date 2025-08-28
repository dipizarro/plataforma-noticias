"use client";

import { createContext, useContext, useEffect, useState } from 'react';

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

interface FavoritesContextType {
  favorites: Article[];
  addToFavorites: (article: Article) => void;
  removeFromFavorites: (url: string) => void;
  isFavorite: (url: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Article[]>([]);

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (article: Article) => {
    setFavorites(prev => {
      // Evitar duplicados
      if (prev.some(fav => fav.url === article.url)) {
        return prev;
      }
      return [...prev, article];
    });
  };

  const removeFromFavorites = (url: string) => {
    setFavorites(prev => prev.filter(fav => fav.url !== url));
  };

  const isFavorite = (url: string) => {
    return favorites.some(fav => fav.url === url);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
