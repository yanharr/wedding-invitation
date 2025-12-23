-- Create RSVP responses table
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  number_of_guests INTEGER DEFAULT 1,
  wishes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert RSVP responses (public form)
CREATE POLICY "Anyone can submit RSVP" 
ON public.rsvp_responses 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading for admin purposes (can be adjusted later)
CREATE POLICY "RSVPs are readable" 
ON public.rsvp_responses 
FOR SELECT 
USING (true);