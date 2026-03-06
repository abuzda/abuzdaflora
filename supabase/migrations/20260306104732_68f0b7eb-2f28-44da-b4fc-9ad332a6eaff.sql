
-- Table for IoT sensor readings
CREATE TABLE public.sensor_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  device_id text NOT NULL,
  device_name text,
  soil_moisture numeric,
  temperature numeric,
  humidity numeric,
  battery_level numeric,
  reading_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sensor readings"
ON public.sensor_readings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sensor readings"
ON public.sensor_readings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sensor readings"
ON public.sensor_readings FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Table for user's IoT devices
CREATE TABLE public.iot_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tuya_device_id text,
  device_name text NOT NULL,
  device_type text DEFAULT 'soil_sensor',
  plant_id uuid REFERENCES public.plant_collection(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  last_seen_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.iot_devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own devices"
ON public.iot_devices FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devices"
ON public.iot_devices FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices"
ON public.iot_devices FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices"
ON public.iot_devices FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
