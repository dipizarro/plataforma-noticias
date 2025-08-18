import type { Metadata } from "next";
import CategoryPageClient from "@/../app/category/[category]/page/[page]/CategoryPageClient";

export async function generateMetadata({
  params,
}: {
  params: { category: string; page: string };
}): Promise<Metadata> {
  const category = decodeURIComponent(params.category);

  return {
    title: `Noticias de ${category} – Página ${params.page}`,
    description: `Explora noticias resumidas y traducidas de la categoría ${category}. Página ${params.page}.`,
  };
}

export default function Page() {
  return <CategoryPageClient />;
}
