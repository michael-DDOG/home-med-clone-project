import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc, ArrowLeft } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { 
  allProducts, 
  wellnessProducts, 
  hospitalBedsProducts, 
  mobilityProducts, 
  bathroomSafetyProducts, 
  respiratoryProducts, 
  compressionProducts,
  stethoscopeProducts,
  pediatricProducts,
  orthopedicProducts,
  positioningProducts,
  personalCareProducts,
  disposableProducts
} from "@/data/products";

interface FilterState {
  priceRange: [number, number];
  brand: string;
  bedWidth: string;
  bedType: string;
  fsaEligible: boolean;
  features: string[];
}

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    brand: '',
    bedWidth: '',
    bedType: '',
    fsaEligible: false,
    features: []
  });
  const itemsPerPage = 21;

  const getProductsByCategory = () => {
    switch (category) {
      case 'wellness': return wellnessProducts;
      case 'hospital-beds': return hospitalBedsProducts;
      case 'mobility': return mobilityProducts;
      case 'bathroom-safety': return bathroomSafetyProducts;
      case 'respiratory': return respiratoryProducts;
      case 'compression': return compressionProducts;
      case 'diagnostics': return stethoscopeProducts;
      case 'pediatric': return pediatricProducts;
      case 'orthopedic': return orthopedicProducts;
      case 'positioning': return positioningProducts;
      case 'personal-care': return personalCareProducts;
      case 'disposables': return disposableProducts;
      default: return allProducts;
    }
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'wellness': return 'Wellness Collection';
      case 'hospital-beds': return 'Hospital Beds & Mattresses';
      case 'mobility': return 'Mobility Aids';
      case 'bathroom-safety': return 'Bathroom Safety';
      case 'respiratory': return 'Respiratory Equipment';
      case 'compression': return 'Compression Therapy';
      case 'diagnostics': return 'Diagnostic Equipment';
      case 'pediatric': return 'Pediatric Products';
      case 'orthopedic': return 'Orthopedic Supports';
      case 'positioning': return 'Positioning & Support';
      case 'personal-care': return 'Personal Care';
      case 'disposables': return 'Disposables';
      default: return 'All Products';
    }
  };

  const allCategoryProducts = getProductsByCategory();
  
  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return allCategoryProducts.filter(product => {
      // Price filter
      if (product.currentPrice < filters.priceRange[0] || product.currentPrice > filters.priceRange[1]) {
        return false;
      }
      
      // Brand filter
      if (filters.brand && !product.name.toLowerCase().includes(filters.brand.toLowerCase())) {
        return false;
      }
      
      // FSA/HSA filter
      if (filters.fsaEligible && !product.isFsaEligible) {
        return false;
      }
      
      // Bed width filter (simulate based on product name)
      if (filters.bedWidth) {
        const widthKeywords = {
          '36 inches': ['36', '36"'],
          '42 inches': ['42', '42"'],
          '48 inches': ['48', '48"'],
          'Bariatric': ['bariatric', 'heavy duty', 'wide'],
          'Standard': ['standard']
        };
        
        const keywords = widthKeywords[filters.bedWidth as keyof typeof widthKeywords] || [];
        const hasWidth = keywords.some(keyword => 
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (!hasWidth) return false;
      }
      
      // Bed type filter
      if (filters.bedType) {
        const typeKeywords = {
          'Full Electric': ['full electric', 'electric'],
          'Semi Electric': ['semi electric', 'semi-electric'],
          'Manual': ['manual'],
          'Ultra Low': ['ultra low', 'low'],
          'Bariatric': ['bariatric'],
          'Adjustable': ['adjustable'],
          'Bed Package': ['package', 'set', 'complete']
        };
        
        const keywords = typeKeywords[filters.bedType as keyof typeof typeKeywords] || [];
        const hasType = keywords.some(keyword => 
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (!hasType) return false;
      }
      
      // Features filter
      if (filters.features.length > 0) {
        const featureKeywords = {
          'Side Rails': ['rail', 'side rail'],
          'Adjustable Height': ['adjustable', 'height'],
          'Pressure Relief': ['pressure', 'relief'],
          'Foam Mattress': ['foam', 'mattress'],
          'Low Height': ['low', 'low height'],
          'Trendelenburg': ['trendelenburg'],
          'Reverse Trendelenburg': ['reverse'],
          'Head/Foot Controls': ['head', 'foot', 'control']
        };
        
        const hasAllFeatures = filters.features.every(feature => {
          const keywords = featureKeywords[feature as keyof typeof featureKeywords] || [];
          return keywords.some(keyword => 
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.badges?.some(badge => badge.toLowerCase().includes(keyword.toLowerCase()))
          );
        });
        
        if (!hasAllFeatures) return false;
      }
      
      return true;
    });
  }, [allCategoryProducts, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={(cat) => navigate(cat === 'all' ? '/' : `/category/${cat}`)} />
      
      {/* Breadcrumb & Back Button */}
      <section className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-bold text-primary">{getCategoryTitle()}</h1>
          </div>
        </div>
      </section>

      {/* Category Header */}
      <section className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">{getCategoryTitle()}</h2>
              <span className="text-muted-foreground">({filteredProducts.length} items)</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </span>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort by: Featured
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <ProductFilters onFilterChange={setFilters} />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {generatePageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              
              <span className="text-sm text-muted-foreground ml-4">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductCategory;