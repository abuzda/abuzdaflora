import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <BottomNav />
      <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-background mb-16 md:mb-0">
        Stworzone z 💚 dla miłośników roślin przez Abuzda
      </footer>
    </div>
  );
}