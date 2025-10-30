import { PlantIdentifier } from "@/components/PlantIdentifier";
import heroImage from "@/assets/hero-plants.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              🌿 AbuzdaFlora
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Twój inteligentny asystent pielęgnacji roślin doniczkowych
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📸</span>
                <span>Rozpoznaj roślinę</span>
              </div>
              <div className="hidden sm:block text-border">•</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💚</span>
                <span>Dowiedz się jak dbać</span>
              </div>
              <div className="hidden sm:block text-border">•</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                <span>Diagnozuj problemy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <PlantIdentifier />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Stworzone z 💚 dla miłośników roślin</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
