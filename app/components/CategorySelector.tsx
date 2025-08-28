"use client";

import { useRouter } from "next/navigation";

const categories = [
  { label: "General", value: "general" },
  { label: "Tecnología", value: "technology" },
  { label: "Negocios", value: "business" },
  { label: "Entretenimiento", value: "entertainment" },
  { label: "Salud", value: "health" },
  { label: "Ciencia", value: "science" },
  { label: "Deportes", value: "sports" },
];

export default function CategorySelector() {
  const router = useRouter();

  const handleClick = (value: string) => {
    router.push(`/category/${value}/page/1`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className="px-4 py-4 sm:px-6 sm:py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl font-medium text-sm sm:text-base min-h-[60px] sm:min-h-[48px] flex items-center justify-center"
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
