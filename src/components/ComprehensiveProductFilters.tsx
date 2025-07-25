import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { 
  FILTER_BRANDS, PATIENT_PROFILES, WEIGHT_CAPACITIES, BED_WIDTHS, 
  BED_LENGTHS, MATTRESS_TYPES, MOBILITY_FEATURES, POWER_FEATURES,
  CERTIFICATIONS, MATERIAL_TYPES, ROOM_LOCATIONS, CONDITIONS_HELPED,
  PRICE_RANGES, RATING_FILTERS, AVAILABILITY_FILTERS
} from "@/constants/FilterConstants";

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
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    specifications: false,
    features: false,
    certifications: false,
    conditions: false
  });

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

  const updateFilter = (key: keyof ComprehensiveFilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectChange = (key: keyof ComprehensiveFilterState, value: string) => {
    let actualValue = value;
    if (value.startsWith('all-')) {
      actualValue = '';
    }
    updateFilter(key, actualValue);
  };

  const addToArrayFilter = (key: keyof ComprehensiveFilterState, value: string) => {
    const currentArray = filters[key] as string[];
    if (!currentArray.includes(value)) {
      updateFilter(key, [...currentArray, value]);
    }
  };

  const removeFromArrayFilter = (key: keyof ComprehensiveFilterState, value: string) => {
    const currentArray = filters[key] as string[];
    updateFilter(key, currentArray.filter(item => item !== value));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    const clearedFilters: ComprehensiveFilterState = {
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
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount = 
    (filters.brand ? 1 : 0) +
    filters.patientProfile.length +
    (filters.weightCapacity ? 1 : 0) +
    (filters.bedWidth ? 1 : 0) +
    (filters.bedLength ? 1 : 0) +
    (filters.mattressType ? 1 : 0) +
    filters.mobilityFeatures.length +
    filters.powerFeatures.length +
    filters.certifications.length +
    filters.materials.length +
    filters.roomLocation.length +
    filters.conditionsHelped.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.fsaEligible ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.freeShipping ? 1 : 0) +
    filters.availability.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0);

  const FilterSection = ({ title, section, children }: { title: string; section: string; children: React.ReactNode }) => (
    <div className="border border-gray-200 rounded-lg">
      <Button
        variant="ghost"
        onClick={() => toggleSection(section)}
        className="w-full justify-between p-3 h-auto"
      >
        <span className="font-medium">{title}</span>
        {expandedSections[section] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      {expandedSections[section] && (
        <div className="p-3 border-t border-gray-200 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const MultiSelectBadges = ({ items, onRemove }: { items: string[]; onRemove: (item: string) => void }) => (
    items.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="secondary" className="flex items-center gap-1 pr-1">
            {item}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemove(item)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    )
  );

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
            <span className="font-medium">Advanced Filters</span>
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
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          
          {/* Basic Filters */}
          <FilterSection title="Basic Filters" section="basic">
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

            {/* Brand */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Brand</label>
              <Select value={filters.brand || 'all-brands'} onValueChange={(value) => handleSelectChange('brand', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto">
                  <SelectItem value="all-brands">All Brands</SelectItem>
                  {FILTER_BRANDS.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Minimum Rating</label>
              <Select value={filters.minRating.toString()} onValueChange={(value) => updateFilter('minRating', parseInt(value))}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="0">Any Rating</SelectItem>
                  {RATING_FILTERS.map((rating) => (
                    <SelectItem key={rating.value} value={rating.value.toString()}>
                      {rating.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fsa-eligible"
                  checked={filters.fsaEligible}
                  onCheckedChange={(checked) => updateFilter('fsaEligible', checked)}
                />
                <label htmlFor="fsa-eligible" className="text-sm font-medium">FSA/HSA Eligible</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => updateFilter('inStock', checked)}
                />
                <label htmlFor="in-stock" className="text-sm font-medium">In Stock Only</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-shipping"
                  checked={filters.freeShipping}
                  onCheckedChange={(checked) => updateFilter('freeShipping', checked)}
                />
                <label htmlFor="free-shipping" className="text-sm font-medium">Free Shipping</label>
              </div>
            </div>
          </FilterSection>

          {/* Product Specifications */}
          <FilterSection title="Product Specifications" section="specifications">
            {/* Patient Profile */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Patient Profile</label>
              <Select onValueChange={(value) => addToArrayFilter('patientProfile', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Add patient profile" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto">
                  {PATIENT_PROFILES
                    .filter(profile => !filters.patientProfile.includes(profile))
                    .map((profile) => (
                      <SelectItem key={profile} value={profile}>{profile}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <MultiSelectBadges 
                items={filters.patientProfile} 
                onRemove={(item) => removeFromArrayFilter('patientProfile', item)} 
              />
            </div>

            {/* Weight Capacity */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Weight Capacity</label>
              <Select value={filters.weightCapacity || 'all-weights'} onValueChange={(value) => handleSelectChange('weightCapacity', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Select weight capacity" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="all-weights">All Weight Capacities</SelectItem>
                  {WEIGHT_CAPACITIES.map((capacity) => (
                    <SelectItem key={capacity} value={capacity}>{capacity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bed Dimensions */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Bed Width</label>
              <Select value={filters.bedWidth || 'all-widths'} onValueChange={(value) => handleSelectChange('bedWidth', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Select width" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto">
                  <SelectItem value="all-widths">All Widths</SelectItem>
                  {BED_WIDTHS.map((width) => (
                    <SelectItem key={width} value={width}>{width}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FilterSection>

          {/* Features */}
          <FilterSection title="Features & Capabilities" section="features">
            {/* Mobility Features */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Mobility Features</label>
              <Select onValueChange={(value) => addToArrayFilter('mobilityFeatures', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Add mobility feature" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto">
                  {MOBILITY_FEATURES
                    .filter(feature => !filters.mobilityFeatures.includes(feature))
                    .map((feature) => (
                      <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <MultiSelectBadges 
                items={filters.mobilityFeatures} 
                onRemove={(item) => removeFromArrayFilter('mobilityFeatures', item)} 
              />
            </div>

            {/* Room Location */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Room/Location</label>
              <Select onValueChange={(value) => addToArrayFilter('roomLocation', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Add location" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {ROOM_LOCATIONS
                    .filter(location => !filters.roomLocation.includes(location))
                    .map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <MultiSelectBadges 
                items={filters.roomLocation} 
                onRemove={(item) => removeFromArrayFilter('roomLocation', item)} 
              />
            </div>
          </FilterSection>

          {/* Certifications */}
          <FilterSection title="Certifications & Materials" section="certifications">
            {/* Certifications */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Certifications</label>
              <Select onValueChange={(value) => addToArrayFilter('certifications', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Add certification" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {CERTIFICATIONS
                    .filter(cert => !filters.certifications.includes(cert))
                    .map((cert) => (
                      <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <MultiSelectBadges 
                items={filters.certifications} 
                onRemove={(item) => removeFromArrayFilter('certifications', item)} 
              />
            </div>
          </FilterSection>

          {/* Conditions Helped */}
          <FilterSection title="Conditions & Medical Needs" section="conditions">
            <div className="space-y-3">
              <label className="text-sm font-medium">Conditions Helped</label>
              <Select onValueChange={(value) => addToArrayFilter('conditionsHelped', value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Add condition" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto">
                  {CONDITIONS_HELPED
                    .filter(condition => !filters.conditionsHelped.includes(condition))
                    .map((condition) => (
                      <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <MultiSelectBadges 
                items={filters.conditionsHelped} 
                onRemove={(item) => removeFromArrayFilter('conditionsHelped', item)} 
              />
            </div>
          </FilterSection>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full"
            >
              Clear All Filters ({activeFilterCount})
            </Button>
          )}
        </div>
      )}
    </div>
  );
};