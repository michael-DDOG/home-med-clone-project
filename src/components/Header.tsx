import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";

interface HeaderProps {
  onCategorySelect: (category: string) => void;
}

export const Header = ({ onCategorySelect }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Free shipping on orders over $99</span>
            <Badge variant="outline" className="text-medical-blue border-medical-blue">
              FSA/HSA Eligible Products Available
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Customer Service: (855) 466-3633</span>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80 transition-colors"
              onClick={() => navigate('/')}
            >
              APEX medtech
            </h1>
            <p className="text-muted-foreground hidden md:block">
              Health, Wellness and Much More
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 w-80">
              <input
                type="text"
                placeholder="Search for medical supplies..."
                className="bg-transparent outline-none flex-1"
              />
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs">
                0
              </Badge>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Main Navigation - Right below main header */}
        <MainNavigation />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 py-4 border-t">
          <Button variant="ghost" className="font-medium" onClick={() => onCategorySelect('all')}>
            Shop All
          </Button>
          <Button variant="ghost" className="font-medium" onClick={() => onCategorySelect('wellness')}>
            Wellness Collection
          </Button>
          <Button variant="ghost" className="font-medium" onClick={() => onCategorySelect('hospital-beds')}>
            Hospital Beds
          </Button>
          <Button variant="ghost" className="font-medium" onClick={() => onCategorySelect('mobility')}>
            Mobility Aids
          </Button>
          <Button variant="ghost" className="font-medium" onClick={() => onCategorySelect('respiratory')}>
            Respiratory
          </Button>
          <Button variant="ghost" className="font-medium" onClick={() => onCategorySelect('bathroom-safety')}>
            Bathroom Safety
          </Button>
        </nav>
      </div>
    </header>
  );
};