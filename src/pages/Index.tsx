import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { ComprehensiveProductFilters } from "@/components/ComprehensiveProductFilters";
import { ProductCard } from "@/components/ProductCard";
import DataMigration from "@/components/DataMigration";
import { allProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Import category images
import hospitalBedImg from '@/assets/hospital-bed.jpg';
import wheelchairImg from '@/assets/wheelchair.jpg';
import grabBarImg from '@/assets/grab-bar.jpg';
import oxygenConcentratorImg from '@/assets/oxygen-concentrator.jpg';
import pulseOximeterImg from '@/assets/pulse-oximeter.jpg';
import compressionSocksImg from '@/assets/compression-socks.jpg';
import dailyLivingAidsImg from '@/assets/daily-living-aids.jpg';
import diabeticFootwearImg from '@/assets/diabetic-footwear.jpg';
import contactLensImg from '@/assets/contact-lens.jpg';
import hearingAidImg from '@/assets/hearing-aid.jpg';

// Add filter interface
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

const Index = () => {
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
  
  // Category data for beautiful display cards
  const categories = [
    {
      id: 'hospital-beds',
      title: 'Hospital Beds & Mattresses',
      image: hospitalBedImg,
      description: 'Semi-electric, full electric, and manual beds with premium mattresses'
    },
    {
      id: 'mobility',
      title: 'Mobility Products',
      image: wheelchairImg,
      description: 'Wheelchairs, walkers, scooters, and mobility aids for independence'
    },
    {
      id: 'bathroom-safety',
      title: 'Bathroom Safety',
      image: grabBarImg,
      description: 'Grab bars, shower chairs, toilet safety frames, and bath accessories'
    },
    {
      id: 'hearing-aids',
      title: 'Hearing Aids',
      image: hearingAidImg,
      description: 'Digital hearing aids, amplifiers, and hearing assistance devices'
    },
    {
      id: 'contact-lens',
      title: 'Contact Lens',
      image: contactLensImg,
      description: 'Daily, monthly contact lenses and cleaning solutions'
    },
    {
      id: 'diabetic-footwear',
      title: 'Diabetic & Orthopedic Footwear',
      image: diabeticFootwearImg,
      description: 'Therapeutic shoes, diabetic socks, and orthopedic footwear'
    },
    {
      id: 'respiratory',
      title: 'Respiratory Equipment',
      image: oxygenConcentratorImg,
      description: 'Oxygen concentrators, CPAP machines, and breathing aids'
    },
    {
      id: 'wellness',
      title: 'Wellness Collection',
      image: pulseOximeterImg,
      description: 'Monitors, diagnostic tools, and wellness devices'
    },
    {
      id: 'compression',
      title: 'Compression Therapy',
      image: compressionSocksImg,
      description: 'Medical compression socks and therapeutic wear'
    },
    {
      id: 'daily-living-aids',
      title: 'Daily Living Aids',
      image: dailyLivingAidsImg,
      description: 'Hospital beds, overbed tables, and essential daily living assistance'
    }
  ];

  // Apply filters to featured products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
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
  }, [filters]);

  // Featured products for homepage
  const featuredProducts = filteredProducts.slice(0, itemsPerPage);
  
  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
      
      {/* Hero Section */}
      <section className="bg-medical-light py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-4">
              APEX medtech - Complete Medical Supply Store
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

      {/* Category Scroll Bar Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">Shop by Category</h2>
          </div>
          
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="flex-shrink-0 cursor-pointer group"
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-primary transition-colors">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-700 group-hover:text-primary transition-colors leading-tight max-w-[80px]">
                      {category.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands & Specialty Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Brands */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Shop by Brand</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Drive Medical', path: '/category/brand-drive-medical', products: '2500+ Products' },
                  { name: 'Omron', path: '/category/brand-omron', products: 'Health Monitors' },
                  { name: '3M Littmann', path: '/category/brand-3m-littmann', products: 'Stethoscopes' },
                  { name: 'Johnson & Johnson', path: '/category/brand-johnson', products: 'First Aid' },
                  { name: 'Braun', path: '/category/brand-braun', products: 'Thermometers' },
                  { name: 'Babyganics', path: '/category/brand-babyganics', products: 'Baby Care' }
                ].map((brand) => (
                  <div
                    key={brand.name}
                    onClick={() => navigate(brand.path)}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-primary"
                  >
                    <h3 className="font-semibold text-primary mb-1">{brand.name}</h3>
                    <p className="text-sm text-muted-foreground">{brand.products}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialty Categories */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Specialty Care</h2>
              <div className="space-y-3">
                {[
                  { name: 'Wound Care & Bandages', path: '/category/wound-care', icon: '🩹' },
                  { name: 'Diabetic Care Supplies', path: '/category/diabetic-supplies', icon: '💉' },
                  { name: 'Physical Therapy Equipment', path: '/category/physical-therapy-equipment', icon: '🏃‍♂️' },
                  { name: 'Baby Bath & Safety', path: '/category/baby-bath-safety', icon: '🛁' },
                  { name: 'Baby Feeding & Nutrition', path: '/category/baby-feeding', icon: '🍼' },
                  { name: 'Respiratory Accessories', path: '/category/respiratory-accessories', icon: '😤' }
                ].map((specialty) => (
                  <div
                    key={specialty.name}
                    onClick={() => navigate(specialty.path)}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-primary flex items-center gap-3"
                  >
                    <span className="text-2xl">{specialty.icon}</span>
                    <h3 className="font-medium text-primary">{specialty.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">
              Explore our most popular medical equipment and supplies
            </p>
          </div>
          
          {/* Filter Bar */}
          <div className="mb-8">
            <ComprehensiveProductFilters onFilterChange={setFilters} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/category/all')}
              className="bg-medical-blue hover:bg-medical-blue/90"
            >
              View All Products
            </Button>
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
              <h3 className="font-bold text-lg mb-4">APEX medtech</h3>
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
