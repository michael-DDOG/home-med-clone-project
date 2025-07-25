import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { allProducts, wellnessProducts, hospitalBedsProducts, mobilityProducts, bathroomSafetyProducts, respiratoryProducts, compressionProducts, bathLiftProducts, geriChairProducts, stethoscopeProducts, positioningProducts, diabeticCareProducts, pediatricProducts, scooterProducts, orthopedicProducts, personalCareProducts, disposableProducts, sunscreenProducts, supplementProducts, walkerAccessories, clinicalEquipment, batteryProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
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
