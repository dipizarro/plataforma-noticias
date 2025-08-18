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
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
