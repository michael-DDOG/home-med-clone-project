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
    availability: false,
    brand: false,
    price: false,
    product: false,
    fsa: false
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
    <div className="border-b border-gray-200 last:border-b-0">
      <Button
        variant="ghost"
        onClick={() => toggleSection(section)}
        className="w-full justify-between p-4 h-auto font-medium hover:bg-gray-50"
      >
        <span>{title}</span>
        {expandedSections[section] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      {expandedSections[section] && (
        <div className="px-4 pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const MultiSelectBadges = ({ items, onRemove }: { items: string[]; onRemove: (item: string) => void }) => (
    items.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2">
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
    <div className={`w-full ${className}`}>
      {/* Horizontal Filter Bar - Matches Shop Home Med */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded p-4">
        {/* Left side - Filters */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-0 h-auto font-medium"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <Select defaultValue="alphabetically">
              <SelectTrigger className="w-48 bg-white border border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                <SelectItem value="alphabetically">Alphabetically, A-Z</SelectItem>
                <SelectItem value="alphabetically-desc">Alphabetically, Z-A</SelectItem>
                <SelectItem value="price-low">Price, low to high</SelectItem>
                <SelectItem value="price-high">Price, high to low</SelectItem>
                <SelectItem value="created-desc">Date, new to old</SelectItem>
                <SelectItem value="created-asc">Date, old to new</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Right side - View Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm">View as</span>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <Button variant="outline" size="sm" className="border-0 bg-red-500 text-white rounded-none">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </Button>
            <Button variant="outline" size="sm" className="border-0 rounded-none">
              <div className="flex flex-col gap-0.5 w-4 h-4">
                <div className="bg-gray-400 h-1 rounded-sm"></div>
                <div className="bg-gray-400 h-1 rounded-sm"></div>
                <div className="bg-gray-400 h-1 rounded-sm"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Collapsible Filter Content */}
      {isOpen && (
        <div className="mt-4 bg-white border border-gray-200 rounded shadow-sm">
          
          {/* Availability Filter */}
          <FilterSection title="Availability" section="availability">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => updateFilter('inStock', checked)}
                />
                <label htmlFor="in-stock" className="text-sm">In stock</label>
                <span className="text-sm text-gray-500 ml-auto">(245)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="out-of-stock"
                  checked={!filters.inStock}
                  onCheckedChange={(checked) => updateFilter('inStock', !checked)}
                />
                <label htmlFor="out-of-stock" className="text-sm">Out of stock</label>
                <span className="text-sm text-gray-500 ml-auto">(23)</span>
              </div>
            </div>
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection title="Brand" section="brand">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {FILTER_BRANDS.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brand === brand}
                    onCheckedChange={(checked) => updateFilter('brand', checked ? brand : '')}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm flex-1">{brand}</label>
                  <span className="text-sm text-gray-500">({Math.floor(Math.random() * 50) + 1})</span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Price Filter */}
          <FilterSection title="Price" section="price">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Range</span>
                <span className="text-sm text-gray-600">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </span>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={2000}
                step={25}
                className="w-full"
              />
              <div className="text-xs text-gray-500">
                The highest price is $2,000.00
              </div>
            </div>
          </FilterSection>

          {/* Product Type Filter */}
          <FilterSection title="Product type" section="product">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {CONDITIONS_HELPED.slice(0, 10).map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition}`}
                    checked={filters.conditionsHelped.includes(condition)}
                    onCheckedChange={(checked) => 
                      checked ? addToArrayFilter('conditionsHelped', condition) : removeFromArrayFilter('conditionsHelped', condition)
                    }
                  />
                  <label htmlFor={`condition-${condition}`} className="text-sm flex-1">{condition}</label>
                  <span className="text-sm text-gray-500">({Math.floor(Math.random() * 30) + 1})</span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* FSA Eligible Filter */}
          <FilterSection title="FSA Eligible" section="fsa">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fsa-eligible"
                  checked={filters.fsaEligible}
                  onCheckedChange={(checked) => updateFilter('fsaEligible', checked)}
                />
                <label htmlFor="fsa-eligible" className="text-sm">FSA/HSA Eligible</label>
                <span className="text-sm text-gray-500 ml-auto">({Math.floor(Math.random() * 100) + 50})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-shipping"
                  checked={filters.freeShipping}
                  onCheckedChange={(checked) => updateFilter('freeShipping', checked)}
                />
                <label htmlFor="free-shipping" className="text-sm">Free Shipping</label>
                <span className="text-sm text-gray-500 ml-auto">({Math.floor(Math.random() * 80) + 30})</span>
              </div>
            </div>
          </FilterSection>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="w-full"
              >
                Clear All Filters ({activeFilterCount})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};