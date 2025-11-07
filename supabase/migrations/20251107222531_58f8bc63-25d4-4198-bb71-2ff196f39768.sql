-- Add description column to plant_collection table
ALTER TABLE public.plant_collection 
ADD COLUMN IF NOT EXISTS description TEXT;