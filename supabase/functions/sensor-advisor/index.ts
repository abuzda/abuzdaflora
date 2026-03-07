import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { soil_moisture, temperature, humidity, battery_level, plant_name } = await req.json();

    const systemPrompt = `Jesteś ekspertem od pielęgnacji roślin. Analizujesz dane z czujników IoT i dajesz krótkie, praktyczne porady po polsku.
Odpowiadaj w formie 2-4 krótkich porad z emoji. Bądź konkretny.
Jeśli wartości są krytyczne (wilgotność gleby <20% lub >80%, temperatura <10°C lub >35°C), zacznij od ostrzeżenia ⚠️.`;

    const userPrompt = `Dane z czujnika${plant_name ? ` dla rośliny "${plant_name}"` : ""}:
- Wilgotność gleby: ${soil_moisture}%
- Temperatura: ${temperature}°C
- Wilgotność powietrza: ${humidity}%
- Bateria czujnika: ${battery_level}%

Daj porady na podstawie tych odczytów.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Zbyt wiele zapytań, spróbuj ponownie za chwilę." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Brak środków na koncie AI." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", status, errorText);
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const advice = data.choices?.[0]?.message?.content || "Brak porad.";

    return new Response(JSON.stringify({ advice }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("sensor-advisor error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
