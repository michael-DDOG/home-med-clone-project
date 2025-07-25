import pulseOximeterImg from '@/assets/pulse-oximeter.jpg';
import bloodPressureImg from '@/assets/blood-pressure-monitor.jpg';
import tensUnitImg from '@/assets/tens-unit.jpg';
import thermometerImg from '@/assets/thermometer.jpg';
import nebulizerImg from '@/assets/nebulizer.jpg';
import glucoseMeterImg from '@/assets/glucose-meter.jpg';
import hospitalBedImg from '@/assets/hospital-bed.jpg';
import walkerImg from '@/assets/walker.jpg';
import wheelchairImg from '@/assets/wheelchair.jpg';
import grabBarImg from '@/assets/grab-bar.jpg';
import toiletSafetyFrameImg from '@/assets/toilet-safety-frame.jpg';
import oxygenConcentratorImg from '@/assets/oxygen-concentrator.jpg';
import cpapMachineImg from '@/assets/cpap-machine.jpg';
import compressionSocksImg from '@/assets/compression-socks.jpg';
import caneImg from '@/assets/cane.jpg';
import bedsideCommodeImg from '@/assets/bedside-commode.jpg';
import showerChairImg from '@/assets/shower-chair.jpg';
import medicalMattressImg from '@/assets/medical-mattress.jpg';
import dailyLivingAidsImg from '@/assets/daily-living-aids.jpg';
import diabeticFootwearImg from '@/assets/diabetic-footwear.jpg';
import contactLensImg from '@/assets/contact-lens.jpg';
import hearingAidImg from '@/assets/hearing-aid.jpg';

// New specific product images
import diabeticWalkingShoesImg from '@/assets/diabetic-walking-shoes.jpg';
import orthopedicSlippersImg from '@/assets/orthopedic-slippers.jpg';
import postSurgeryShoesImg from '@/assets/post-surgery-shoes.jpg';
import archSupportInsolesImg from '@/assets/arch-support-insoles.jpg';
import multifocalLensesImg from '@/assets/multifocal-lenses.jpg';
import lensCleaningSolutionImg from '@/assets/lens-cleaning-solution.jpg';
import toricLensesImg from '@/assets/toric-lenses.jpg';
import lensTravelCaseImg from '@/assets/lens-travel-case.jpg';
import invisibleHearingAidImg from '@/assets/invisible-hearing-aid.jpg';
import bluetoothHearingAidImg from '@/assets/bluetooth-hearing-aid.jpg';
import hearingAidCleaningKitImg from '@/assets/hearing-aid-cleaning-kit.jpg';
import hearingAidBatteriesImg from '@/assets/hearing-aid-batteries.jpg';
import stethoscopeImg from '@/assets/stethoscope.jpg';
import airWalkerBootImg from '@/assets/air-walker-boot.jpg';
import nitrileGlovesImg from '@/assets/nitrile-gloves.jpg';
import babySunscreenImg from '@/assets/baby-sunscreen.jpg';
import diabeticSocksImg from '@/assets/diabetic-socks.jpg';
import batteryHousingImg from '@/assets/battery-housing.jpg';
import mobilityBatteryPackImg from '@/assets/mobility-battery-pack.jpg';

export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice?: number;
  currentPrice: number;
  rating: number;
  reviewCount: number;
  isStaffPick?: boolean;
  isFsaEligible?: boolean;
  badges?: string[];
  category: string;
  // Enhanced metadata for comprehensive filtering
  brand?: string;
  patientProfile?: string[];
  weightCapacity?: string;
  bedWidth?: string;
  bedLength?: string;
  mattressType?: string;
  mobilityFeatures?: string[];
  powerFeatures?: string[];
  certifications?: string[];
  materials?: string[];
  roomLocation?: string[];
  conditionsHelped?: string[];
  inStock?: boolean;
  freeShipping?: boolean;
  dimensions?: {
    width?: string;
    length?: string;
    height?: string;
    weight?: string;
  };
}

// Import the comprehensive product generator
import { generateComprehensiveCatalog } from '@/utils/productGenerator';

// Generate 100+ products for each category
const generatedCatalog = generateComprehensiveCatalog();

