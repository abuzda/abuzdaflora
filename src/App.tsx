import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import History from "./pages/History";
import Collection from "./pages/Collection";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Download from "./pages/Download";
import Favorites from "./pages/Favorites";
import NaturalCare from "./pages/NaturalCare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/download" element={<Download />} />
              <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
              <Route path="/history" element={<AuthGuard><History /></AuthGuard>} />
              <Route path="/collection" element={<AuthGuard><Collection /></AuthGuard>} />
              <Route path="/search" element={<AuthGuard><Search /></AuthGuard>} />
              <Route path="/favorites" element={<AuthGuard><Favorites /></AuthGuard>} />
              <Route path="/natural-care" element={<AuthGuard><NaturalCare /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
