-- Add fertilizer_recommendation field to plant_collection
ALTER TABLE public.plant_collection 
ADD COLUMN fertilizer_recommendation TEXT;