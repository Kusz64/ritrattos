CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  style text NOT NULL,
  size text NOT NULL,
  message text,
  photo_paths text[] NOT NULL DEFAULT '{}',
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'nuevo'
);

GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies: orders are written and read only by trusted
-- server code using the service role.
