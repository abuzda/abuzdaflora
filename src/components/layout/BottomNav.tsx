import { Link, useLocation } from 'react-router-dom';
import { Home, History, Leaf, Search, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Główna' },
    { path: '/history', icon: History, label: 'Historia' },
    { path: '/collection', icon: Leaf, label: 'Kolekcja' },
    { path: '/search', icon: Search, label: 'Szukaj' },
    { path: '/profile', icon: User, label: 'Profil' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive(path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}