// Comprehensive filter constants based on APEX medtech website analysis

export const FILTER_BRANDS = [
  'Aqua Creek', 'Circle Specialty', 'Climbing Steps', 'Comfort Company',
  'Drive Medical', 'Ergo Med Products', 'Feather Mobility', 'Good Pillow',
  'Graham Field', 'iCare Medical', 'Inspired by Drive', 'Invacare',
  'MDS', 'Med-Mizer', 'MedaCure', 'Metro Mobility', 'MJM International',
  'NY Ortho', 'Parks Health', 'Proactive Medical', 'ProHeal',
  'Pursonic USA', 'Sammons Preston', 'APEX medtech', 'Skil-Care',
  'SMILEZ', 'StarSleep', 'SuperHandy', 'Transfer Master'
];

export const PATIENT_PROFILES = [
  'Bed Package', 'Full Electric', 'Semi Electric', 'Rotating Sit to Stand',
  'Adjustable', 'Ultra Low', 'Bariatric', 'Manual', 'Standard Height',
  'Low Height', 'Heavy Duty', 'Pediatric', 'Geriatric'
];

export const WEIGHT_CAPACITIES = [
  'Up to 250 lbs', '250-350 lbs', '350-450 lbs', '450-600 lbs',
  '600+ lbs (Bariatric)', 'Heavy Duty', 'Standard'
];

export const BED_WIDTHS = [
  '30 inches', '32 inches', '35 inches', '36 inches', '39 inches',
  '42 inches', '45 inches', '48 inches', '54 inches', 'Twin',
  'Full', 'Standard', 'Wide', 'Bariatric'
];

export const BED_LENGTHS = [
  '75 inches', '76 inches', '80 inches', '84 inches', '88 inches',
  'Standard', 'Extended', 'Long'
];

export const MATTRESS_TYPES = [
  'Foam', 'Innerspring', 'Memory Foam', 'Gel', 'Air', 'Pressure Relief',
  'Alternating Pressure', 'Low Air Loss', 'Therapeutic', 'Standard'
];

export const MOBILITY_FEATURES = [
  'Foldable', 'Lightweight', 'Heavy Duty', 'Adjustable Height',
  'Swivel Wheels', 'Locking Brakes', 'Padded Seat', 'Removable Arms',
  'Flip-up Footrests', 'Anti-tip', 'Seat Belt', 'Cushions Included'
];

export const POWER_FEATURES = [
  'Battery Powered', 'Manual', 'Electric', 'Rechargeable',
  'AC Adapter', 'Backup Battery', 'Low Battery Indicator'
];

export const CERTIFICATIONS = [
  'FDA Approved', 'FDA Cleared', 'CE Marked', 'ISO Certified',
  'CMS Approved', 'Medicare Approved', 'ADA Compliant',
  'CertiPUR-US Certified', 'Medical Grade'
];

export const MATERIAL_TYPES = [
  'Aluminum', 'Steel', 'Stainless Steel', 'Chrome', 'Plastic',
  'Vinyl', 'Fabric', 'Leather', 'Mesh', 'Foam', 'Gel',
  'Memory Foam', 'Latex-Free', 'Antimicrobial'
];

export const ROOM_LOCATIONS = [
  'Bedroom', 'Bathroom', 'Living Room', 'Kitchen', 'Outdoor',
  'Portable', 'Bedside', 'Shower', 'Toilet', 'Bathtub'
];

export const CONDITIONS_HELPED = [
  'Mobility Issues', 'Back Pain', 'Joint Pain', 'Arthritis',
  'Recovery', 'Post-Surgery', 'Elderly Care', 'Disability',
  'Fall Prevention', 'Pressure Sores', 'Circulation Issues',
  'Respiratory Issues', 'Sleep Apnea', 'Diabetes'
];

export const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $250', min: 100, max: 250 },
  { label: '$250 - $500', min: 250, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: '$2000+', min: 2000, max: 10000 }
];

export const RATING_FILTERS = [
  { label: '4+ Stars', value: 4 },
  { label: '3+ Stars', value: 3 },
  { label: '2+ Stars', value: 2 },
  { label: '1+ Stars', value: 1 }
];

export const AVAILABILITY_FILTERS = [
  'In Stock', 'Free Shipping', 'Same Day Delivery',
  'Next Day Delivery', 'Special Order', 'Pre-Order'
];