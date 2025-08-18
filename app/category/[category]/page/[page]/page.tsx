import type { Metadata } from "next";
import CategoryPageClient from "@/../app/category/[category]/page/[page]/CategoryPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}): Promise<Metadata> {
  const { category, page } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `Noticias de ${decodedCategory} – Página ${page}`,
    description: `Explora noticias resumidas y traducidas de la categoría ${decodedCategory}. Página ${page}.`,
  };
}

export default function Page() {
  return <CategoryPageClient />;
}
