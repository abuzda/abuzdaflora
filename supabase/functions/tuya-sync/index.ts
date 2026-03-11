import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const TUYA_REGIONS: Record<string, string> = {
  eu: "https://openapi.tuyaeu.com",
  us: "https://openapi.tuyaus.com",
  cn: "https://openapi.tuyacn.com",
  in: "https://openapi.tuyain.com",
};

async function hmacSign(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

async function getTuyaToken(baseUrl: string, accessId: string, accessSecret: string) {
  const timestamp = Date.now().toString();
  const sign = await hmacSign(accessSecret, accessId + timestamp);

  const response = await fetch(`${baseUrl}/v1.0/token?grant_type=1`, {
    method: "GET",
    headers: {
      client_id: accessId,
      sign,
      t: timestamp,
      sign_method: "HMAC-SHA256",
    },
  });

  const data = await response.json();
  if (data.success) return data.result.access_token;
  throw new Error(`Tuya auth failed: ${data.msg}`);
}

async function getDeviceStatus(
  baseUrl: string,
  accessId: string,
  accessSecret: string,
  token: string,
  deviceId: string
) {
  const timestamp = Date.now().toString();
  const sign = await hmacSign(accessSecret, accessId + token + timestamp);

  const response = await fetch(`${baseUrl}/v1.0/devices/${deviceId}/status`, {
    method: "GET",
    headers: {
      client_id: accessId,
      access_token: token,
      sign,
      t: timestamp,
      sign_method: "HMAC-SHA256",
    },
  });

  return await response.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: { user } } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action } = await req.json();

    // Load user's Tuya credentials from DB
    const { data: creds } = await supabase
      .from("tuya_credentials")
      .select("tuya_access_id, tuya_access_secret, tuya_region")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!creds) {
      return new Response(
        JSON.stringify({
          error: "Tuya API not configured",
          message: "Wprowadź klucze Tuya API w ustawieniach IoT",
          simulated: true,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const baseUrl = TUYA_REGIONS[creds.tuya_region] || TUYA_REGIONS.eu;

    if (action === "sync") {
      const token = await getTuyaToken(baseUrl, creds.tuya_access_id, creds.tuya_access_secret);

      const { data: devices } = await supabase
        .from("iot_devices")
        .select("*")
        .eq("user_id", user.id)
        .not("tuya_device_id", "is", null);

      if (!devices || devices.length === 0) {
        return new Response(
          JSON.stringify({ message: "Brak urządzeń Tuya do synchronizacji" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const results = [];
      for (const device of devices) {
        const status = await getDeviceStatus(
          baseUrl, creds.tuya_access_id, creds.tuya_access_secret, token, device.tuya_device_id!
        );

        if (status.success) {
          const reading: Record<string, unknown> = {
            user_id: user.id,
            device_id: device.id,
            device_name: device.device_name,
            reading_at: new Date().toISOString(),
          };

          for (const s of status.result) {
            if (s.code === "va_humidity" || s.code === "humidity_value") reading.soil_moisture = s.value / 10;
            if (s.code === "va_temperature" || s.code === "temp_current") reading.temperature = s.value / 10;
            if (s.code === "humidity_indoor") reading.humidity = s.value;
            if (s.code === "battery_percentage") reading.battery_level = s.value;
          }

          await supabase.from("sensor_readings").insert(reading);
          results.push({ device: device.device_name, status: "synced" });
        } else {
          results.push({ device: device.device_name, status: "error", error: status.msg });
        }
      }

      return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Tuya sync error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
