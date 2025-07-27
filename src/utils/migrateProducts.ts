import { supabase } from '@/integrations/supabase/client';
import { allProducts } from '@/data/products';

// Transform local product data to match Supabase schema
const transformProductForSupabase = (product: any) => ({
  id: product.id,
  name: product.name,
  description: product.description || null,
  category: product.category,
  subcategory: product.subcategory || null,
  original_price: product.originalPrice || null,
  current_price: product.currentPrice || product.price || 0,
  discount_percentage: product.discountPercentage || 0,
  image: product.image || null,
  brand: product.brand || null,
  rating: product.rating || 0,
  review_count: product.reviewCount || 0,
  in_stock: product.inStock !== false, // Default to true if not specified
  free_shipping: product.freeShipping || false,
  fsa_eligible: product.isFsaEligible || false,
  patient_profile: product.patientProfile || product.conditionsHelped || [],
  features: product.features || [],
  specifications: product.specifications || null
});

export const migrateProductsToSupabase = async () => {
  try {
    console.log('Starting product migration to Supabase...');
    console.log(`Migrating ${allProducts.length} products`);

    // Transform all products
    const transformedProducts = allProducts.map(transformProductForSupabase);

    // Batch insert products in chunks of 100 for efficiency
    const batchSize = 100;
    const batches = [];
    
    for (let i = 0; i < transformedProducts.length; i += batchSize) {
      batches.push(transformedProducts.slice(i, i + batchSize));
    }

    let totalInserted = 0;

    for (const [index, batch] of batches.entries()) {
      console.log(`Inserting batch ${index + 1}/${batches.length} (${batch.length} products)`);
      
      const { data, error } = await supabase
        .from('products')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error(`Error inserting batch ${index + 1}:`, error);
        throw error;
      }

      totalInserted += batch.length;
      console.log(`Successfully inserted batch ${index + 1}. Total so far: ${totalInserted}`);
    }

    console.log(`✅ Migration completed! Successfully migrated ${totalInserted} products to Supabase.`);
    return { success: true, count: totalInserted };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error };
  }
};

// Helper function to verify migration
export const verifyMigration = async () => {
  try {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error verifying migration:', error);
      return { success: false, error };
    }

    console.log(`✅ Verification completed! Found ${count} products in Supabase.`);
    return { success: true, count };

  } catch (error) {
    console.error('❌ Verification failed:', error);
    return { success: false, error };
  }
};