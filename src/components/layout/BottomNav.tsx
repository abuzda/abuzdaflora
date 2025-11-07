import { Link, useLocation } from 'react-router-dom';
import { Home, History, Leaf, Search, User, Heart, Sprout, FlowerIcon, Download, Bell, Calendar, BookOpen, Smartphone, NotebookPen } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Główna' },
    { path: '/history', icon: History, label: 'Historia' },
    { path: '/collection', icon: Leaf, label: 'Kolekcja' },
    { path: '/favorites', icon: Heart, label: 'Ulubione' },
    { path: '/search', icon: Search, label: 'Szukaj' },
    { path: '/natural-care', icon: Sprout, label: 'Pielęgnacja' },
    { path: '/beginner-plants', icon: FlowerIcon, label: 'Dla początkujących' },
    { path: '/fertilization-calendar', icon: Bell, label: 'Nawożenie' },
    { path: '/seasonal-advice', icon: Calendar, label: 'Sezonowo' },
    { path: '/encyclopedia', icon: BookOpen, label: 'Encyklopedia' },
    { path: '/growth-journal', icon: NotebookPen, label: 'Dziennik' },
    { path: '/install', icon: Smartphone, label: 'Zainstaluj' },
    { path: '/download', icon: Download, label: 'iOS' },
    { path: '/profile', icon: User, label: 'Profil' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 overflow-x-auto">
      <div className="flex min-w-max h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center space-y-1 px-3 min-w-[80px] ${
              isActive(path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs text-center">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}