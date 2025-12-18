import './globals.css';
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { FavoritesProvider } from "@/app/contexts/FavoritesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <FavoritesProvider>
            <Header />
            <Breadcrumbs />
            <main className="container mx-auto p-4">{children}</main>
            <Footer />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