// Base wellness products
const baseWellnessProducts: Product[] = [
  {
    id: 'pulse-ox-1',
    name: 'Digital Fingertip Pulse Oximeter - SpO2 & Heart Rate Monitor',
    image: pulseOximeterImg,
    originalPrice: 79.99,
    currentPrice: 49.99,
    rating: 4.8,
    reviewCount: 1247,
    isStaffPick: true,
    isFsaEligible: true,
    badges: ['Best Seller'],
    category: 'Monitoring',
    brand: 'ProHeal',
    patientProfile: ['Standard', 'Elderly Care'],
    powerFeatures: ['Battery Powered', 'Low Battery Indicator'],
    certifications: ['FDA Cleared', 'CE Marked'],
    materials: ['Plastic', 'Latex-Free'],
    roomLocation: ['Bedroom', 'Living Room', 'Portable'],
    conditionsHelped: ['Respiratory Issues', 'Recovery'],
    inStock: true,
    freeShipping: true,
    dimensions: { width: '2.4"', length: '1.4"', height: '1.2"', weight: '2 oz' }
  },
  {
    id: 'bp-monitor-1',
    name: 'Automatic Upper Arm Blood Pressure Monitor with Large Display',
    image: bloodPressureImg,
    originalPrice: 89.99,
    currentPrice: 59.99,
    rating: 4.6,
    reviewCount: 892,
    isFsaEligible: true,
    badges: ['Clinically Validated'],
    category: 'Monitoring',
    brand: 'Drive Medical',
    patientProfile: ['Standard', 'Elderly Care', 'Hypertension'],
    powerFeatures: ['AC Adapter', 'Battery Powered'],
    certifications: ['FDA Approved', 'Clinically Validated'],
    materials: ['Plastic', 'Fabric Cuff'],
    roomLocation: ['Bedroom', 'Living Room'],
    conditionsHelped: ['Hypertension', 'Heart Disease', 'Recovery'],
    inStock: true,
    freeShipping: true,
    dimensions: { width: '7.1"', length: '5.7"', height: '3.4"', weight: '1.8 lbs' }
  },
  {
    id: 'tens-1',
    name: 'TENS Unit for Pain Relief - 12 Modes Therapy Device',
    image: tensUnitImg,
    originalPrice: 129.99,
    currentPrice: 89.99,
    rating: 4.5,
    reviewCount: 634,
    isFsaEligible: true,
    badges: ['FDA Cleared'],
    category: 'Pain Relief',
    brand: 'ProHeal',
    patientProfile: ['Pain Management', 'Recovery', 'Arthritis'],
    powerFeatures: ['Rechargeable', 'Low Battery Indicator'],
    certifications: ['FDA Cleared', 'Medical Grade'],
    materials: ['Plastic', 'Silicone Pads'],
    roomLocation: ['Bedroom', 'Living Room', 'Portable'],
    conditionsHelped: ['Back Pain', 'Joint Pain', 'Arthritis', 'Recovery'],
    inStock: true,
    freeShipping: true,
    dimensions: { width: '4.2"', length: '3.1"', height: '1.2"', weight: '6 oz' }
  },
  {
    id: 'thermometer-1',
    name: 'Non-Contact Infrared Forehead Thermometer',
    image: thermometerImg,
    originalPrice: 59.99,
    currentPrice: 39.99,
    rating: 4.7,
    reviewCount: 1156,
    isStaffPick: true,
    isFsaEligible: true,
    category: 'Monitoring'
  },
  {
    id: 'nebulizer-1',
    name: 'Compressor Nebulizer Machine with Adult & Child Masks',
    image: nebulizerImg,
    originalPrice: 199.99,
    currentPrice: 149.99,
    rating: 4.4,
    reviewCount: 456,
    isFsaEligible: true,
    badges: ['Professional Grade'],
    category: 'Respiratory'
  },
  {
    id: 'glucose-1',
    name: 'Blood Glucose Monitoring System Starter Kit',
    image: glucoseMeterImg,
    originalPrice: 49.99,
    currentPrice: 29.99,
    rating: 4.6,
    reviewCount: 789,
    isFsaEligible: true,
    badges: ['No Coding Required'],
    category: 'Diabetes Care'
  }
];

