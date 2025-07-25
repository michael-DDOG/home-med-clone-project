import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ComprehensiveProductFilters } from "@/components/ComprehensiveProductFilters";
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

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  
  // Apply comprehensive filters to products
  const filteredProducts = useMemo(() => {
    return allCategoryProducts.filter(product => {
      // Price filter
      if (product.currentPrice < filters.priceRange[0] || product.currentPrice > filters.priceRange[1]) {
        return false;
      }
      
      // Brand filter
      if (filters.brand && product.brand && product.brand !== filters.brand) {
        return false;
      }
      
      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
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
      
      // Patient Profile filter
      if (filters.patientProfile.length > 0 && product.patientProfile) {
        const hasProfile = filters.patientProfile.some(profile => 
          product.patientProfile?.includes(profile)
        );
        if (!hasProfile) return false;
      }
      
      // Weight Capacity filter
      if (filters.weightCapacity && product.weightCapacity !== filters.weightCapacity) {
        return false;
      }
      
      // Bed Width filter
      if (filters.bedWidth && product.bedWidth !== filters.bedWidth) {
        return false;
      }
      
      // Mobility Features filter
      if (filters.mobilityFeatures.length > 0 && product.mobilityFeatures) {
        const hasFeatures = filters.mobilityFeatures.every(feature => 
          product.mobilityFeatures?.includes(feature)
        );
        if (!hasFeatures) return false;
      }
      
      // Certifications filter
      if (filters.certifications.length > 0 && product.certifications) {
        const hasCertifications = filters.certifications.some(cert => 
          product.certifications?.includes(cert)
        );
        if (!hasCertifications) return false;
      }
      
      // Materials filter
      if (filters.materials.length > 0 && product.materials) {
        const hasMaterials = filters.materials.some(material => 
          product.materials?.includes(material)
        );
        if (!hasMaterials) return false;
      }
      
      // Room Location filter
      if (filters.roomLocation.length > 0 && product.roomLocation) {
        const hasLocation = filters.roomLocation.some(location => 
          product.roomLocation?.includes(location)
        );
        if (!hasLocation) return false;
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

      {/* Main Content with Sidebar Filter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <div className="w-80 flex-shrink-0">
              <ComprehensiveProductFilters onFilterChange={setFilters} className="sticky top-4" />
            </div>
            
            {/* Right Content - Products */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategory;