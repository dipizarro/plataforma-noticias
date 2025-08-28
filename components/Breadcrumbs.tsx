"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Función para generar breadcrumbs basado en la ruta
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(segment => segment !== '');
    
    if (segments.length === 0) {
      return [{ label: 'Inicio', href: '/', active: true }];
    }

    const breadcrumbs = [{ label: 'Inicio', href: '/', active: false }];
    
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Mapear segmentos a etiquetas legibles y rutas correctas
      let label = segment;
      let href = currentPath;
      
      if (segment === 'category') {
        label = 'Categorías';
        href = '/'; // Las categorías están en la página principal
      } else if (segment === 'search') {
        label = 'Búsqueda';
        // Mantener la ruta actual para búsqueda
      } else if (segment === 'page') {
        return; // Saltar el segmento 'page'
      } else if (segments[index - 1] === 'category' && segment !== 'page') {
        // Decodificar el nombre de la categoría y crear ruta correcta
        label = decodeURIComponent(segment);
        href = `/category/${segment}/page/1`; // Ruta completa a página 1
      } else if (segments[index - 1] === 'search' && segment !== 'page') {
        // Decodificar el término de búsqueda y crear ruta correcta
        label = decodeURIComponent(segment);
        href = `/search/${segment}/page/1`; // Ruta completa a página 1
      }
      
      breadcrumbs.push({
        label,
        href,
        active: index === segments.length - 1
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // No mostrar breadcrumbs en la página principal
  }

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {breadcrumb.active ? (
                <span className="font-medium text-blue-600 dark:text-blue-400">{breadcrumb.label}</span>
              ) : (
                <Link 
                  href={breadcrumb.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
