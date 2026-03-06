import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Tuya API configuration - will be used when user provides API keys
const TUYA_BASE_URL = "https://openapi.tuyaeu.com"; // EU endpoint

async function getTuyaToken(accessId: string, accessSecret: string) {
  const timestamp = Date.now().toString();
  const signStr = accessId + timestamp;

  // In production, use proper HMAC-SHA256 signing
  const encoder = new TextEncoder();
  const keyData = encoder.encode(accessSecret);
  const msgData = encoder.encode(signStr);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  const sign = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const response = await fetch(`${TUYA_BASE_URL}/v1.0/token?grant_type=1`, {
    method: "GET",
    headers: {
      client_id: accessId,
      sign,
      t: timestamp,
      sign_method: "HMAC-SHA256",
    },
  });

  const data = await response.json();
  if (data.success) {
    return data.result.access_token;
  }
  throw new Error(`Tuya auth failed: ${data.msg}`);
}

async function getDeviceStatus(
  accessId: string,
  accessSecret: string,
  token: string,
  deviceId: string
) {
  const timestamp = Date.now().toString();
  const path = `/v1.0/devices/${deviceId}/status`;
  const signStr = accessId + token + timestamp;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(accessSecret);
  const msgData = encoder.encode(signStr);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  const sign = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const response = await fetch(`${TUYA_BASE_URL}${path}`, {
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

    const {
      data: { user },
    } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, device_id } = await req.json();

    // Check for Tuya credentials
    const tuyaAccessId = Deno.env.get("TUYA_ACCESS_ID");
    const tuyaAccessSecret = Deno.env.get("TUYA_ACCESS_SECRET");

    if (!tuyaAccessId || !tuyaAccessSecret) {
      return new Response(
        JSON.stringify({
          error: "Tuya API not configured",
          message: "Please configure TUYA_ACCESS_ID and TUYA_ACCESS_SECRET",
          simulated: true,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "sync") {
      // Get Tuya token
      const token = await getTuyaToken(tuyaAccessId, tuyaAccessSecret);

      // Get user's devices
      const { data: devices } = await supabase
        .from("iot_devices")
        .select("*")
        .eq("user_id", user.id)
        .not("tuya_device_id", "is", null);

      if (!devices || devices.length === 0) {
        return new Response(
          JSON.stringify({ message: "No Tuya devices configured" }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const results = [];
      for (const device of devices) {
        const status = await getDeviceStatus(
          tuyaAccessId,
          tuyaAccessSecret,
          token,
          device.tuya_device_id!
        );

        if (status.success) {
          // Parse Tuya status codes to our format
          const reading: Record<string, unknown> = {
            user_id: user.id,
            device_id: device.id,
            device_name: device.device_name,
            reading_at: new Date().toISOString(),
          };

          for (const s of status.result) {
            if (s.code === "va_humidity" || s.code === "humidity_value")
              reading.soil_moisture = s.value / 10;
            if (s.code === "va_temperature" || s.code === "temp_current")
              reading.temperature = s.value / 10;
            if (s.code === "humidity_indoor")
              reading.humidity = s.value;
            if (s.code === "battery_percentage")
              reading.battery_level = s.value;
          }

          await supabase.from("sensor_readings").insert(reading);
          results.push({ device: device.device_name, status: "synced" });
        } else {
          results.push({
            device: device.device_name,
            status: "error",
            error: status.msg,
          });
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
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
