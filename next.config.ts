import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // General / Placeholders
      { protocol: "https", hostname: "images.unsplash.com" },

      // Noticias Internacional / EE.UU.
      { protocol: "https", hostname: "**.cnn.com" },
      { protocol: "https", hostname: "**.nytimes.com" },
      { protocol: "https", hostname: "**.foxnews.com" },
      { protocol: "https", hostname: "**.nbcnews.com" },
      { protocol: "https", hostname: "**.yahoo.com" },
      { protocol: "https", hostname: "**.washingtonpost.com" },
      { protocol: "https", hostname: "**.usatoday.com" },
      { protocol: "https", hostname: "**.wsj.com" },
      { protocol: "https", hostname: "**.nypost.com" },
      { protocol: "https", hostname: "**.bbc.co.uk" },
      { protocol: "https", hostname: "**.reuters.com" },

      // Tech
      { protocol: "https", hostname: "**.theverge.com" },
      { protocol: "https", hostname: "**.wired.com" },
      { protocol: "https", hostname: "**.techcrunch.com" },

      // Noticias en Español / Latam
      { protocol: "https", hostname: "**.elpais.com" },
      { protocol: "https", hostname: "**.elmundo.es" },
      { protocol: "https", hostname: "**.marca.com" },
      { protocol: "https", hostname: "**.as.com" },
      { protocol: "https", hostname: "**.infobae.com" },
      { protocol: "https", hostname: "**.clarin.com" },
      { protocol: "https", hostname: "**.lanacion.com.ar" },
      { protocol: "https", hostname: "**.eluniversal.com.mx" },
    ],
  },

};

export default nextConfig;
