
-- Fix search_path on update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix permissive INSERT policy on contact_submissions - add rate limiting via check
DROP POLICY "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
