-- Create products table with efficient schema for 3000+ products
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  original_price DECIMAL(10,2),
  current_price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  image TEXT,
  brand TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  free_shipping BOOLEAN DEFAULT false,
  fsa_eligible BOOLEAN DEFAULT false,
  patient_profile TEXT[],
  features TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_subcategory ON public.products(subcategory);
CREATE INDEX idx_products_price ON public.products(current_price);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_in_stock ON public.products(in_stock);
CREATE INDEX idx_products_fsa_eligible ON public.products(fsa_eligible);
CREATE INDEX idx_products_patient_profile ON public.products USING GIN(patient_profile);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since products are public)
CREATE POLICY "Products are publicly readable" 
ON public.products 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();