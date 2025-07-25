import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

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

interface ComprehensiveProductFiltersProps {
  onFilterChange: (filters: ComprehensiveFilterState) => void;
  className?: string;
}

export const ComprehensiveProductFilters = ({ onFilterChange, className = "" }: ComprehensiveProductFiltersProps) => {
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

  return (
    <div className={`w-full ${className}`}>
      {/* Horizontal Filter Bar */}
      <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium text-sm">Filters</span>
        </div>
        
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by</span>
          <Select defaultValue="alphabetically">
            <SelectTrigger className="w-48 bg-white border border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="alphabetically">Alphabetically, A-Z</SelectItem>
              <SelectItem value="price-low">Price, low to high</SelectItem>
              <SelectItem value="price-high">Price, high to low</SelectItem>
              <SelectItem value="rating">Customer rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm">View as</span>
          <div className="flex border border-gray-300 rounded">
            <Button variant="outline" size="sm" className="border-0 bg-red-500 text-white">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </Button>
            <Button variant="outline" size="sm" className="border-0">
              <div className="flex flex-col gap-0.5 w-4 h-4">
                <div className="bg-gray-400 h-1 rounded-sm"></div>
                <div className="bg-gray-400 h-1 rounded-sm"></div>
                <div className="bg-gray-400 h-1 rounded-sm"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};