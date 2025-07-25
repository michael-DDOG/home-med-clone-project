import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { allProducts, wellnessProducts, hospitalBedsProducts, mobilityProducts, bathroomSafetyProducts, respiratoryProducts, compressionProducts, bathLiftProducts, geriChairProducts, stethoscopeProducts, positioningProducts, diabeticCareProducts, pediatricProducts, scooterProducts, orthopedicProducts, personalCareProducts, disposableProducts, sunscreenProducts, supplementProducts, walkerAccessories, clinicalEquipment, batteryProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 21;
  
  const getProductsByCategory = () => {
    switch (selectedCategory) {
      case 'wellness': return wellnessProducts;
      case 'hospital-beds': return hospitalBedsProducts;
      case 'mobility': return mobilityProducts;
      case 'bathroom-safety': return bathroomSafetyProducts;
      case 'respiratory': return respiratoryProducts;
      case 'compression': return compressionProducts;
      case 'bath-lifts': return bathLiftProducts;
      case 'seating': return geriChairProducts;
      case 'diagnostics': return stethoscopeProducts;
      case 'positioning': return positioningProducts;
      case 'diabetic-care': return diabeticCareProducts;
      case 'pediatric': return pediatricProducts;
      case 'scooters': return scooterProducts;
      case 'orthopedic': return orthopedicProducts;
      case 'personal-care': return personalCareProducts;
      case 'disposables': return disposableProducts;
      case 'sunscreen': return sunscreenProducts;
      case 'supplements': return supplementProducts;
      case 'walker-accessories': return walkerAccessories;
      case 'clinical': return clinicalEquipment;
      case 'battery': return batteryProducts;
      default: return allProducts;
    }
  };

  const currentProducts = getProductsByCategory();
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = currentProducts.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

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
      <Header onCategorySelect={setSelectedCategory} />
      
      {/* Hero Section */}
      <section className="bg-medical-light py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Shop Home Med - Complete Medical Supply Store
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              High-quality, affordable medical products from wellness devices to hospital equipment
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="text-medical-blue border-medical-blue">
                FSA/HSA Eligible
              </Badge>
              <Badge variant="outline" className="text-success border-success-foreground">
                FDA Approved Devices
              </Badge>
              <Badge variant="outline">
                Free Shipping Over $99
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Products ({allProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'wellness' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('wellness')}
            >
              Wellness ({wellnessProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'hospital-beds' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('hospital-beds')}
            >
              Hospital Beds ({hospitalBedsProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'mobility' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('mobility')}
            >
              Mobility Aids ({mobilityProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'bathroom-safety' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('bathroom-safety')}
            >
              Bathroom Safety ({bathroomSafetyProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'respiratory' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('respiratory')}
            >
              Respiratory ({respiratoryProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'compression' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('compression')}
            >
              Compression ({compressionProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'diagnostics' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('diagnostics')}
            >
              Diagnostics ({stethoscopeProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'pediatric' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('pediatric')}
            >
              Pediatric ({pediatricProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'orthopedic' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('orthopedic')}
            >
              Orthopedic ({orthopedicProducts.length})
            </Button>
            <Button 
              variant={selectedCategory === 'positioning' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('positioning')}
            >
              Positioning ({positioningProducts.length})
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                {selectedCategory === 'all' ? 'All Products' : 
                 selectedCategory === 'wellness' ? 'Wellness Collection' :
                 selectedCategory === 'hospital-beds' ? 'Hospital Beds & Mattresses' :
                 selectedCategory === 'mobility' ? 'Mobility Aids' :
                 selectedCategory === 'bathroom-safety' ? 'Bathroom Safety' :
                 selectedCategory === 'respiratory' ? 'Respiratory Equipment' :
                 selectedCategory === 'compression' ? 'Compression Therapy' :
                 selectedCategory === 'diagnostics' ? 'Diagnostic Equipment' :
                 selectedCategory === 'pediatric' ? 'Pediatric Products' :
                 selectedCategory === 'orthopedic' ? 'Orthopedic Supports' :
                 selectedCategory === 'positioning' ? 'Positioning & Support' : 'Products'}
              </h2>
              <span className="text-muted-foreground">({currentProducts.length} items)</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, currentProducts.length)} of {currentProducts.length} products
              </span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort by: Featured
              </Button>
            </div>
          </div>
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

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Satisfied Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Shop Home Med</h3>
              <p className="text-sm opacity-90">
                Your trusted partner for high-quality, affordable medical products
                that prioritize comfort and care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Wellness Collection</li>
                <li>Hospital Beds</li>
                <li>Mobility Aids</li>
                <li>Respiratory Equipment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Customer Service</li>
                <li>Returns & Exchanges</li>
                <li>Shipping Information</li>
                <li>FSA/HSA Information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-sm opacity-90 space-y-2">
                <div>(855) 466-3633</div>
                <div>support@shophomemed.com</div>
                <div>Mon-Fri 8AM-6PM EST</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
