"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SkeletonLoader from "@/../app/components/SkeletonLoader";
import ErrorDisplay from "@/../app/components/ErrorDisplay";
import EmptyState from "@/../app/components/EmptyState";
import NewsCard from "@/../app/components/NewsCard";

type Article = {
  source: { name: string };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
};

async function summarizeText(text: string): Promise<string> {
  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error("Error en la generación del resumen");

    const data = await res.json();
    return data.summary;
  } catch (error) {
    console.error("Error al generar el resumen:", error);
    return text;
  }
}

export default function SearchResultsPage() {
  const { query, page } = useParams();
  const router = useRouter();

  const searchQuery = decodeURIComponent(query as string);
  const currentPage = parseInt((page as string) || "1");
  const articlesPerPage = 6;

  const [articles, setArticles] = useState<Article[]>([]);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [translations, setTranslations] = useState<{ [key: number]: { title: string; description: string } }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      
      if (!res.ok) {
        throw new Error("No se pudieron obtener las noticias");
      }
      
      const data = await res.json();

      if (!data.articles || data.articles.length === 0) {
        setArticles([]);
        setTotalPages(1);
        return;
      }

      const total = Math.ceil(data.articles.length / articlesPerPage);
      setTotalPages(total);

      if (currentPage > total || currentPage < 1) return;

      const start = (currentPage - 1) * articlesPerPage;
      const end = start + articlesPerPage;
      const pageArticles = data.articles.slice(start, end);

      setArticles(pageArticles);

      const summariesData = await Promise.all(
        pageArticles.map((article: Article) =>
          summarizeText(article.description || article.title)
        )
      );

      const summariesMap = summariesData.reduce<{ [key: number]: string }>((acc, summary, i) => {
        acc[i] = summary;
        return acc;
      }, {});

      setSummaries(summariesMap);
    } catch (error) {
      console.error("❌ Error al cargar noticias:", error);
      setError("No se pudieron cargar las noticias. Verifica tu conexión a internet e intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage]);

  const translateArticle = async (index: number, title: string, description: string | undefined) => {
    setLoading((prev) => ({ ...prev, [index]: true }));

    const textToTranslate = `${title}. ${description || ""}`;

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToTranslate }),
      });

      if (!res.ok) throw new Error("Error en la traducción");

      const data = await res.json();
      const translatedParts = data.translatedText.split(". ");

      setTranslations((prev) => ({
        ...prev,
        [index]: {
          title: translatedParts[0] || title,
          description: translatedParts.slice(1).join(". ") || description || "",
        },
      }));
    } catch (error) {
      console.error("Error en la traducción:", error);
    }

    setLoading((prev) => ({ ...prev, [index]: false }));
  };

  const goToPage = (newPage: number) => {
    router.push(`/search/${encodeURIComponent(searchQuery)}/page/${newPage}`);
  };

  // Manejo de errores
  if (error) {
    return (
      <ErrorDisplay
        title="Error al cargar noticias"
        message={error}
        onRetry={fetchData}
      />
    );
  }

  // Manejo de páginas inválidas
  if (currentPage > totalPages || currentPage < 1) {
    return (
      <ErrorDisplay
        title="Página no encontrada"
        message="La página que buscas no existe. Verifica la URL e intenta de nuevo."
        showRetry={false}
      />
    );
  }

  // Estado de carga
  if (isLoading) {
    return <SkeletonLoader count={6} />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Resultados de búsqueda: <span className="text-blue-600 dark:text-blue-400">{searchQuery}</span>
      </h1>

      {articles.length === 0 ? (
        <EmptyState 
          title="No se encontraron noticias"
          message={`No encontramos noticias para "${searchQuery}". Intenta con otros términos de búsqueda o explora nuestras categorías.`}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                showTranslation={!!translations[index]}
                translation={translations[index]}
                onTranslate={() => translateArticle(index, article.title, summaries[index])}
                isTranslating={loading[index]}
              />
            ))}
          </div>

          {/* Navegación mejorada */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
            {currentPage > 1 && (
              <button 
                onClick={() => goToPage(currentPage - 1)} 
                className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all font-medium shadow-sm hover:shadow-md min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Anterior</span>
              </button>
            )}
            
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Página</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{currentPage}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">de</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{totalPages}</span>
            </div>
            
            {currentPage < totalPages && (
              <button 
                onClick={() => goToPage(currentPage + 1)} 
                className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all font-medium shadow-sm hover:shadow-md min-h-[44px]"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
