import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();

  const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Error en MyMemory API:", errorText);
    return NextResponse.json({ error: "Error en la API de traducción", details: errorText }, { status: 500 });
  }

  const data = await response.json();

  if (data.responseStatus === 429 || data.responseData.translatedText.includes("YOU USED ALL AVAILABLE FREE TRANSLATIONS")) {
    return NextResponse.json({ error: "Límite de traducción diaria alcanzado." }, { status: 429 });
  }

  return NextResponse.json({ translatedText: data.responseData.translatedText });
}
