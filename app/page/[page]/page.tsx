"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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

async function getNews(): Promise<{ articles: Article[] }> {
  const res = await fetch("http://localhost:3000/api/news");
  if (!res.ok) throw new Error("Error al obtener las noticias");
  return res.json();
}

async function summarizeText(text: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:3000/api/summarize", {
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

export default function PaginatedNews() {
  const params = useParams();
  const page = parseInt((params.page as string) || "1");
  const articlesPerPage = 6;

  const [newsData, setNewsData] = useState<Article[]>([]);
  const [translations, setTranslations] = useState<{ [key: number]: { title: string; description: string } }>({});
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNews();
      const total = Math.ceil(data.articles.length / articlesPerPage);
      setTotalPages(total);

      if (page > total || page < 1) return;

      const start = (page - 1) * articlesPerPage;
      const end = start + articlesPerPage;
      const currentArticles = data.articles.slice(start, end);
      setNewsData(currentArticles);

      const summariesData = await Promise.all(
        currentArticles.map((article) =>
          summarizeText(article.description || article.title)
        )
      );

      const summariesMap = summariesData.reduce<{ [key: number]: string }>((acc, summary, i) => {
        acc[i] = summary;
        return acc;
      }, {});

      setSummaries(summariesMap);
    };

    fetchData();
  }, [page]);

  const translateArticle = async (index: number, title: string, description: string | undefined) => {
    setLoading((prev) => ({ ...prev, [index]: true }));

    const textToTranslate = `${title}. ${description || ""}`;

    try {
      const res = await fetch("http://localhost:3000/api/translate", {
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
    router.push(`/page/${newPage}`);
  };

  if (page > totalPages || page < 1) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        Página no encontrada 😢
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">📰 Últimas Noticias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((article, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {article.urlToImage ? (
              <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-md mb-4" />
            ) : (
              <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-gray-600">Sin imagen</span>
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {translations[index] ? translations[index].title : article.title}
            </h2>
            <p className="text-gray-600">
              {translations[index] ? translations[index].description : summaries[index] || "Generando resumen..."}
            </p>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => translateArticle(index, article.title, summaries[index])}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                disabled={loading[index]}
              >
                {loading[index] ? "Traduciendo..." : translations[index] ? "Ver original" : "Traducir"}
              </button>

              <a href={article.url} target="_blank" className="text-blue-500 hover:underline">Leer más →</a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        {page > 1 && (
          <button onClick={() => goToPage(page - 1)} className="text-blue-600 hover:underline">
            ← Página anterior
          </button>
        )}
        <span className="font-medium">Página {page} de {totalPages}</span>
        {page < totalPages && (
          <button onClick={() => goToPage(page + 1)} className="text-blue-600 hover:underline">
            Página siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
