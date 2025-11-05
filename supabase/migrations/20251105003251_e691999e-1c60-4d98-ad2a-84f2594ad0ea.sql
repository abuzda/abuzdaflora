-- Create fertilization_schedule table
CREATE TABLE public.fertilization_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plant_id UUID NOT NULL,
  plant_name TEXT NOT NULL,
  fertilizer_type TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fertilization_schedule ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own fertilization schedule"
ON public.fertilization_schedule
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own fertilization records"
ON public.fertilization_schedule
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fertilization records"
ON public.fertilization_schedule
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own fertilization records"
ON public.fertilization_schedule
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_fertilization_schedule_updated_at
BEFORE UPDATE ON public.fertilization_schedule
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();