// Expanded product categories with 100+ products each
export const wellnessProducts: Product[] = [
  ...baseWellnessProducts,
  ...generatedCatalog.wellness
];

export const hospitalBedsProducts: Product[] = [
  {
    id: 'hospital-bed-1',
    name: 'Semi-Electric Hospital Bed with Side Rails - Full Package',
    image: hospitalBedImg,
    originalPrice: 899.99,
    currentPrice: 778.17,
    rating: 4.7,
    reviewCount: 324,
    isStaffPick: true,
    isFsaEligible: true,
    badges: ['Free Assembly'],
    category: 'Hospital Beds'
  },
  {
    id: 'medical-mattress-1',
    name: 'Pressure Relief Foam Mattress - Hospital Grade',
    image: medicalMattressImg,
    originalPrice: 399.99,
    currentPrice: 299.98,
    rating: 4.5,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['CertiPUR-US Certified'],
    category: 'Hospital Beds'
  },
  ...generatedCatalog.hospitalBeds
];

export const mobilityProducts: Product[] = [
  {
    id: 'wheelchair-1',
    name: 'Lightweight Transport Wheelchair - 19" Seat Width',
    image: wheelchairImg,
    originalPrice: 199.99,
    currentPrice: 149.99,
    rating: 4.6,
    reviewCount: 567,
    isFsaEligible: true,
    badges: ['Foldable'],
    category: 'Mobility'
  },
  {
    id: 'walker-1',
    name: 'Deluxe Two Button Folding Walker with Wheels',
    image: walkerImg,
    originalPrice: 89.99,
    currentPrice: 69.99,
    rating: 4.7,
    reviewCount: 823,
    isFsaEligible: true,
    badges: ['Height Adjustable'],
    category: 'Mobility'
  },
  {
    id: 'cane-1',
    name: 'Adjustable Aluminum Walking Cane with Ergonomic Handle',
    image: caneImg,
    originalPrice: 29.99,
    currentPrice: 19.99,
    rating: 4.4,
    reviewCount: 445,
    isFsaEligible: true,
    category: 'Mobility'
  },
  ...generatedCatalog.mobility
];

export const bathroomSafetyProducts: Product[] = [
  {
    id: 'grab-bar-1',
    name: 'Stainless Steel Grab Bar - 24 Inch Safety Rail',
    image: grabBarImg,
    originalPrice: 49.99,
    currentPrice: 34.99,
    rating: 4.8,
    reviewCount: 678,
    isFsaEligible: true,
    badges: ['ADA Compliant'],
    category: 'Bathroom Safety'
  },
  {
    id: 'toilet-safety-1',
    name: 'Toilet Safety Frame with Adjustable Height Arms',
    image: toiletSafetyFrameImg,
    originalPrice: 79.99,
    currentPrice: 59.99,
    rating: 4.5,
    reviewCount: 389,
    isFsaEligible: true,
    badges: ['Tool-Free Assembly'],
    category: 'Bathroom Safety'
  },
  {
    id: 'shower-chair-1',
    name: 'Shower Chair with Back and Arms - Non-Slip',
    image: showerChairImg,
    originalPrice: 89.99,
    currentPrice: 69.99,
    rating: 4.6,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Rust Resistant'],
    category: 'Bathroom Safety'
  },
  {
    id: 'bedside-commode-1',
    name: 'Bedside Commode Chair with Removable Bucket',
    image: bedsideCommodeImg,
    originalPrice: 119.99,
    currentPrice: 89.99,
    rating: 4.3,
    reviewCount: 167,
    isFsaEligible: true,
    badges: ['Easy Clean'],
    category: 'Bathroom Safety'
  },
  ...generatedCatalog.bathroomSafety
];

