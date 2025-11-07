import { PlantIdentifier } from "@/components/PlantIdentifier";
import { Layout } from "@/components/layout/Layout";
import { UpcomingTasks } from "@/components/UpcomingTasks";
import heroImage from "@/assets/hero-plants.jpg";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/50 to-background" />
          
          <div className="relative container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                🌿 AbuzdaFlora
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Twój inteligentny asystent pielęgnacji roślin doniczkowych
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm md:text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <span>Rozpoznaj roślinę</span>
                </div>
                <div className="hidden sm:block text-border">•</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💚</span>
                  <span>Dowiedz się jak dbać</span>
                </div>
                <div className="hidden sm:block text-border">•</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <span>Diagnozuj problemy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <UpcomingTasks />
            <PlantIdentifier />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>Stworzone z 💚 dla miłośników roślin</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
