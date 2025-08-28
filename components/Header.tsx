"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import HeaderSearch from "@/../app/components/HeaderSearch";
import { useTheme } from "@/../app/contexts/ThemeContext";
import { useFavorites } from "@/../app/contexts/FavoritesContext";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white py-4 shadow-lg transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold hover:text-blue-100 transition-colors">
          Plataforma de Noticias 🚀
        </Link>
        
        {/* Búsqueda - oculta en móviles */}
        <div className="hidden md:block">
          <HeaderSearch />
        </div>

        {/* Botón hamburguesa para móviles */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className={`hover:text-blue-100 transition-colors pb-1 border-b-2 ${
                  isActive('/') 
                    ? 'text-blue-100 border-blue-100' 
                    : 'border-transparent'
                }`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                href="/category/general/page/1" 
                className={`hover:text-blue-100 transition-colors pb-1 border-b-2 ${
                  isActive('/category') 
                    ? 'text-blue-100 border-blue-100' 
                    : 'border-transparent'
                }`}
              >
                Categorías
              </Link>
            </li>
            <li>
              <Link 
                href="/favorites" 
                className={`hover:text-blue-100 transition-colors pb-1 border-b-2 relative ${
                  isActive('/favorites') 
                    ? 'text-blue-100 border-blue-100' 
                    : 'border-transparent'
                }`}
              >
                Favoritos
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link 
                href="/contacto" 
                className={`hover:text-blue-100 transition-colors pb-1 border-b-2 ${
                  isActive('/contacto') 
                    ? 'text-blue-100 border-blue-100' 
                    : 'border-transparent'
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Toggle de tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-800 border-t border-blue-500 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            {/* Búsqueda móvil */}
            <div className="mb-4">
              <HeaderSearch />
            </div>
            
            {/* Navegación móvil */}
            <nav className="space-y-2">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-800 dark:bg-gray-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 dark:hover:bg-gray-700'
                }`}
              >
                Inicio
              </Link>
              <Link 
                href="/category/general/page/1" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  isActive('/category') 
                    ? 'bg-blue-800 dark:bg-gray-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 dark:hover:bg-gray-700'
                }`}
              >
                Categorías
              </Link>
              <Link 
                href="/favorites" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors relative ${
                  isActive('/favorites') 
                    ? 'bg-blue-800 dark:bg-gray-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center justify-between">
                  Favoritos
                  {favorites.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {favorites.length > 99 ? '99+' : favorites.length}
                    </span>
                  )}
                </span>
              </Link>
              <Link 
                href="/contacto" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  isActive('/contacto') 
                    ? 'bg-blue-800 dark:bg-gray-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 dark:hover:bg-gray-700'
                }`}
              >
                Contacto
              </Link>
            </nav>

            {/* Toggle de tema móvil */}
            <div className="mt-4 pt-4 border-t border-blue-500 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full py-3 px-4 rounded-lg text-blue-100 hover:bg-blue-800 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
              >
                {theme === 'light' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Modo oscuro
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Modo claro
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
  