export const respiratoryProducts: Product[] = [
  {
    id: 'oxygen-concentrator-1',
    name: 'Portable Oxygen Concentrator - 5L/min Flow Rate',
    image: oxygenConcentratorImg,
    originalPrice: 1299.99,
    currentPrice: 999.99,
    rating: 4.7,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['FDA Approved', 'Warranty Included'],
    category: 'Respiratory'
  },
  {
    id: 'cpap-1',
    name: 'CPAP Machine with Heated Humidifier and Mask',
    image: cpapMachineImg,
    originalPrice: 899.99,
    currentPrice: 699.99,
    rating: 4.5,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Auto-Adjusting'],
    category: 'Respiratory'
  },
  ...generatedCatalog.respiratory
];

export const compressionProducts: Product[] = [
  {
    id: 'compression-socks-1',
    name: 'Medical Compression Socks - 15-20 mmHg Graduated',
    image: compressionSocksImg,
    originalPrice: 39.99,
    currentPrice: 24.99,
    rating: 4.6,
    reviewCount: 567,
    isFsaEligible: true,
    badges: ['Moisture Wicking'],
    category: 'Compression'
  },
  ...generatedCatalog.compression
];

export const stethoscopeProducts: Product[] = [
  {
    id: 'stethoscope-1',
    name: '3M Healthcare Littmann Master Cardiology Stethoscope',
    image: stethoscopeImg,
    originalPrice: 349.99,
    currentPrice: 299.99,
    rating: 4.9,
    reviewCount: 567,
    isStaffPick: true,
    isFsaEligible: true,
    badges: ['3M Littmann', 'Professional Grade'],
    category: 'Diagnostics'
  },
  {
    id: 'stethoscope-2',
    name: '3M Littmann Lightweight II S.E. Stethoscope',
    image: stethoscopeImg,
    originalPrice: 149.99,
    currentPrice: 129.99,
    rating: 4.7,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Black Tube', 'Lightweight'],
    category: 'Diagnostics'
  },
  ...generatedCatalog.diagnostics
];

export const pediatricProducts: Product[] = [
  {
    id: 'pediatric-1',
    name: 'Smilez Pediatric Wheelchair - Lightweight Kids Wheelchair',
    image: wheelchairImg,
    originalPrice: 599.99,
    currentPrice: 499.99,
    rating: 4.8,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Anti-Tippers', 'Cushion Seat'],
    category: 'Pediatric'
  },
  {
    id: 'pediatric-2',
    name: 'Inspired by Drive Trotter Pediatric Specialty Stroller',
    image: wheelchairImg,
    originalPrice: 899.99,
    currentPrice: 799.99,
    rating: 4.6,
    reviewCount: 34,
    isFsaEligible: true,
    badges: ['Footrest Included', 'Specialty Design'],
    category: 'Pediatric'
  },
  ...generatedCatalog.pediatric
];

export const orthopedicProducts: Product[] = [
  {
    id: 'orthopedic-1',
    name: '360 Air Walker Boot',
    image: airWalkerBootImg,
    originalPrice: 159.99,
    currentPrice: 129.99,
    rating: 4.3,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Sammons Preston', 'Air Technology'],
    category: 'Orthopedic'
  },
  {
    id: 'orthopedic-2',
    name: 'Abduction Pillow - Regular Foam',
    image: medicalMattressImg,
    originalPrice: 79.99,
    currentPrice: 64.99,
    rating: 4.4,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Rolyan Brand', 'Regular Foam'],
    category: 'Orthopedic'
  },
  ...generatedCatalog.orthopedic
];

export const positioningProducts: Product[] = [
  {
    id: 'positioning-1',
    name: '30-Degree Bed Positioning Wedge',
    image: medicalMattressImg,
    originalPrice: 89.99,
    currentPrice: 74.99,
    rating: 4.4,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Pressure Relief', 'Skil-Care'],
    category: 'Positioning'
  },
  {
    id: 'positioning-2',
    name: '45-Degree Positioning Wedge - Pair',
    image: medicalMattressImg,
    originalPrice: 119.99,
    currentPrice: 99.99,
    rating: 4.5,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['Pair Included', 'Ergonomic'],
    category: 'Positioning'
  },
  ...generatedCatalog.positioning
];

