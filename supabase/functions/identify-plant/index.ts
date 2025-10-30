import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, diagnosisMode } = await req.json();
    
    if (!imageBase64) {
      throw new Error("Image is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = diagnosisMode 
      ? `Jesteś ekspertem od diagnozowania chorób i problemów roślin doniczkowych. 
         Przeanalizuj zdjęcie i określ:
         1. Jaką chorobę lub problem widać na roślinie (np. przelanie, szkodniki, niedobór światła)
         2. Przyczyny problemu
         3. Szczegółowe kroki leczenia i naprawy
         4. Jak zapobiegać w przyszłości
         
         Odpowiedz w formacie JSON:
         {
           "diagnosis": "nazwa problemu",
           "symptoms": "opis objawów",
           "causes": "przyczyny",
           "treatment": "szczegółowe kroki leczenia",
           "prevention": "jak zapobiegać"
         }`
      : `Jesteś ekspertem od roślin doniczkowych. Rozpoznaj roślinę na zdjęciu i podaj szczegółowe informacje.
         
         Odpowiedz w formacie JSON z następującymi polami:
         {
           "plantName": "nazwa rośliny po polsku",
           "scientificName": "nazwa łacińska",
           "light": "wymagania świetlne (np. jasne miejsce bez bezpośredniego słońca)",
           "watering": "wskazówki dotyczące podlewania (częstotliwość latem i zimą)",
           "humidity": "wymagana wilgotność powietrza",
           "soil": "typ podłoża",
           "fertilizing": "harmonogram nawożenia",
           "tips": "dodatkowe wskazówki pielęgnacyjne",
           "commonIssues": "częste problemy i jak ich unikać"
         }`;

    console.log("Calling AI with", diagnosisMode ? "diagnosis mode" : "identification mode");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                },
              },
              {
                type: "text",
                text: diagnosisMode 
                  ? "Przeanalizuj tę roślinę i zdiagnozuj problem." 
                  : "Rozpoznaj tę roślinę i podaj szczegółowe informacje o pielęgnacji.",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Limit zapytań został przekroczony. Spróbuj ponownie za chwilę.");
      }
      if (response.status === 402) {
        throw new Error("Brak środków na koncie. Dodaj kredyty w ustawieniach.");
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Extract JSON from response (handle markdown code blocks)
    let jsonContent = content;
    if (content.includes("```json")) {
      jsonContent = content.split("```json")[1].split("```")[0].trim();
    } else if (content.includes("```")) {
      jsonContent = content.split("```")[1].split("```")[0].trim();
    }

    const parsedData = JSON.parse(jsonContent);

    return new Response(
      JSON.stringify({ success: true, data: parsedData }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in identify-plant function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Nieznany błąd" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
