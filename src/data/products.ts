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
import standardWheelchairImg from '@/assets/standard-wheelchair.jpg';
import transportWheelchairImg from '@/assets/transport-wheelchair.jpg';
import manualPatientLiftImg from '@/assets/manual-patient-lift.jpg';
import electricPatientLiftImg from '@/assets/electric-patient-lift.jpg';
import vitaminsSupplementsImg from '@/assets/vitamins-supplements.jpg';
import rollatorWalkerImg from '@/assets/rollator-walker.jpg';
import electricHospitalBedImg from '@/assets/electric-hospital-bed.jpg';
import semiElectricBedImg from '@/assets/semi-electric-bed.jpg';
import sexualWellnessImg from '@/assets/sexual-wellness.jpg';
import mobilityScooterImg from '@/assets/mobility-scooter.jpg';
import canesCrutchesImg from '@/assets/canes-crutches.jpg';
import medicinesTreatmentsImg from '@/assets/medicines-treatments.jpg';
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

// New category product arrays for expanded navigation
export const wheelchairProducts: Product[] = [
  {
    id: 'wheelchair-standard-1',
    name: 'Standard Self-Propelled Wheelchair - 18" Seat',
    image: standardWheelchairImg,
    originalPrice: 299.99,
    currentPrice: 249.99,
    rating: 4.5,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Self-Propelled', 'Standard'],
    category: 'Wheelchairs',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-transport-1', 
    name: 'Transport Wheelchair with Removable Arms',
    image: transportWheelchairImg,
    originalPrice: 199.99,
    currentPrice: 169.99,
    rating: 4.6,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Transport', 'Lightweight'],
    category: 'Wheelchairs',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-lightweight-1',
    name: 'Lightweight Wheelchair - 16" Seat Width',
    image: standardWheelchairImg,
    originalPrice: 399.99,
    currentPrice: 349.99,
    rating: 4.7,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Lightweight', '16 Inch'],
    category: 'Wheelchairs',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-pediatric-1',
    name: 'Pediatric Wheelchair - Kids Size',
    image: standardWheelchairImg,
    originalPrice: 599.99,
    currentPrice: 499.99,
    rating: 4.8,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Pediatric', 'Adjustable'],
    category: 'Wheelchairs',
    brand: 'Circle Specialty',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-bariatric-1',
    name: 'Heavy Duty Bariatric Wheelchair - 400lb Capacity',
    image: standardWheelchairImg,
    originalPrice: 899.99,
    currentPrice: 799.99,
    rating: 4.4,
    reviewCount: 45,
    isFsaEligible: true,
    badges: ['Bariatric', '400lb Capacity'],
    category: 'Wheelchairs',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-reclining-1',
    name: 'Reclining Wheelchair with Elevating Footrests',
    image: standardWheelchairImg,
    originalPrice: 1299.99,
    currentPrice: 1099.99,
    rating: 4.6,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['Reclining', 'Elevating Footrests'],
    category: 'Wheelchairs',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-sports-1',
    name: 'Sports Wheelchair for Active Use',
    image: standardWheelchairImg,
    originalPrice: 1599.99,
    currentPrice: 1399.99,
    rating: 4.9,
    reviewCount: 34,
    isFsaEligible: true,
    badges: ['Sports', 'Active'],
    category: 'Wheelchairs',
    brand: 'ProActive',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-electric-1',
    name: 'Electric Power Wheelchair with Joystick',
    image: standardWheelchairImg,
    originalPrice: 2999.99,
    currentPrice: 2599.99,
    rating: 4.5,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Electric', 'Joystick Control'],
    category: 'Wheelchairs',
    brand: 'Pride Mobility',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-accessories-1',
    name: 'Wheelchair Cushion for Comfort',
    image: medicalMattressImg,
    originalPrice: 149.99,
    currentPrice: 119.99,
    rating: 4.3,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Cushion', 'Comfort'],
    category: 'Wheelchairs',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wheelchair-manual-1',
    name: 'Manual Wheelchair with Quick Release Wheels',
    image: standardWheelchairImg,
    originalPrice: 499.99,
    currentPrice: 429.99,
    rating: 4.7,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Manual', 'Quick Release'],
    category: 'Wheelchairs',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  }
];