export const personalCareProducts: Product[] = [
  {
    id: 'personal-care-1',
    name: 'HotShotz 10" Round Reusable Heat Pack',
    image: tensUnitImg,
    originalPrice: 39.99,
    currentPrice: 29.99,
    rating: 4.8,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Reusable', 'Long-Lasting'],
    category: 'Pain Relief'
  },
  {
    id: 'personal-care-2',
    name: 'HotShotz 3x5 Reusable Hand Warmer & Cold Pack',
    image: tensUnitImg,
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.7,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Dual Purpose', 'Compact'],
    category: 'Pain Relief'
  },
  ...generatedCatalog.personalCare
];

export const disposableProducts: Product[] = [
  {
    id: 'disposable-1',
    name: 'ProCure Nitrile Gloves (Powder Free)',
    image: nitrileGlovesImg,
    originalPrice: 34.99,
    currentPrice: 27.99,
    rating: 4.6,
    reviewCount: 567,
    isFsaEligible: true,
    badges: ['Powder Free', 'Nitrile'],
    category: 'Disposables'
  },
  ...generatedCatalog.disposables
];

// Smaller categories from the original site
export const bathLiftProducts: Product[] = [
  {
    id: 'bath-lift-1',
    name: '2-in-1 Bath Lift and Fall Recovery Lift',
    image: bedsideCommodeImg,
    currentPrice: 399.99,
    rating: 4.8,
    reviewCount: 125,
    isStaffPick: true,
    isFsaEligible: true,
    badges: ['Emergency Stop', 'Aluminum Construction'],
    category: 'Bath Lifts'
  },
  {
    id: 'bath-lift-2',
    name: '3-in-1 Sidekick Ultralight Shower Chair with Commode',
    image: showerChairImg,
    currentPrice: 424.99,
    rating: 4.7,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['3-in-1 Design', 'Rust-Proof'],
    category: 'Bath Lifts'
  }
];

export const geriChairProducts: Product[] = [
  {
    id: 'geri-chair-1',
    name: '3 Position Geri Chair Recliner with Meal Tray',
    image: wheelchairImg,
    originalPrice: 799.99,
    currentPrice: 699.99,
    rating: 4.6,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['250 lbs Capacity', '5 Casters'],
    category: 'Seating & Positioning'
  }
];

export const diabeticCareProducts: Product[] = [
  {
    id: 'diabetic-1',
    name: 'Abbott Freestyle Lite Blood Glucose Monitoring Kit',
    image: glucoseMeterImg,
    originalPrice: 79.99,
    currentPrice: 59.99,
    rating: 4.7,
    reviewCount: 445,
    isFsaEligible: true,
    badges: ['Abbott Brand', 'Complete Kit'],
    category: 'Diabetes Care'
  }
];

export const scooterProducts: Product[] = [
  {
    id: 'scooter-1',
    name: 'Feather 27X Lightweight Travel Scooter - 4 Wheel Foldable',
    image: wheelchairImg,
    originalPrice: 1599.99,
    currentPrice: 1399.99,
    rating: 4.5,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Only 27 lbs', 'Foldable'],
    category: 'Mobility'
  }
];

export const sunscreenProducts: Product[] = [
  {
    id: 'sunscreen-1',
    name: 'Coppertone Waterbabies Baby Sunscreen Lotion SPF 50',
    image: babySunscreenImg,
    originalPrice: 14.99,
    currentPrice: 11.99,
    rating: 4.7,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['SPF 50', 'Baby Safe'],
    category: 'Sun Protection'
  }
];

export const supplementProducts: Product[] = [
  {
    id: 'supplement-1',
    name: 'Gas-X Maximum Strength Gas Relief Softgels - 30 Ct',
    image: glucoseMeterImg,
    originalPrice: 12.99,
    currentPrice: 9.99,
    rating: 4.5,
    reviewCount: 445,
    isFsaEligible: true,
    badges: ['Maximum Strength', '30 Count'],
    category: 'Digestive Health'
  },
  {
    id: 'supplement-2',
    name: 'Cure Hydrating Electrolyte Drink Mix - Lemonade',
    image: glucoseMeterImg,
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.4,
    reviewCount: 178,
    badges: ['Electrolyte', 'Lemonade Flavor'],
    category: 'Hydration'
  }
];

