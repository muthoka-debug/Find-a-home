import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Outlet />

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-zinc-400 text-sm">
            <p className="mb-2">
              © 2026 GoldNest. All listings are manually verified to prevent scams.
            </p>
            <p className="text-yellow-600">
              Your trusted partner in finding the perfect home.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
