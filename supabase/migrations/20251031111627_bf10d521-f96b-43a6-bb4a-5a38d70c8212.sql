-- Create storage bucket for plant images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'plant-images',
  'plant-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
);

-- Storage policies for plant images
CREATE POLICY "Anyone can view plant images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'plant-images');

CREATE POLICY "Authenticated users can upload plant images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'plant-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own plant images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'plant-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own plant images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'plant-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create plant_identifications table
CREATE TABLE public.plant_identifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  identification_type TEXT NOT NULL CHECK (identification_type IN ('identify', 'diagnose')),
  
  -- For plant identification
  plant_name TEXT,
  scientific_name TEXT,
  light TEXT,
  watering TEXT,
  humidity TEXT,
  soil TEXT,
  fertilizing TEXT,
  tips TEXT,
  common_issues TEXT,
  
  -- For diagnosis
  diagnosis TEXT,
  symptoms TEXT,
  causes TEXT,
  treatment TEXT,
  prevention TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.plant_identifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plant_identifications
CREATE POLICY "Users can view their own identifications"
ON public.plant_identifications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own identifications"
ON public.plant_identifications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own identifications"
ON public.plant_identifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own identifications"
ON public.plant_identifications
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_plant_identifications_updated_at
BEFORE UPDATE ON public.plant_identifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();