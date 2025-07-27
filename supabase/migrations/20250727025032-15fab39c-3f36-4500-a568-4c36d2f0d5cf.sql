-- Add INSERT policy for products table to allow migration
CREATE POLICY "Allow public insert on products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- Also add UPDATE and DELETE policies for completeness
CREATE POLICY "Allow public update on products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete on products" 
ON public.products 
FOR DELETE 
USING (true);