import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

interface FilterState {
  priceRange: [number, number];
  brand: string;
  bedWidth: string;
  bedType: string;
  fsaEligible: boolean;
  features: string[];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export const ProductFilters = ({ onFilterChange, className = "" }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    brand: '',
    bedWidth: '',
    bedType: '',
    fsaEligible: false,
    features: []
  });

  const brands = [
    'ProHeal', 'Drive Medical', 'Invacare', 'MedaCure', 'Metro Mobility',
    'Climbing Steps', 'Skil-Care', 'Graham Field', 'Sammons Preston',
    'MJM International', 'NY Ortho', 'Transfer Master'
  ];

  const bedWidths = [
    '36 inches', '42 inches', '48 inches', 'Standard', 'Bariatric'
  ];

  const bedTypes = [
    'Full Electric', 'Semi Electric', 'Manual', 'Ultra Low', 'Bariatric', 
    'Adjustable', 'Bed Package'
  ];

  const features = [
    'Side Rails', 'Adjustable Height', 'Pressure Relief', 'Foam Mattress',
    'Low Height', 'Trendelenburg', 'Reverse Trendelenburg', 'Head/Foot Controls'
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const addFeature = (feature: string) => {
    if (!filters.features.includes(feature)) {
      const newFeatures = [...filters.features, feature];
      updateFilter('features', newFeatures);
    }
  };

  const removeFeature = (feature: string) => {
    const newFeatures = filters.features.filter(f => f !== feature);
    updateFilter('features', newFeatures);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      priceRange: [0, 2000],
      brand: '',
      bedWidth: '',
      bedType: '',
      fsaEligible: false,
      features: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount = 
    (filters.brand ? 1 : 0) +
    (filters.bedWidth ? 1 : 0) +
    (filters.bedType ? 1 : 0) +
    (filters.fsaEligible ? 1 : 0) +
    filters.features.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Filter Toggle Header */}
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {isOpen ? 'Hide' : 'Show'} Filters
          </span>
        </Button>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Price Range</label>
              <span className="text-sm text-muted-foreground">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              max={2000}
              step={50}
              className="w-full"
            />
          </div>

          {/* Brand Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Brand</label>
            <Select value={filters.brand} onValueChange={(value) => updateFilter('brand', value)}>
              <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                <SelectItem value="">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bed Width */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Bed Width</label>
            <Select value={filters.bedWidth} onValueChange={(value) => updateFilter('bedWidth', value)}>
              <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                <SelectItem value="">All Widths</SelectItem>
                {bedWidths.map((width) => (
                  <SelectItem key={width} value={width}>{width}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bed Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Bed Type</label>
            <Select value={filters.bedType} onValueChange={(value) => updateFilter('bedType', value)}>
              <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                <SelectItem value="">All Types</SelectItem>
                {bedTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FSA/HSA Eligible */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="fsa-eligible"
              checked={filters.fsaEligible}
              onChange={(e) => updateFilter('fsaEligible', e.target.checked)}
              className="h-4 w-4 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
            />
            <label htmlFor="fsa-eligible" className="text-sm font-medium">
              FSA/HSA Eligible Only
            </label>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Features</label>
            <div className="space-y-2">
              <Select onValueChange={addFeature}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Add feature" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {features
                    .filter(feature => !filters.features.includes(feature))
                    .map((feature) => (
                      <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              {/* Selected Features */}
              {filters.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="flex items-center gap-1 pr-1"
                    >
                      {feature}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeFeature(feature)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};