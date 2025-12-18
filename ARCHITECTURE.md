# Arquitectura del Proyecto

## Visión General
Este proyecto es una plataforma de noticias construida con Next.js 15, React 19 y TypeScript. Utiliza Tailwind CSS para los estilos e integra APIs de noticias externas.

## Estructura de Directorios

```
/
├── app/                  # Código fuente principal de la aplicación (App Router)
│   ├── category/         # Páginas de categorías dinámicas
│   ├── components/       # Componentes específicos de páginas
│   ├── contexts/         # Proveedores de Contexto React (Tema, Favoritos)
│   ├── favorites/        # Página de favoritos
│   ├── search/           # Páginas de resultados de búsqueda
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Página de inicio
├── components/           # Componentes de UI compartidos (Encabezado, Pie de página, etc.)
├── lib/                  # Funciones de utilidad y clientes de API
├── public/               # Activos estáticos
└── ...archivos de config # Next.js, Tailwind, ESLint, TSConfig
```

## Tecnologías Clave
- **Framework**: Next.js 15 (App Router)
- **Librería de UI**: React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Gestión de Estado**: React Context API
- **Destino de despliegue**: Azure Static Web Apps

## Flujo de Datos
- **Peticiones API**: Manejadas vía server components o `fetch` del lado del cliente en hooks `UseEffect` (dependiendo de las necesidades de interactividad).
- **Estado**:
    - `ThemeContext`: Gestiona el modo oscuro/claro.
    - `FavoritesContext`: Gestiona los artículos guardados usando `localStorage`.
