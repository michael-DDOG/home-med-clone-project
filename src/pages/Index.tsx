import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { ComprehensiveProductFilters } from "@/components/ComprehensiveProductFilters";
import { ProductCard } from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import category images
import hospitalBedImg from '@/assets/hospital-bed.jpg';
import wheelchairImg from '@/assets/wheelchair.jpg';
import grabBarImg from '@/assets/grab-bar.jpg';
import oxygenConcentratorImg from '@/assets/oxygen-concentrator.jpg';
import pulseOximeterImg from '@/assets/pulse-oximeter.jpg';
import compressionSocksImg from '@/assets/compression-socks.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    }
  ];

  // Featured products for homepage
  const featuredProducts = allProducts.slice(0, itemsPerPage);
  
  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
      
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

      {/* Beautiful Category Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Shop Medical Equipment by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive selection of medical equipment, organized by specialty to help you find exactly what you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                image={category.image}
                title={category.title}
                onClick={() => navigate(`/category/${category.id}`)}
                className="transform hover:scale-105 transition-all duration-300"
              />
            ))}
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
            <ComprehensiveProductFilters onFilterChange={() => {}} />
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
