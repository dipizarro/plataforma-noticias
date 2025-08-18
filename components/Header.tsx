export default function Header() {
    return (
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Plataforma de Noticias 🚀</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#/" className="hover:underline">Inicio</a></li>
              <li><a href="/categorias" className="hover:underline">Categorías</a></li>
              <li><a href="/contacto" className="hover:underline">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  