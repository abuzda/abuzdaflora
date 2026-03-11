
CREATE TABLE public.tuya_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  tuya_access_id text NOT NULL,
  tuya_access_secret text NOT NULL,
  tuya_region text NOT NULL DEFAULT 'eu',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.tuya_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tuya credentials"
  ON public.tuya_credentials FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tuya credentials"
  ON public.tuya_credentials FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tuya credentials"
  ON public.tuya_credentials FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tuya credentials"
  ON public.tuya_credentials FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_tuya_credentials_updated_at
  BEFORE UPDATE ON public.tuya_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