export const patientLiftProducts: Product[] = [
  {
    id: 'lift-manual-1',
    name: 'Manual Hydraulic Patient Lift - 450lb Capacity',
    image: manualPatientLiftImg,
    originalPrice: 799.99,
    currentPrice: 699.99,
    rating: 4.6,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Manual', '450lb Capacity'],
    category: 'Patient Lifts',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-electric-1',
    name: 'Electric Patient Lift with Rechargeable Battery',
    image: electricPatientLiftImg,
    originalPrice: 1299.99,
    currentPrice: 1099.99,
    rating: 4.8,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Electric', 'Rechargeable'],
    category: 'Patient Lifts',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-stand-1',
    name: 'Stand-Up Patient Lift for Sit to Stand Transfer',
    image: manualPatientLiftImg,
    originalPrice: 899.99,
    currentPrice: 799.99,
    rating: 4.5,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Stand-Up', 'Sit to Stand'],
    category: 'Patient Lifts',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-ceiling-1',
    name: 'Ceiling Mounted Patient Lift System',
    image: electricPatientLiftImg,
    originalPrice: 2499.99,
    currentPrice: 2199.99,
    rating: 4.7,
    reviewCount: 34,
    isFsaEligible: true,
    badges: ['Ceiling Mount', 'System'],
    category: 'Patient Lifts',
    brand: 'Arjo',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-portable-1',
    name: 'Portable Floor Lift with Sling',
    image: manualPatientLiftImg,
    originalPrice: 699.99,
    currentPrice: 599.99,
    rating: 4.4,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['Portable', 'Includes Sling'],
    category: 'Patient Lifts',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-bariatric-1',
    name: 'Heavy Duty Bariatric Patient Lift - 600lb',
    image: electricPatientLiftImg,
    originalPrice: 1599.99,
    currentPrice: 1399.99,
    rating: 4.6,
    reviewCount: 45,
    isFsaEligible: true,
    badges: ['Bariatric', '600lb Capacity'],
    category: 'Patient Lifts',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-sling-1',
    name: 'Universal Patient Lift Sling - Medium',
    image: hospitalBedImg,
    originalPrice: 149.99,
    currentPrice: 119.99,
    rating: 4.3,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Universal', 'Medium Size'],
    category: 'Patient Lifts',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-transfer-1',
    name: 'Transfer Board for Safe Patient Movement',
    image: hospitalBedImg,
    originalPrice: 99.99,
    currentPrice: 79.99,
    rating: 4.5,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Transfer Board', 'Safe Movement'],
    category: 'Patient Lifts',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-gait-1',
    name: 'Gait Training Belt for Mobility Assistance',
    image: hospitalBedImg,
    originalPrice: 59.99,
    currentPrice: 49.99,
    rating: 4.7,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Gait Training', 'Mobility'],
    category: 'Patient Lifts',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'lift-bath-1',
    name: 'Bath Lift Chair for Safe Bathing',
    image: bedsideCommodeImg,
    originalPrice: 799.99,
    currentPrice: 699.99,
    rating: 4.4,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Bath Lift', 'Safe Bathing'],
    category: 'Patient Lifts',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  }
];

