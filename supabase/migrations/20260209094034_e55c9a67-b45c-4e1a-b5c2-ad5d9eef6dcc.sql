
-- Add share_token to profiles for public sharing
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS share_token text UNIQUE;

-- Allow public read of profiles via share_token (no auth needed)
CREATE POLICY "Anyone can view shared profiles"
ON public.profiles
FOR SELECT
USING (share_token IS NOT NULL);

-- Allow users to insert their own profile (fix security issue)
CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