export const walkerAccessories: Product[] = [
  {
    id: 'walker-acc-1',
    name: '5" Walker Wheel Replacement',
    image: walkerImg,
    originalPrice: 29.99,
    currentPrice: 24.99,
    rating: 4.5,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['5 Inch', 'Replacement'],
    category: 'Walker Accessories'
  }
];

export const clinicalEquipment: Product[] = [
  {
    id: 'clinical-1',
    name: '67001 Store & Go Cart',
    image: hospitalBedImg,
    originalPrice: 399.99,
    currentPrice: 349.99,
    rating: 4.4,
    reviewCount: 45,
    badges: ['Clinton Brand', 'Mobile Storage'],
    category: 'Clinical Equipment'
  }
];

export const batteryProducts: Product[] = [
  {
    id: 'battery-1',
    name: '20AH Battery Housing',
    image: batteryHousingImg,
    currentPrice: 100.00,
    rating: 4.2,
    reviewCount: 67,
    badges: ['20AH Capacity', 'Metro Mobility'],
    category: 'Battery & Power'
  }
];

// New Daily Living Aids Products (copied from website)
export const dailyLivingAidsProducts: Product[] = [
  {
    id: 'dla-1',
    name: 'Drive Medical Hospital Bed Bedding in a Box',
    image: hospitalBedImg,
    originalPrice: 66.45,
    currentPrice: 39.99,
    rating: 4.4,
    reviewCount: 5,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-2',
    name: 'Invacare Full Electric Hospital Bed Package',
    image: hospitalBedImg,
    currentPrice: 789.99,
    rating: 4.49,
    reviewCount: 45,
    isStaffPick: true,
    isFsaEligible: true,
    badges: ['TOP SELLER'],
    category: 'Daily Living Aids',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-3',
    name: 'Medical Overbed Table with Wheels for Home and Hospital Use - Cherry',
    image: dailyLivingAidsImg,
    currentPrice: 64.98,
    rating: 4.87,
    reviewCount: 31,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-4',
    name: 'Full Electric Hospital Bed with Foam Mattress - Half Rails - Adjustable Height',
    image: hospitalBedImg,
    currentPrice: 778.17,
    rating: 4.84,
    reviewCount: 91,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-5',
    name: 'Universal Q-Bar Assist Rail',
    image: grabBarImg,
    currentPrice: 135.22,
    rating: 4.5,
    reviewCount: 23,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-6',
    name: 'Proactive Medical Protekt Dash Standing Transfer Patient Lift',
    image: hospitalBedImg,
    originalPrice: 899.90,
    currentPrice: 665.99,
    rating: 4.83,
    reviewCount: 6,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Proactive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-7',
    name: 'Drive Medical Silver Sport 1 Wheelchair',
    image: wheelchairImg,
    currentPrice: 174.62,
    rating: 5.0,
    reviewCount: 4,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-8',
    name: 'Drive Medical Lightweight Expedition Transport Wheelchair with Brakes',
    image: wheelchairImg,
    currentPrice: 220.21,
    rating: 3.75,
    reviewCount: 4,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-9',
    name: 'Drive Medical PreserveTech Raised Toilet Seat with Bidet',
    image: toiletSafetyFrameImg,
    currentPrice: 115.70,
    rating: 5.0,
    reviewCount: 2,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-10',
    name: 'Drive Medical Nitro Rollator Rolling Walker Cup Holder Attachment',
    image: walkerImg,
    currentPrice: 23.56,
    rating: 4.0,
    reviewCount: 8,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-11',
    name: 'Medical Overbed Table with Wheels for Home and Hospital Use - Mahogany',
    image: hospitalBedImg,
    originalPrice: 69.68,
    currentPrice: 49.99,
    rating: 4.87,
    reviewCount: 31,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-12',
    name: 'Universal Sit to Stand Lift Sling',
    image: hospitalBedImg,
    currentPrice: 56.98,
    rating: 5.0,
    reviewCount: 2,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-13',
    name: 'Drive Medical Nitro Duet Transport Chair and Rollator Walker',
    image: wheelchairImg,
    currentPrice: 399.00,
    rating: 4.33,
    reviewCount: 3,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-14',
    name: 'Drive Medical Fly Lite Ultra Lightweight Transport Wheelchair',
    image: wheelchairImg,
    currentPrice: 225.78,
    rating: 4.5,
    reviewCount: 2,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-15',
    name: 'Metro Mobility Battery Pack',
    image: mobilityBatteryPackImg,
    currentPrice: 120.00,
    rating: 4.0,
    reviewCount: 12,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Metro Mobility',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-16',
    name: 'Drive Medical Comfort Touch Cooling Sensation Seat Cushion',
    image: medicalMattressImg,
    currentPrice: 42.35,
    rating: 4.67,
    reviewCount: 3,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-17',
    name: 'Drive Medical Premium Series Shower Chair with Back and Arms',
    image: showerChairImg,
    currentPrice: 72.60,
    rating: 4.5,
    reviewCount: 8,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'dla-18',
    name: 'Drive Medical Rollator Walker with Folding Back Support & Padded Seat',
    image: walkerImg,
    currentPrice: 123.00,
    rating: 5.0,
    reviewCount: 3,
    isFsaEligible: true,
    category: 'Daily Living Aids',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  }
];