export const walkerProducts: Product[] = [
  {
    id: 'walker-rollator-1',
    name: 'Four Wheel Rollator with Seat and Basket',
    image: rollatorWalkerImg,
    originalPrice: 199.99,
    currentPrice: 169.99,
    rating: 4.6,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Four Wheel', 'Seat & Basket'],
    category: 'Walkers',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-standard-1',
    name: 'Standard Folding Walker without Wheels',
    image: walkerImg,
    originalPrice: 79.99,
    currentPrice: 59.99,
    rating: 4.4,
    reviewCount: 345,
    isFsaEligible: true,
    badges: ['Standard', 'Folding'],
    category: 'Walkers',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-two-wheel-1',
    name: 'Two Wheel Walker with Glide Skis',
    image: walkerImg,
    originalPrice: 99.99,
    currentPrice: 79.99,
    rating: 4.5,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Two Wheel', 'Glide Skis'],
    category: 'Walkers',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-bariatric-1',
    name: 'Heavy Duty Bariatric Walker - 500lb Capacity',
    image: walkerImg,
    originalPrice: 199.99,
    currentPrice: 169.99,
    rating: 4.3,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['Bariatric', '500lb Capacity'],
    category: 'Walkers',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-knee-1',
    name: 'Knee Walker for Foot and Ankle Injuries',
    image: rollatorWalkerImg,
    originalPrice: 299.99,
    currentPrice: 249.99,
    rating: 4.7,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Knee Walker', 'Injury Recovery'],
    category: 'Walkers',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-platform-1',
    name: 'Platform Walker for Forearm Support',
    image: walkerImg,
    originalPrice: 149.99,
    currentPrice: 129.99,
    rating: 4.5,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Platform', 'Forearm Support'],
    category: 'Walkers',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-pediatric-1',
    name: 'Pediatric Walker for Children',
    image: walkerImg,
    originalPrice: 199.99,
    currentPrice: 179.99,
    rating: 4.8,
    reviewCount: 45,
    isFsaEligible: true,
    badges: ['Pediatric', 'Children'],
    category: 'Walkers',
    brand: 'Circle Specialty',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-upright-1',
    name: 'Upright Walker for Posture Support',
    image: rollatorWalkerImg,
    originalPrice: 399.99,
    currentPrice: 349.99,
    rating: 4.6,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Upright', 'Posture Support'],
    category: 'Walkers',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-accessories-1',
    name: 'Walker Bag and Cup Holder Set',
    image: walkerImg,
    originalPrice: 49.99,
    currentPrice: 39.99,
    rating: 4.4,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Accessories', 'Bag & Cup Holder'],
    category: 'Walkers',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'walker-tennis-1',
    name: 'Walker Tennis Ball Glides - Set of 2',
    image: walkerImg,
    originalPrice: 19.99,
    currentPrice: 14.99,
    rating: 4.2,
    reviewCount: 267,
    isFsaEligible: true,
    badges: ['Tennis Ball Glides', 'Set of 2'],
    category: 'Walkers',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  }
];

export const vitaminsProducts: Product[] = [
  {
    id: 'vitamin-multi-1',
    name: 'Centrum Multivitamin for Adults - 200 Tablets',
    image: vitaminsSupplementsImg,
    originalPrice: 39.99,
    currentPrice: 29.99,
    rating: 4.5,
    reviewCount: 456,
    isFsaEligible: true,
    badges: ['Centrum', '200 Tablets'],
    category: 'Vitamins & Supplements',
    brand: 'Centrum',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-d3-1',
    name: 'Vitamin D3 5000 IU High Potency',
    image: vitaminsSupplementsImg,
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.7,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['High Potency', '5000 IU'],
    category: 'Vitamins & Supplements',
    brand: 'Nature Made',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-b12-1',
    name: 'B12 Sublingual Tablets - Energy Support',
    image: vitaminsSupplementsImg,
    originalPrice: 19.99,
    currentPrice: 15.99,
    rating: 4.6,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Sublingual', 'Energy Support'],
    category: 'Vitamins & Supplements',
    brand: 'Nature\'s Bounty',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-omega-1',
    name: 'Omega-3 Fish Oil Capsules - Heart Health',
    image: vitaminsSupplementsImg,
    originalPrice: 34.99,
    currentPrice: 27.99,
    rating: 4.4,
    reviewCount: 345,
    isFsaEligible: true,
    badges: ['Omega-3', 'Heart Health'],
    category: 'Vitamins & Supplements',
    brand: 'Nordic Naturals',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-calcium-1',
    name: 'Calcium with Vitamin D - Bone Health',
    image: vitaminsSupplementsImg,
    originalPrice: 29.99,
    currentPrice: 24.99,
    rating: 4.5,
    reviewCount: 278,
    isFsaEligible: true,
    badges: ['Calcium + D', 'Bone Health'],
    category: 'Vitamins & Supplements',
    brand: 'Citracal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-iron-1',
    name: 'Iron Supplement for Anemia Support',
    image: vitaminsSupplementsImg,
    originalPrice: 22.99,
    currentPrice: 18.99,
    rating: 4.3,
    reviewCount: 167,
    isFsaEligible: true,
    badges: ['Iron', 'Anemia Support'],
    category: 'Vitamins & Supplements',
    brand: 'Feosol',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-magnesium-1',
    name: 'Magnesium Glycinate for Sleep & Relaxation',
    image: vitaminsSupplementsImg,
    originalPrice: 26.99,
    currentPrice: 21.99,
    rating: 4.6,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Magnesium', 'Sleep Support'],
    category: 'Vitamins & Supplements',
    brand: 'KAL',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-probiotic-1',
    name: 'Probiotic Supplement for Digestive Health',
    image: vitaminsSupplementsImg,
    originalPrice: 39.99,
    currentPrice: 32.99,
    rating: 4.7,
    reviewCount: 289,
    isFsaEligible: true,
    badges: ['Probiotic', 'Digestive Health'],
    category: 'Vitamins & Supplements',
    brand: 'Culturelle',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-coq10-1',
    name: 'CoQ10 100mg for Heart & Energy Support',
    image: vitaminsSupplementsImg,
    originalPrice: 44.99,
    currentPrice: 37.99,
    rating: 4.5,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['CoQ10', 'Heart Support'],
    category: 'Vitamins & Supplements',
    brand: 'Doctor\'s Best',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'vitamin-senior-1',
    name: 'Senior Multivitamin 50+ Formula',
    image: vitaminsSupplementsImg,
    originalPrice: 32.99,
    currentPrice: 26.99,
    rating: 4.4,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Senior Formula', '50+'],
    category: 'Vitamins & Supplements',
    brand: 'Centrum Silver',
    inStock: true,
    freeShipping: true
  }
];

