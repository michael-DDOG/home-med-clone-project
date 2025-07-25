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
  disposableProducts,
  dailyLivingAidsProducts,
  footwearProducts,
  contactLensProducts,
  hearingAidsProducts,
  wheelchairProducts,
  patientLiftProducts,
  walkerProducts,
  vitaminsProducts,
  electricHospitalBedsProducts,
  semiElectricBedsProducts,
  sexualWellnessProducts,
  mobilityScooterProducts,
  canesCrutchesProducts,
  medicinesProducts
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
      case 'electric-hospital-beds': return electricHospitalBedsProducts;
      case 'semi-electric-beds': return semiElectricBedsProducts;
      case 'mobility': return mobilityProducts;
      case 'mobility-scooters': return mobilityScooterProducts;
      case 'bathroom-safety': return bathroomSafetyProducts;
      case 'respiratory': return respiratoryProducts;
      case 'compression': return compressionProducts;
      case 'diagnostics': return stethoscopeProducts;
      case 'pediatric': return pediatricProducts;
      case 'orthopedic': return orthopedicProducts;
      case 'positioning': return positioningProducts;
      case 'personal-care': return personalCareProducts;
      case 'disposables': return disposableProducts;
      case 'daily-living-aids': return dailyLivingAidsProducts;
      case 'diabetic-footwear': return footwearProducts;
      case 'contact-lens': return contactLensProducts;
      case 'hearing-aids': return hearingAidsProducts;
      case 'wheelchairs': return wheelchairProducts;
      case 'patient-lifts': return patientLiftProducts;
      case 'walkers': return walkerProducts;
      case 'canes-crutches': return canesCrutchesProducts;
      case 'vitamins': return vitaminsProducts;
      case 'sexual-wellness': return sexualWellnessProducts;
      case 'medicines': return medicinesProducts;
      case 'household': return personalCareProducts;
      case 'home-health': return personalCareProducts;
      case 'fitness': return personalCareProducts;
      case 'caregiver': return personalCareProducts;
      case 'exam-rooms': return stethoscopeProducts;
      // Additional bed categories that map to existing products
      case 'adjustable-beds': return hospitalBedsProducts;
      case 'rotating-beds': return hospitalBedsProducts;
      case 'low-hospital-beds': return hospitalBedsProducts;
      case 'bariatric-beds': return hospitalBedsProducts;
      case 'bed-mattresses': return hospitalBedsProducts;
      case 'bed-rails': return hospitalBedsProducts;
      case 'hospital-bedding': return hospitalBedsProducts;
      case 'bed-pillows': return hospitalBedsProducts;
      case 'bed-accessories': return hospitalBedsProducts;
      case 'overbed-table': return dailyLivingAidsProducts;
      case 'physical-therapy': return orthopedicProducts;
      // Additional categories that use existing product arrays
      case 'ramps': return mobilityProducts;
      case 'stair-lift': return mobilityProducts;
      default: return allProducts;
    }
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'wellness': return 'Wellness Collection';
      case 'hospital-beds': return 'Hospital Beds & Mattresses';
      case 'electric-hospital-beds': return 'Electric Hospital Beds';
      case 'semi-electric-beds': return 'Semi-Electric Hospital Beds';
      case 'adjustable-beds': return 'Adjustable Beds for Seniors';
      case 'rotating-beds': return 'Rotating Sit to Stand Hospital Bed';
      case 'low-hospital-beds': return 'Low Hospital Beds';
      case 'bariatric-beds': return 'Bariatric Hospital Bed';
      case 'bed-mattresses': return 'Hospital Bed Mattresses';
      case 'bed-rails': return 'Bed Rails';
      case 'hospital-bedding': return 'Hospital Bedding';
      case 'bed-pillows': return 'Bed Pillows';
      case 'bed-accessories': return 'Bed Accessories';
      case 'overbed-table': return 'Overbed Table';
      case 'mobility': return 'Mobility Products';
      case 'mobility-scooters': return 'Mobility Scooters';
      case 'bathroom-safety': return 'Bathroom Safety';
      case 'respiratory': return 'Respiratory Equipment';
      case 'compression': return 'Compression Therapy';
      case 'diagnostics': return 'Diagnostic Equipment';
      case 'pediatric': return 'Pediatric Products';
      case 'orthopedic': return 'Orthopedic Supports';
      case 'positioning': return 'Positioning & Support';
      case 'personal-care': return 'Personal Care';
      case 'disposables': return 'Disposables';
      case 'daily-living-aids': return 'Daily Living Aids';
      case 'diabetic-footwear': return 'Diabetic & Orthopedic Footwear';
      case 'contact-lens': return 'Contact Lens';
      case 'hearing-aids': return 'Hearing Aids';
      case 'wheelchairs': return 'Wheelchairs & Transport Chairs';
      case 'patient-lifts': return 'Patient Lifts & Slings';
      case 'walkers': return 'Walkers & Rollator';
      case 'canes-crutches': return 'Canes & Crutches';
      case 'ramps': return 'Multipurpose Ramps';
      case 'stair-lift': return 'Stair Lift';
      case 'vitamins': return 'Vitamins & Supplements';
      case 'sexual-wellness': return 'Sexual Wellness';
      case 'medicines': return 'Medicines & Treatments';
      case 'household': return 'Household & Pet Essentials';
      case 'home-health': return 'Home Health Care Solutions';
      case 'fitness': return 'Fitness & Recovery';
      case 'caregiver': return 'Caregiver Essentials';
      case 'exam-rooms': return 'Exam Rooms';
      case 'physical-therapy': return 'Physical Therapy';
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
            
            <span className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Horizontal Filter Bar */}
          <div className="mb-6">
            <ComprehensiveProductFilters onFilterChange={setFilters} />
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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