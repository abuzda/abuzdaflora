import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { UpdatePrompt } from "@/components/UpdatePrompt";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import History from "./pages/History";
import Collection from "./pages/Collection";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Download from "./pages/Download";
import Favorites from "./pages/Favorites";
import NaturalCare from "./pages/NaturalCare";
import BeginnerPlants from "./pages/BeginnerPlants";
import FertilizationCalendar from "./pages/FertilizationCalendar";
import NotFound from "./pages/NotFound";
import SeasonalAdvice from "./pages/SeasonalAdvice";
import Encyclopedia from "./pages/Encyclopedia";
import Install from "./pages/Install";
import GrowthJournal from "./pages/GrowthJournal";
import CareCalendar from "./pages/CareCalendar";
import LightCalculator from "./pages/LightCalculator";
import Hydroponics from "./pages/Hydroponics";
import Pests from "./pages/Pests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UpdatePrompt />
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
              <Route path="/beginner-plants" element={<AuthGuard><BeginnerPlants /></AuthGuard>} />
              <Route path="/fertilization-calendar" element={<AuthGuard><FertilizationCalendar /></AuthGuard>} />
              <Route path="/care-calendar" element={<AuthGuard><CareCalendar /></AuthGuard>} />
              <Route path="/seasonal-advice" element={<AuthGuard><SeasonalAdvice /></AuthGuard>} />
              <Route path="/encyclopedia" element={<AuthGuard><Encyclopedia /></AuthGuard>} />
              <Route path="/growth-journal" element={<AuthGuard><GrowthJournal /></AuthGuard>} />
              <Route path="/install" element={<AuthGuard><Install /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/light-calculator" element={<AuthGuard><LightCalculator /></AuthGuard>} />
              <Route path="/hydroponics" element={<AuthGuard><Hydroponics /></AuthGuard>} />
              <Route path="/pests" element={<AuthGuard><Pests /></AuthGuard>} />
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