// Electric Hospital Beds Products
export const electricHospitalBedsProducts: Product[] = [
  {
    id: 'electric-bed-1',
    name: 'Full Electric Hospital Bed with Rails - Premium',
    image: electricHospitalBedImg,
    originalPrice: 1299.99,
    currentPrice: 1099.99,
    rating: 4.8,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Full Electric', 'Premium'],
    category: 'Electric Hospital Beds',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-2',
    name: 'Bariatric Electric Hospital Bed - Heavy Duty',
    image: electricHospitalBedImg,
    originalPrice: 1899.99,
    currentPrice: 1699.99,
    rating: 4.6,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Bariatric', 'Heavy Duty'],
    category: 'Electric Hospital Beds',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-3',
    name: 'Low Electric Hospital Bed for Fall Prevention',
    image: electricHospitalBedImg,
    originalPrice: 1399.99,
    currentPrice: 1199.99,
    rating: 4.7,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Low Bed', 'Fall Prevention'],
    category: 'Electric Hospital Beds',
    brand: 'Med-Mizer',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-4',
    name: 'Trendelenburg Electric Hospital Bed',
    image: electricHospitalBedImg,
    originalPrice: 1599.99,
    currentPrice: 1399.99,
    rating: 4.5,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Trendelenburg', 'Advanced'],
    category: 'Electric Hospital Beds',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-5',
    name: 'Pediatric Electric Hospital Bed',
    image: electricHospitalBedImg,
    originalPrice: 1799.99,
    currentPrice: 1499.99,
    rating: 4.9,
    reviewCount: 45,
    isFsaEligible: true,
    badges: ['Pediatric', 'Child Safe'],
    category: 'Electric Hospital Beds',
    brand: 'Circle Specialty',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-6',
    name: 'ICU Electric Hospital Bed with Scales',
    image: electricHospitalBedImg,
    originalPrice: 2299.99,
    currentPrice: 1999.99,
    rating: 4.8,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['ICU Grade', 'Built-in Scales'],
    category: 'Electric Hospital Beds',
    brand: 'Stryker',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-7',
    name: 'Home Care Electric Bed with Foam Mattress',
    image: electricHospitalBedImg,
    originalPrice: 999.99,
    currentPrice: 849.99,
    rating: 4.4,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Home Care', 'Includes Mattress'],
    category: 'Electric Hospital Beds',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-8',
    name: 'Rotating Electric Hospital Bed - Sit to Stand',
    image: electricHospitalBedImg,
    originalPrice: 2799.99,
    currentPrice: 2399.99,
    rating: 4.9,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Rotating', 'Sit to Stand'],
    category: 'Electric Hospital Beds',
    brand: 'StarSleep',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-9',
    name: 'Adjustable Height Electric Hospital Bed',
    image: electricHospitalBedImg,
    originalPrice: 1199.99,
    currentPrice: 999.99,
    rating: 4.6,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Adjustable Height', 'Comfort'],
    category: 'Electric Hospital Beds',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'electric-bed-10',
    name: 'Ultra Low Electric Hospital Bed',
    image: electricHospitalBedImg,
    originalPrice: 1699.99,
    currentPrice: 1449.99,
    rating: 4.7,
    reviewCount: 167,
    isFsaEligible: true,
    badges: ['Ultra Low', 'Safety First'],
    category: 'Electric Hospital Beds',
    brand: 'Med-Mizer',
    inStock: true,
    freeShipping: true
  }
];

