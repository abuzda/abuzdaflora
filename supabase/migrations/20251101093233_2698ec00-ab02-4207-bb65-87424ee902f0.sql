-- Create table for plant collection
CREATE TABLE public.plant_collection (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plant_name TEXT NOT NULL,
  scientific_name TEXT,
  image_url TEXT,
  watering_frequency_days INTEGER DEFAULT 7,
  last_watered_at TIMESTAMP WITH TIME ZONE,
  next_watering_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.plant_collection ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for plant_collection
CREATE POLICY "Users can view their own plants"
ON public.plant_collection
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own plants"
ON public.plant_collection
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plants"
ON public.plant_collection
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plants"
ON public.plant_collection
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_plant_collection_updated_at
BEFORE UPDATE ON public.plant_collection
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for watering schedule
CREATE TABLE public.watering_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plant_id UUID NOT NULL REFERENCES public.plant_collection(id) ON DELETE CASCADE,
  watered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.watering_schedule ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for watering_schedule
CREATE POLICY "Users can view their own watering records"
ON public.watering_schedule
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own watering records"
ON public.watering_schedule
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watering records"
ON public.watering_schedule
FOR DELETE
USING (auth.uid() = user_id);

-- Create table for AI chat messages
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view their own messages"
ON public.chat_messages
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages"
ON public.chat_messages
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_plant_collection_user_id ON public.plant_collection(user_id);
CREATE INDEX idx_watering_schedule_user_id ON public.watering_schedule(user_id);
CREATE INDEX idx_watering_schedule_plant_id ON public.watering_schedule(plant_id);
CREATE INDEX idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);