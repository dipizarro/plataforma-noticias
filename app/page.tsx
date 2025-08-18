"use client";

import CategorySelector from "@/../app/components/CategorySelector";
import SearchBar from "@/../app/components/SearchBar";


export default function Home() {
  return (
    <main className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        📰 Plataforma de Noticias Inteligentes
      </h1>

      <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
        Explora noticias de diversas categorías, resumidas automáticamente con inteligencia artificial y listas para traducir al instante. ¡Actualízate sin perder tiempo!
      </p>
      <SearchBar />
      <CategorySelector />
    </main>
  );
}
