# 📰 Plataforma de Noticias Inteligentes

Una aplicación web moderna desarrollada con Next.js 15 que ofrece noticias resumidas automáticamente con inteligencia artificial y traducción automática.

## 🚀 Características

- **Búsqueda de Noticias**: Integración con NewsAPI.org
- **Navegación por Categorías**: General, Tecnología, Negocios, Entretenimiento, Salud, Ciencia, Deportes
- **Resumen Automático con IA**: Utiliza el modelo BART de Hugging Face
- **Traducción Automática**: Integración con MyMemory Translation API
- **Paginación**: Navegación eficiente por grandes volúmenes de contenido
- **Diseño Responsive**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS
- **APIs**: NewsAPI.org, Hugging Face, MyMemory Translation

## 📋 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# NewsAPI.org - Para obtener noticias
NEWS_API_KEY=your_news_api_key_here

# Hugging Face - Para generar resúmenes con IA
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### Obtener las API Keys:

1. **NewsAPI.org**: Regístrate en [newsapi.org](https://newsapi.org) para obtener tu API key gratuita
2. **Hugging Face**: Regístrate en [huggingface.co](https://huggingface.co) y genera un token de acceso

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. ¡Listo! Tu aplicación se desplegará automáticamente

## 📁 Estructura del Proyecto

```
plataforma-noticias/
├── app/
│   ├── api/                 # APIs internas
│   ├── components/          # Componentes reutilizables
│   ├── category/           # Páginas de categorías
│   ├── search/             # Páginas de búsqueda
│   └── page.tsx            # Página principal
├── components/             # Componentes globales
└── public/                # Archivos estáticos
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
