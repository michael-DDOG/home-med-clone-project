-- Create cart_items table for storing cart data
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  current_price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_sessions table for anonymous users
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for cart_items (accessible by session)
CREATE POLICY "Cart items are viewable by session" 
ON public.cart_items 
FOR SELECT 
USING (true);

CREATE POLICY "Cart items can be inserted by anyone" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Cart items can be updated by anyone" 
ON public.cart_items 
FOR UPDATE 
USING (true);

CREATE POLICY "Cart items can be deleted by anyone" 
ON public.cart_items 
FOR DELETE 
USING (true);

-- Create policies for user_sessions (accessible by anyone for now)
CREATE POLICY "User sessions are viewable by anyone" 
ON public.user_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "User sessions can be created by anyone" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_sessions_updated_at
  BEFORE UPDATE ON public.user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_cart_items_session_id ON public.cart_items(session_id);
CREATE INDEX idx_cart_items_product_id ON public.cart_items(product_id);