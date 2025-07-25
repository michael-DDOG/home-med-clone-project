import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';

interface SearchSuggestion {
  type: 'product' | 'brand' | 'category';
  name: string;
  path?: string;
  query?: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export const SearchBar = ({ className = "", placeholder = "Search for medical supplies..." }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const newSuggestions: SearchSuggestion[] = [];

    // Product suggestions
    const productSuggestions = allProducts
      .filter(product => product.name.toLowerCase().includes(searchTerm))
      .slice(0, 5)
      .map(product => ({
        type: 'product' as const,
        name: product.name,
        query: product.name
      }));

    // Brand suggestions
    const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];
    const brandSuggestions = brands
      .filter(brand => brand!.toLowerCase().includes(searchTerm))
      .slice(0, 3)
      .map(brand => ({
        type: 'brand' as const,
        name: `${brand} Products`,
        query: brand!
      }));

    // Category suggestions
    const categories = [...new Set(allProducts.map(p => p.category))];
    const categorySuggestions = categories
      .filter(category => category.toLowerCase().includes(searchTerm))
      .slice(0, 3)
      .map(category => ({
        type: 'category' as const,
        name: category,
        query: category
      }));

    newSuggestions.push(...productSuggestions, ...brandSuggestions, ...categorySuggestions);
    setSuggestions(newSuggestions.slice(0, 8));
    setSelectedIndex(-1);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
      setShowSuggestions(false);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="bg-transparent outline-none flex-1"
        />
        
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 mr-2"
            onClick={clearSearch}
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0"
          onClick={() => handleSearch()}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.name}`}
              className={`px-4 py-3 cursor-pointer border-b last:border-b-0 flex items-center gap-3 ${
                index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">{suggestion.name}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {suggestion.type === 'product' ? 'Product' : 
                   suggestion.type === 'brand' ? 'Brand' : 'Category'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};