// Diabetic & Orthopedic Footwear Products
export const footwearProducts: Product[] = [
  {
    id: 'footwear-1',
    name: 'Diabetic Walking Shoes - Therapeutic Comfort Design',
    image: diabeticWalkingShoesImg,
    originalPrice: 129.99,
    currentPrice: 99.99,
    rating: 4.6,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Diabetic Approved', 'Therapeutic'],
    category: 'Diabetic & Orthopedic Footwear',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Diabetes', 'Foot Pain', 'Circulation Issues']
  },
  {
    id: 'footwear-2',
    name: 'Orthopedic Support Slippers - Memory Foam',
    image: orthopedicSlippersImg,
    originalPrice: 79.99,
    currentPrice: 59.99,
    rating: 4.4,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Memory Foam', 'Arch Support'],
    category: 'Diabetic & Orthopedic Footwear',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Plantar Fasciitis', 'Foot Pain', 'Arthritis']
  },
  {
    id: 'footwear-3',
    name: 'Diabetic Socks - Seamless Construction',
    image: diabeticSocksImg,
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.7,
    reviewCount: 445,
    isFsaEligible: true,
    badges: ['Seamless', 'Moisture Wicking'],
    category: 'Diabetic & Orthopedic Footwear',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Diabetes', 'Circulation Issues', 'Neuropathy']
  },
  {
    id: 'footwear-4',
    name: 'Post-Surgery Recovery Shoes - Adjustable Velcro',
    image: postSurgeryShoesImg,
    originalPrice: 89.99,
    currentPrice: 69.99,
    rating: 4.5,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Post-Surgery', 'Adjustable'],
    category: 'Diabetic & Orthopedic Footwear',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Post-Surgery', 'Foot Pain', 'Swelling']
  },
  {
    id: 'footwear-5',
    name: 'Orthopedic Arch Support Insoles',
    image: archSupportInsolesImg,
    originalPrice: 39.99,
    currentPrice: 29.99,
    rating: 4.3,
    reviewCount: 278,
    isFsaEligible: true,
    badges: ['Custom Fit', 'Gel Support'],
    category: 'Diabetic & Orthopedic Footwear',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Plantar Fasciitis', 'Flat Feet', 'Heel Pain']
  }
];

