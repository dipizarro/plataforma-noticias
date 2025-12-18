import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    console.error("❌ ERROR CRÍTICO: NEWS_API_KEY no está definida en las variables de entorno.");
    return NextResponse.json(
      { error: "Error de configuración del servidor" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const query = url.searchParams.get("q");
  const page = url.searchParams.get("page") || "1";
  const pageSize = url.searchParams.get("pageSize") || "20";

  // Construir la URL base
  const baseUrl = new URL("https://newsapi.org/v2/top-headlines");
  baseUrl.searchParams.set("apiKey", API_KEY);
  baseUrl.searchParams.set("page", page);
  baseUrl.searchParams.set("pageSize", pageSize);

  if (query) {
    baseUrl.pathname = "/v2/everything";
    baseUrl.searchParams.set("q", query);
    baseUrl.searchParams.set("sortBy", "publishedAt");
    baseUrl.searchParams.set("language", "es");
  } else {
    // Top headlines logic
    baseUrl.searchParams.set("country", "us");
    if (category) {
      baseUrl.searchParams.set("category", category);
    }
  }

  try {
    // console.log(`🔍 Fetching NewsAPI: ${baseUrl.toString().replace(API_KEY, "HIDDEN_KEY")}`);
    const response = await fetch(baseUrl.toString());

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Error de NewsAPI:", response.status, errorData);
      throw new Error(`Error externo: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error en operación de noticias:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las noticias" },
      { status: 500 }
    );
  }
}
