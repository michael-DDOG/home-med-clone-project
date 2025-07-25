import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ComprehensiveProductFilters } from '@/components/ComprehensiveProductFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allProducts } from '@/data/products';
import { Search, Filter } from 'lucide-react';

interface ComprehensiveFilterState {
  priceRange: [number, number];
  brand: string;
  patientProfile: string[];
  weightCapacity: string;
  bedWidth: string;
  bedLength: string;
  mattressType: string;
  mobilityFeatures: string[];
  powerFeatures: string[];
  certifications: string[];
  materials: string[];
  roomLocation: string[];
  conditionsHelped: string[];
  minRating: number;
  fsaEligible: boolean;
  inStock: boolean;
  freeShipping: boolean;
  availability: string[];
}

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState<ComprehensiveFilterState>({
    priceRange: [0, 2000],
    brand: '',
    patientProfile: [],
    weightCapacity: '',
    bedWidth: '',
    bedLength: '',
    mattressType: '',
    mobilityFeatures: [],
    powerFeatures: [],
    certifications: [],
    materials: [],
    roomLocation: [],
    conditionsHelped: [],
    minRating: 0,
    fsaEligible: false,
    inStock: false,
    freeShipping: false,
    availability: []
  });

  // Search and filter products
  const searchResults = useMemo(() => {
    let results = allProducts;

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.conditionsHelped?.some(condition => 
          condition.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Apply filters
    results = results.filter(product => {
      // Price filter
      if (product.currentPrice < filters.priceRange[0] || product.currentPrice > filters.priceRange[1]) {
        return false;
      }
      
      // Brand filter
      if (filters.brand && product.brand && product.brand !== filters.brand) {
        return false;
      }
      
      // FSA/HSA filter
      if (filters.fsaEligible && !product.isFsaEligible) {
        return false;
      }
      
      // In Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }
      
      // Free Shipping filter
      if (filters.freeShipping && !product.freeShipping) {
        return false;
      }
      
      // Conditions Helped filter
      if (filters.conditionsHelped.length > 0 && product.conditionsHelped) {
        const hasConditions = filters.conditionsHelped.some(condition => 
          product.conditionsHelped?.includes(condition)
        );
        if (!hasConditions) return false;
      }
      
      return true;
    });

    return results;
  }, [query, filters]);

  const handleCategorySelect = (category: string) => {
    navigate(category === 'all' ? '/' : `/category/${category}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={handleCategorySelect} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-bold text-primary">
              {query ? `Search Results for "${query}"` : 'All Products'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="outline">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </Badge>
            
            {query && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/search')}
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>

        {/* No Results */}
        {searchResults.length === 0 && query && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords or browse our categories
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button onClick={() => navigate('/category/wellness')}>
                Wellness Collection
              </Button>
              <Button variant="outline" onClick={() => navigate('/category/mobility')}>
                Mobility Aids
              </Button>
              <Button variant="outline" onClick={() => navigate('/category/hospital-beds')}>
                Hospital Beds
              </Button>
            </div>
          </div>
        )}

        {/* Results with Filters */}
        {searchResults.length > 0 && (
          <>
            {/* Filters */}
            <div className="mb-8">
              <ComprehensiveProductFilters onFilterChange={setFilters} />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;