// Contact Lens Products
export const contactLensProducts: Product[] = [
  {
    id: 'lens-1',
    name: 'Daily Disposable Contact Lenses - 30 Pack',
    image: contactLensImg,
    originalPrice: 49.99,
    currentPrice: 39.99,
    rating: 4.6,
    reviewCount: 567,
    isFsaEligible: true,
    badges: ['Daily Disposable', 'UV Protection'],
    category: 'Contact Lens',
    brand: 'ProVision',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lens-2',
    name: 'Multifocal Contact Lenses - Monthly Pack',
    image: multifocalLensesImg,
    originalPrice: 89.99,
    currentPrice: 74.99,
    rating: 4.4,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Multifocal', 'Monthly'],
    category: 'Contact Lens',
    brand: 'ProVision',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lens-3',
    name: 'Contact Lens Cleaning Solution - 12oz',
    image: lensCleaningSolutionImg,
    originalPrice: 19.99,
    currentPrice: 14.99,
    rating: 4.8,
    reviewCount: 445,
    isFsaEligible: true,
    badges: ['Multi-Purpose', 'Preservative Free'],
    category: 'Contact Lens',
    brand: 'EyeCare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lens-4',
    name: 'Toric Contact Lenses for Astigmatism - 6 Pack',
    image: toricLensesImg,
    originalPrice: 79.99,
    currentPrice: 64.99,
    rating: 4.5,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Toric', 'Astigmatism'],
    category: 'Contact Lens',
    brand: 'ProVision',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lens-5',
    name: 'Contact Lens Travel Case with Mirror',
    image: lensTravelCaseImg,
    originalPrice: 12.99,
    currentPrice: 8.99,
    rating: 4.3,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Travel Case', 'Mirror Included'],
    category: 'Contact Lens',
    brand: 'EyeCare',
    inStock: true,
    freeShipping: true
  }
];

// Hearing Aids Products
export const hearingAidsProducts: Product[] = [
  {
    id: 'hearing-1',
    name: 'Rechargeable Digital Hearing Aid - Behind the Ear',
    image: hearingAidImg,
    originalPrice: 299.99,
    currentPrice: 199.99,
    rating: 4.5,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Rechargeable', 'Digital'],
    category: 'Hearing Aids',
    brand: 'Audien Hearing',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Hearing Loss', 'Tinnitus']
  },
  {
    id: 'hearing-2',
    name: 'Invisible In-Ear Hearing Amplifier',
    image: invisibleHearingAidImg,
    originalPrice: 149.99,
    currentPrice: 99.99,
    rating: 4.3,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Invisible', 'In-Ear'],
    category: 'Hearing Aids',
    brand: 'Audien Hearing',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Mild Hearing Loss']
  },
  {
    id: 'hearing-3',
    name: 'Bluetooth Hearing Aid with App Control',
    image: bluetoothHearingAidImg,
    originalPrice: 499.99,
    currentPrice: 349.99,
    rating: 4.7,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Bluetooth', 'App Control'],
    category: 'Hearing Aids',
    brand: 'Audien Hearing',
    inStock: true,
    freeShipping: true,
    conditionsHelped: ['Hearing Loss', 'Tinnitus']
  },
  {
    id: 'hearing-4',
    name: 'Hearing Aid Cleaning Kit with Brush',
    image: hearingAidCleaningKitImg,
    originalPrice: 29.99,
    currentPrice: 19.99,
    rating: 4.6,
    reviewCount: 278,
    isFsaEligible: true,
    badges: ['Cleaning Kit', 'Professional Grade'],
    category: 'Hearing Aids',
    brand: 'Audien Hearing',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'hearing-5',
    name: 'Hearing Aid Batteries - Size 312 (60 Pack)',
    image: hearingAidBatteriesImg,
    originalPrice: 24.99,
    currentPrice: 17.99,
    rating: 4.4,
    reviewCount: 345,
    isFsaEligible: true,
    badges: ['Size 312', '60 Pack'],
    category: 'Hearing Aids',
    brand: 'PowerCell',
    inStock: true,
    freeShipping: true
  }
];

export const allProducts: Product[] = [
  ...wellnessProducts,
  ...hospitalBedsProducts,
  ...mobilityProducts,
  ...bathroomSafetyProducts,
  ...respiratoryProducts,
  ...compressionProducts,
  ...bathLiftProducts,
  ...geriChairProducts,
  ...stethoscopeProducts,
  ...positioningProducts,
  ...diabeticCareProducts,
  ...pediatricProducts,
  ...scooterProducts,
  ...orthopedicProducts,
  ...personalCareProducts,
  ...disposableProducts,
  ...sunscreenProducts,
  ...supplementProducts,
  ...walkerAccessories,
  ...clinicalEquipment,
  ...batteryProducts,
  ...dailyLivingAidsProducts,
  ...footwearProducts,
  ...contactLensProducts,
  ...hearingAidsProducts
];