CREATE TABLE public.cron_secrets (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.cron_secrets TO service_role;

ALTER TABLE public.cron_secrets ENABLE ROW LEVEL SECURITY;
-- No policies = no access for anon/authenticated. Only service_role bypasses RLS.

INSERT INTO public.cron_secrets (id, token)
VALUES ('tuya_sync', encode(gen_random_bytes(32), 'hex'));