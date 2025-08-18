"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/../app/components/LoadingSpinner";

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

async function translateText(text: string): Promise<string> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Traducción fallida:", data);
      if (data?.error) return `⚠️ ${data.error}`;
      return text;
    }

    return data.translatedText;
  } catch (error) {
    console.error("❌ Error inesperado:", error);
    return "⚠️ Error inesperado al traducir";
  }
}


export default function CategoryPageClient() {
  const { category, page } = useParams();
  const router = useRouter();

  const searchCategory = decodeURIComponent(category as string);
  const currentPage = parseInt((page as string) || "1");
  const articlesPerPage = 6;

  const [articles, setArticles] = useState<Article[]>([]);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [translations, setTranslations] = useState<{
    [key: number]: { title: string; description: string };
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/news?category=${searchCategory}`);
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

        const summariesMap = summariesData.reduce<{ [key: number]: string }>(
          (acc, summary, i) => {
            acc[i] = summary;
            return acc;
          },
          {}
        );

        setSummaries(summariesMap);

        const translatedData = await Promise.all(
          pageArticles.map(async (article: Article, i: number) => {
            const title = await translateText(article.title);
            const description = await translateText(summariesMap[i]);
            return { title, description };
          })
        );

        const translationsMap = translatedData.reduce<{
          [key: number]: { title: string; description: string };
        }>((acc, translated, i) => {
          acc[i] = translated;
          return acc;
        }, {});

        setTranslations(translationsMap);
      } catch (err) {
        console.error("❌ Error al cargar noticias:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, page]);

  const goToPage = (newPage: number) => {
    router.push(`/category/${searchCategory}/page/${newPage}`);
  };

  if (isLoading) return <LoadingSpinner message="Cargando noticias..." />;

  if (currentPage > totalPages || currentPage < 1) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        Página no encontrada 😢
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Resultados para la categoría: <span className="text-blue-600">{searchCategory}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-gray-600">Sin imagen</span>
              </div>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {translations[index]?.title || article.title}
            </h2>
            <p className="text-gray-600">
              {translations[index]?.description || summaries[index] || "Generando resumen..."}
            </p>

            <div className="flex justify-end mt-4">
              <a
                href={article.url}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Leer más →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        {currentPage > 1 && (
          <button onClick={() => goToPage(currentPage - 1)} className="text-blue-600 hover:underline">
            ← Página anterior
          </button>
        )}
        <span className="font-medium">
          Página {currentPage} de {totalPages}
        </span>
        {currentPage < totalPages && (
          <button onClick={() => goToPage(currentPage + 1)} className="text-blue-600 hover:underline">
            Página siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
