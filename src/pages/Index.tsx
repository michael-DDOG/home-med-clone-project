import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { wellnessProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-medical-light py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Shop Home Med Wellness Collection
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              High-quality, affordable medical products that prioritize comfort and care
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

      {/* Filter Bar */}
      <section className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Wellness Products</h2>
              <span className="text-muted-foreground">({wellnessProducts.length} items)</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessProducts.map((product) => (
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
