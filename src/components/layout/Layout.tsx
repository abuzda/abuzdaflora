import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-background">
        Stworzone z 💚 dla miłośników roślin przez Abuzda
      </footer>
    </div>
  );
}