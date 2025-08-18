import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("🔍 API de noticias ejecutándose...");

  const API_KEY = process.env.NEWS_API_KEY;
  const url = new URL(request.url);

  const category = url.searchParams.get("category");
  const query = url.searchParams.get("q");

  // Construir la URL base
  const baseUrl = new URL("https://newsapi.org/v2/top-headlines");
  baseUrl.searchParams.set("apiKey", API_KEY || "");
  baseUrl.searchParams.set("country", "us");

  if (category) {
    baseUrl.searchParams.set("category", category);
  }

  if (query) {
    baseUrl.searchParams.delete("country"); // No se permite con `q`
    baseUrl.pathname = "/v2/everything";
    baseUrl.searchParams.set("q", query);
    baseUrl.searchParams.set("sortBy", "publishedAt");
    baseUrl.searchParams.set("language", "es"); // Puedes ajustar a "en" si prefieres
  }

  try {
    const response = await fetch(baseUrl.toString());
    if (!response.ok) throw new Error("Error al obtener noticias");

    const data = await response.json();
    console.log("✅ Noticias obtenidas:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error en la API de noticias:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las noticias" },
      { status: 500 }
    );
  }
}
