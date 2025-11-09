import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Book, Calendar, Sprout, ChevronDown, Sun, Droplets, Bug, Menu, X, Home, History, Heart, Search as SearchIcon, FlowerIcon, Download, Bell, BookOpen, Smartphone, NotebookPen } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            🌿 <span>AbuzdaFlora</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Rozpoznawanie
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium h-auto p-0 hover:text-primary">
                  Moja Kolekcja <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background z-50">
                <DropdownMenuItem asChild>
                  <Link to="/collection" className="cursor-pointer">
                    <Sprout className="mr-2 h-4 w-4" />
                    Kolekcja Roślin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="cursor-pointer">
                    <Sprout className="mr-2 h-4 w-4" />
                    Ulubione
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/history" className="cursor-pointer">
                    <Sprout className="mr-2 h-4 w-4" />
                    Historia
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium h-auto p-0 hover:text-primary">
                  Kalendarze <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background z-50">
                <DropdownMenuItem asChild>
                  <Link to="/care-calendar" className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Kalendarz Pielęgnacyjny
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/fertilization-calendar" className="cursor-pointer text-muted-foreground">
                    Kalendarz Nawożenia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/light-calculator" className="cursor-pointer">
                    <Sun className="mr-2 h-4 w-4" />
                    Kalkulator Światła
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium h-auto p-0 hover:text-primary">
                  Wiedza <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background z-50">
                <DropdownMenuItem asChild>
                  <Link to="/encyclopedia" className="cursor-pointer">
                    <Book className="mr-2 h-4 w-4" />
                    Encyklopedia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/natural-care" className="cursor-pointer">
                    <Book className="mr-2 h-4 w-4" />
                    Naturalna Pielęgnacja
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/beginner-plants" className="cursor-pointer">
                    <Book className="mr-2 h-4 w-4" />
                    Dla Początkujących
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/search" className="cursor-pointer">
                    <Book className="mr-2 h-4 w-4" />
                    Wyszukiwarka
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/hydroponics" className="cursor-pointer">
                    <Droplets className="mr-2 h-4 w-4" />
                    Hydroponika
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/pests" className="cursor-pointer">
                    <Bug className="mr-2 h-4 w-4" />
                    Szkodniki
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/growth-journal"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/growth-journal') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dziennik Wzrostu
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Wyloguj się
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="px-4 py-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="inline-block mr-2 h-4 w-4" />
                Główna
              </Link>
              
              <div className="pt-2">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Moja Kolekcja</p>
                <Link
                  to="/collection"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/collection') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sprout className="inline-block mr-2 h-4 w-4" />
                  Kolekcja Roślin
                </Link>
                <Link
                  to="/favorites"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/favorites') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="inline-block mr-2 h-4 w-4" />
                  Ulubione
                </Link>
                <Link
                  to="/history"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/history') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <History className="inline-block mr-2 h-4 w-4" />
                  Historia
                </Link>
              </div>

              <div className="pt-2">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kalendarze</p>
                <Link
                  to="/care-calendar"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/care-calendar') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="inline-block mr-2 h-4 w-4" />
                  Kalendarz Pielęgnacyjny
                </Link>
                <Link
                  to="/fertilization-calendar"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/fertilization-calendar') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bell className="inline-block mr-2 h-4 w-4" />
                  Kalendarz Nawożenia
                </Link>
                <Link
                  to="/light-calculator"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/light-calculator') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sun className="inline-block mr-2 h-4 w-4" />
                  Kalkulator Światła
                </Link>
              </div>

              <div className="pt-2">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Wiedza</p>
                <Link
                  to="/encyclopedia"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/encyclopedia') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="inline-block mr-2 h-4 w-4" />
                  Encyklopedia
                </Link>
                <Link
                  to="/natural-care"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/natural-care') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sprout className="inline-block mr-2 h-4 w-4" />
                  Naturalna Pielęgnacja
                </Link>
                <Link
                  to="/beginner-plants"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/beginner-plants') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FlowerIcon className="inline-block mr-2 h-4 w-4" />
                  Dla Początkujących
                </Link>
                <Link
                  to="/search"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/search') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <SearchIcon className="inline-block mr-2 h-4 w-4" />
                  Wyszukiwarka
                </Link>
                <Link
                  to="/hydroponics"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/hydroponics') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Droplets className="inline-block mr-2 h-4 w-4" />
                  Hydroponika
                </Link>
                <Link
                  to="/pests"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/pests') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bug className="inline-block mr-2 h-4 w-4" />
                  Szkodniki
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  to="/growth-journal"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/growth-journal') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <NotebookPen className="inline-block mr-2 h-4 w-4" />
                  Dziennik Wzrostu
                </Link>
                <Link
                  to="/install"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/install') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Smartphone className="inline-block mr-2 h-4 w-4" />
                  Zainstaluj
                </Link>
                <Link
                  to="/download"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/download') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="inline-block mr-2 h-4 w-4" />
                  iOS
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}