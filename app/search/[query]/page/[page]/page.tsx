import type { Metadata } from "next";
import SearchResultsClient from "@/../app/search/[query]/page/[page]/SearchResultsClient";

export async function generateMetadata({
  params,
}: {
  params: { query: string; page: string };
}): Promise<Metadata> {
  const searchQuery = decodeURIComponent(params.query);

  return {
    title: `Buscar: ${searchQuery} – Página ${params.page}`,
    description: `Resultados de búsqueda para "${searchQuery}", resumidos y traducidos automáticamente.`,
    openGraph: {
      title: `Buscar: ${searchQuery}`,
      description: `Explora resultados para "${searchQuery}" con IA.`,
      type: "website",
      locale: "es_CL",
    },
    twitter: {
      card: "summary_large_image",
      title: `Buscar: ${searchQuery}`,
      description: `Resultados de noticias resumidas y traducidas para "${searchQuery}".`,
    },
  };
}

export default function Page() {
  return <SearchResultsClient />;
}
