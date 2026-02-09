
-- Allow public viewing of plant collections when profile is shared
CREATE POLICY "Anyone can view plants of shared profiles"
ON public.plant_collection
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = plant_collection.user_id 
    AND profiles.share_token IS NOT NULL
  )
);
