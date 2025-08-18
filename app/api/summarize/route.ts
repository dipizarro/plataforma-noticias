import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    console.log("📨 Texto recibido para resumir:", text);

    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) throw new Error("Error en la API de Hugging Face");

    const data = await response.json();
    const summary = data[0]?.summary_text || "No se pudo generar el resumen.";

    console.log("✅ Resumen generado:", summary);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ Error en la API de resumen:", error);
    return NextResponse.json({ error: "No se pudo generar el resumen" }, { status: 500 });
  }
}