// Semi-Electric Hospital Beds Products
export const semiElectricBedsProducts: Product[] = [
  {
    id: 'semi-bed-1',
    name: 'Semi-Electric Hospital Bed with Manual Crank',
    image: semiElectricBedImg,
    originalPrice: 899.99,
    currentPrice: 778.17,
    rating: 4.7,
    reviewCount: 324,
    isFsaEligible: true,
    badges: ['Semi-Electric', 'Manual Crank'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-2',
    name: 'Bariatric Semi-Electric Hospital Bed',
    image: semiElectricBedImg,
    originalPrice: 1299.99,
    currentPrice: 1099.99,
    rating: 4.5,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Bariatric', '600lb Capacity'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-3',
    name: 'Home Care Semi-Electric Bed Package',
    image: semiElectricBedImg,
    originalPrice: 1099.99,
    currentPrice: 949.99,
    rating: 4.6,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Home Care', 'Complete Package'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-4',
    name: 'Low Height Semi-Electric Hospital Bed',
    image: semiElectricBedImg,
    originalPrice: 1199.99,
    currentPrice: 999.99,
    rating: 4.4,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['Low Height', 'Fall Prevention'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Med-Mizer',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-5',
    name: 'Pediatric Semi-Electric Hospital Bed',
    image: semiElectricBedImg,
    originalPrice: 1399.99,
    currentPrice: 1199.99,
    rating: 4.8,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Pediatric', 'Child Safe'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Circle Specialty',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-6',
    name: 'Heavy Duty Semi-Electric Hospital Bed',
    image: semiElectricBedImg,
    originalPrice: 1299.99,
    currentPrice: 1149.99,
    rating: 4.3,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Heavy Duty', '450lb Capacity'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-7',
    name: 'Standard Semi-Electric Hospital Bed',
    image: semiElectricBedImg,
    originalPrice: 799.99,
    currentPrice: 699.99,
    rating: 4.5,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Standard', 'Reliable'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Invacare',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-8',
    name: 'Adjustable Semi-Electric Bed with Rails',
    image: semiElectricBedImg,
    originalPrice: 999.99,
    currentPrice: 849.99,
    rating: 4.6,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Adjustable', 'Safety Rails'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-9',
    name: 'Long Term Care Semi-Electric Bed',
    image: semiElectricBedImg,
    originalPrice: 1199.99,
    currentPrice: 1049.99,
    rating: 4.7,
    reviewCount: 145,
    isFsaEligible: true,
    badges: ['Long Term Care', 'Durable'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Med-Mizer',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'semi-bed-10',
    name: 'Trendelenburg Semi-Electric Hospital Bed',
    image: semiElectricBedImg,
    originalPrice: 1399.99,
    currentPrice: 1199.99,
    rating: 4.4,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Trendelenburg', 'Advanced'],
    category: 'Semi-Electric Hospital Beds',
    brand: 'Stryker',
    inStock: true,
    freeShipping: true
  }
];

// Sexual Wellness Products
export const sexualWellnessProducts: Product[] = [
  {
    id: 'wellness-1',
    name: 'Intimate Moisture Personal Lubricant',
    image: sexualWellnessImg,
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.5,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Personal Care', 'Discrete'],
    category: 'Sexual Wellness',
    brand: 'Good Clean Love',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-2',
    name: 'Pelvic Floor Exercise Kit for Women',
    image: sexualWellnessImg,
    originalPrice: 49.99,
    currentPrice: 39.99,
    rating: 4.6,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Exercise Kit', 'Pelvic Health'],
    category: 'Sexual Wellness',
    brand: 'Intimate Rose',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-3',
    name: 'Vaginal Moisturizer for Comfort',
    image: sexualWellnessImg,
    originalPrice: 32.99,
    currentPrice: 26.99,
    rating: 4.4,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Moisturizer', 'Comfort'],
    category: 'Sexual Wellness',
    brand: 'Replens',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-4',
    name: 'Couples Massage Oil - Natural Ingredients',
    image: sexualWellnessImg,
    originalPrice: 29.99,
    currentPrice: 24.99,
    rating: 4.7,
    reviewCount: 123,
    isFsaEligible: false,
    badges: ['Natural', 'Couples'],
    category: 'Sexual Wellness',
    brand: 'Good Clean Love',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-5',
    name: 'pH Balance Feminine Wash',
    image: sexualWellnessImg,
    originalPrice: 19.99,
    currentPrice: 16.99,
    rating: 4.3,
    reviewCount: 278,
    isFsaEligible: true,
    badges: ['pH Balanced', 'Gentle'],
    category: 'Sexual Wellness',
    brand: 'Summer\'s Eve',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-6',
    name: 'Male Enhancement Supplement',
    image: sexualWellnessImg,
    originalPrice: 59.99,
    currentPrice: 49.99,
    rating: 4.2,
    reviewCount: 89,
    isFsaEligible: false,
    badges: ['Natural', 'Male Health'],
    category: 'Sexual Wellness',
    brand: 'ExtenZe',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-7',
    name: 'Fertility Support Supplements for Women',
    image: sexualWellnessImg,
    originalPrice: 69.99,
    currentPrice: 59.99,
    rating: 4.6,
    reviewCount: 145,
    isFsaEligible: true,
    badges: ['Fertility', 'Women\'s Health'],
    category: 'Sexual Wellness',
    brand: 'FertilAid',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-8',
    name: 'Intimate Wipes - Unscented',
    image: sexualWellnessImg,
    originalPrice: 15.99,
    currentPrice: 12.99,
    rating: 4.4,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Unscented', 'Gentle'],
    category: 'Sexual Wellness',
    brand: 'Goodwipes',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-9',
    name: 'Hormone Balance Supplement for Men',
    image: sexualWellnessImg,
    originalPrice: 54.99,
    currentPrice: 44.99,
    rating: 4.3,
    reviewCount: 67,
    isFsaEligible: false,
    badges: ['Hormone Support', 'Men\'s Health'],
    category: 'Sexual Wellness',
    brand: 'TestoFuel',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'wellness-10',
    name: 'Yeast Infection Treatment Kit',
    image: sexualWellnessImg,
    originalPrice: 29.99,
    currentPrice: 24.99,
    rating: 4.5,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Treatment', 'Fast Acting'],
    category: 'Sexual Wellness',
    brand: 'Monistat',
    inStock: true,
    freeShipping: true
  }
];

// Mobility Scooters Products
export const mobilityScooterProducts: Product[] = [
  {
    id: 'scooter-travel-1',
    name: 'Lightweight Travel Mobility Scooter - 4 Wheel',
    image: mobilityScooterImg,
    originalPrice: 1599.99,
    currentPrice: 1399.99,
    rating: 4.5,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Lightweight', 'Travel'],
    category: 'Mobility Scooters',
    brand: 'Pride Mobility',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-heavy-1',
    name: 'Heavy Duty Mobility Scooter - 400lb Capacity',
    image: mobilityScooterImg,
    originalPrice: 2299.99,
    currentPrice: 1999.99,
    rating: 4.6,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Heavy Duty', '400lb Capacity'],
    category: 'Mobility Scooters',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-3wheel-1',
    name: '3-Wheel Mobility Scooter for Indoor Use',
    image: mobilityScooterImg,
    originalPrice: 1299.99,
    currentPrice: 1149.99,
    rating: 4.4,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['3-Wheel', 'Indoor'],
    category: 'Mobility Scooters',
    brand: 'Golden Technologies',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-outdoor-1',
    name: 'All-Terrain Outdoor Mobility Scooter',
    image: mobilityScooterImg,
    originalPrice: 2799.99,
    currentPrice: 2399.99,
    rating: 4.7,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['All-Terrain', 'Outdoor'],
    category: 'Mobility Scooters',
    brand: 'Pride Mobility',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-folding-1',
    name: 'Folding Mobility Scooter - Ultra Portable',
    image: mobilityScooterImg,
    originalPrice: 1899.99,
    currentPrice: 1699.99,
    rating: 4.8,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Folding', 'Ultra Portable'],
    category: 'Mobility Scooters',
    brand: 'Transformer',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-luxury-1',
    name: 'Luxury Mobility Scooter with Captain Seat',
    image: mobilityScooterImg,
    originalPrice: 3299.99,
    currentPrice: 2899.99,
    rating: 4.9,
    reviewCount: 45,
    isFsaEligible: true,
    badges: ['Luxury', 'Captain Seat'],
    category: 'Mobility Scooters',
    brand: 'Golden Technologies',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-mid-1',
    name: 'Mid-Size Mobility Scooter - Best Value',
    image: mobilityScooterImg,
    originalPrice: 1799.99,
    currentPrice: 1549.99,
    rating: 4.5,
    reviewCount: 178,
    isFsaEligible: true,
    badges: ['Mid-Size', 'Best Value'],
    category: 'Mobility Scooters',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-senior-1',
    name: 'Senior-Friendly Mobility Scooter - Easy Controls',
    image: mobilityScooterImg,
    originalPrice: 1699.99,
    currentPrice: 1449.99,
    rating: 4.6,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Senior-Friendly', 'Easy Controls'],
    category: 'Mobility Scooters',
    brand: 'Pride Mobility',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-compact-1',
    name: 'Compact Mobility Scooter for Small Spaces',
    image: mobilityScooterImg,
    originalPrice: 1399.99,
    currentPrice: 1199.99,
    rating: 4.3,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Compact', 'Small Spaces'],
    category: 'Mobility Scooters',
    brand: 'Golden Technologies',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'scooter-fast-1',
    name: 'High-Speed Mobility Scooter - 8 mph',
    image: mobilityScooterImg,
    originalPrice: 2599.99,
    currentPrice: 2299.99,
    rating: 4.7,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['High-Speed', '8 mph'],
    category: 'Mobility Scooters',
    brand: 'Pride Mobility',
    inStock: true,
    freeShipping: true
  }
];

// Canes & Crutches Products
export const canesCrutchesProducts: Product[] = [
  {
    id: 'canes-adjustable-1',
    name: 'Adjustable Aluminum Walking Cane with Ergonomic Handle',
    image: canesCrutchesImg,
    originalPrice: 29.99,
    currentPrice: 19.99,
    rating: 4.4,
    reviewCount: 445,
    isFsaEligible: true,
    badges: ['Adjustable', 'Ergonomic'],
    category: 'Canes & Crutches',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'canes-quad-1',
    name: 'Quad Cane with Large Base for Stability',
    image: canesCrutchesImg,
    originalPrice: 49.99,
    currentPrice: 39.99,
    rating: 4.5,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Quad Base', 'Stability'],
    category: 'Canes & Crutches',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'crutches-aluminum-1',
    name: 'Aluminum Underarm Crutches - Adjustable',
    image: canesCrutchesImg,
    originalPrice: 79.99,
    currentPrice: 59.99,
    rating: 4.6,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Aluminum', 'Underarm'],
    category: 'Canes & Crutches',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'crutches-forearm-1',
    name: 'Forearm Crutches with Ergonomic Grips',
    image: canesCrutchesImg,
    originalPrice: 89.99,
    currentPrice: 69.99,
    rating: 4.7,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Forearm', 'Ergonomic'],
    category: 'Canes & Crutches',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'canes-folding-1',
    name: 'Folding Walking Cane for Travel',
    image: canesCrutchesImg,
    originalPrice: 39.99,
    currentPrice: 29.99,
    rating: 4.3,
    reviewCount: 167,
    isFsaEligible: true,
    badges: ['Folding', 'Travel'],
    category: 'Canes & Crutches',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'canes-seat-1',
    name: 'Walking Cane with Built-in Seat',
    image: canesCrutchesImg,
    originalPrice: 69.99,
    currentPrice: 54.99,
    rating: 4.4,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Built-in Seat', 'Rest'],
    category: 'Canes & Crutches',
    brand: 'ProHeal',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'crutches-bariatric-1',
    name: 'Heavy Duty Bariatric Crutches - 350lb',
    image: canesCrutchesImg,
    originalPrice: 129.99,
    currentPrice: 99.99,
    rating: 4.5,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Bariatric', '350lb Capacity'],
    category: 'Canes & Crutches',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'canes-offset-1',
    name: 'Offset Handle Walking Cane for Comfort',
    image: canesCrutchesImg,
    originalPrice: 34.99,
    currentPrice: 26.99,
    rating: 4.6,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Offset Handle', 'Comfort'],
    category: 'Canes & Crutches',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'crutches-platform-1',
    name: 'Platform Crutches for Forearm Support',
    image: canesCrutchesImg,
    originalPrice: 149.99,
    currentPrice: 119.99,
    rating: 4.7,
    reviewCount: 78,
    isFsaEligible: true,
    badges: ['Platform', 'Forearm Support'],
    category: 'Canes & Crutches',
    brand: 'Sammons Preston',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'canes-ice-1',
    name: 'Ice Grip Walking Cane for Winter Safety',
    image: canesCrutchesImg,
    originalPrice: 44.99,
    currentPrice: 36.99,
    rating: 4.4,
    reviewCount: 145,
    isFsaEligible: true,
    badges: ['Ice Grip', 'Winter Safety'],
    category: 'Canes & Crutches',
    brand: 'Drive Medical',
    inStock: true,
    freeShipping: true
  }
];

// Medicines & Treatments Products
export const medicinesProducts: Product[] = [
  {
    id: 'med-pain-1',
    name: 'Ibuprofen 200mg Pain Relief - 100 Tablets',
    image: medicinesTreatmentsImg,
    originalPrice: 12.99,
    currentPrice: 9.99,
    rating: 4.5,
    reviewCount: 345,
    isFsaEligible: true,
    badges: ['Pain Relief', '100 Tablets'],
    category: 'Medicines & Treatments',
    brand: 'Advil',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-allergy-1',
    name: 'Allergy Relief Antihistamine - 24hr',
    image: medicinesTreatmentsImg,
    originalPrice: 19.99,
    currentPrice: 15.99,
    rating: 4.6,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['24hr Relief', 'Non-Drowsy'],
    category: 'Medicines & Treatments',
    brand: 'Claritin',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-antibiotic-1',
    name: 'Antibiotic Ointment - Triple Action',
    image: medicinesTreatmentsImg,
    originalPrice: 8.99,
    currentPrice: 6.99,
    rating: 4.7,
    reviewCount: 456,
    isFsaEligible: true,
    badges: ['Triple Action', 'Infection Prevention'],
    category: 'Medicines & Treatments',
    brand: 'Neosporin',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-antacid-1',
    name: 'Antacid Tablets for Heartburn Relief',
    image: medicinesTreatmentsImg,
    originalPrice: 14.99,
    currentPrice: 11.99,
    rating: 4.4,
    reviewCount: 189,
    isFsaEligible: true,
    badges: ['Fast Acting', 'Heartburn Relief'],
    category: 'Medicines & Treatments',
    brand: 'Tums',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-cough-1',
    name: 'Cough Suppressant Syrup - Nighttime',
    image: medicinesTreatmentsImg,
    originalPrice: 16.99,
    currentPrice: 13.99,
    rating: 4.5,
    reviewCount: 167,
    isFsaEligible: true,
    badges: ['Nighttime', 'Cough Relief'],
    category: 'Medicines & Treatments',
    brand: 'Robitussin',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-bandages-1',
    name: 'Adhesive Bandages - Assorted Sizes',
    image: medicinesTreatmentsImg,
    originalPrice: 9.99,
    currentPrice: 7.99,
    rating: 4.3,
    reviewCount: 278,
    isFsaEligible: true,
    badges: ['Assorted Sizes', 'Sterile'],
    category: 'Medicines & Treatments',
    brand: 'Band-Aid',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-antiseptic-1',
    name: 'Antiseptic Wipes for Wound Care',
    image: medicinesTreatmentsImg,
    originalPrice: 11.99,
    currentPrice: 9.49,
    rating: 4.6,
    reviewCount: 123,
    isFsaEligible: true,
    badges: ['Antiseptic', 'Wound Care'],
    category: 'Medicines & Treatments',
    brand: 'Alcohol Prep',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-electrolyte-1',
    name: 'Electrolyte Replacement Powder',
    image: medicinesTreatmentsImg,
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.7,
    reviewCount: 89,
    isFsaEligible: true,
    badges: ['Electrolyte', 'Hydration'],
    category: 'Medicines & Treatments',
    brand: 'Pedialyte',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-thermometer-1',
    name: 'Digital Fever Thermometer - Fast Read',
    image: medicinesTreatmentsImg,
    originalPrice: 29.99,
    currentPrice: 24.99,
    rating: 4.5,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Digital', 'Fast Read'],
    category: 'Medicines & Treatments',
    brand: 'Braun',
    inStock: true,
    freeShipping: true
  },
  {
    id: 'med-firstaid-1',
    name: 'Complete First Aid Kit - Home & Travel',
    image: medicinesTreatmentsImg,
    originalPrice: 49.99,
    currentPrice: 39.99,
    rating: 4.8,
    reviewCount: 156,
    isFsaEligible: true,
    badges: ['Complete Kit', 'Home & Travel'],
    category: 'Medicines & Treatments',
    brand: 'Johnson & Johnson',
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
  ...hearingAidsProducts,
  ...wheelchairProducts,
  ...patientLiftProducts,
  ...walkerProducts,
  ...vitaminsProducts,
  ...electricHospitalBedsProducts,
  ...semiElectricBedsProducts,
  ...sexualWellnessProducts,
  ...mobilityScooterProducts,
  ...canesCrutchesProducts,
  ...medicinesProducts
];