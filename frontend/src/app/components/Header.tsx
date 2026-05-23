import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-sm bg-black/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-yellow-600 p-2 rounded-lg">
              <Home className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white"> Find a home</h1>
              <p className="text-xs text-yellow-600">Verified House Hunting</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-yellow-600'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/properties'
                  ? 'text-yellow-600'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Properties
            </Link>
          </nav>

          {/* CTA */}
          <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
            List Property
          </button>
        </div>
      </div>
    </header>
  );
}
