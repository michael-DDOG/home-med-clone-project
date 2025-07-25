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
}

export const wellnessProducts: Product[] = [
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
    category: 'Monitoring'
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
    category: 'Monitoring'
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
    category: 'Pain Relief'
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
  }
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
  }
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
  }
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
  }
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
  }
];

// Extensive product catalog from Shop Home Med

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

export const stethoscopeProducts: Product[] = [
  {
    id: 'stethoscope-1',
    name: '3M Healthcare Littmann Master Cardiology Stethoscope',
    image: pulseOximeterImg,
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
    image: pulseOximeterImg,
    originalPrice: 149.99,
    currentPrice: 129.99,
    rating: 4.7,
    reviewCount: 234,
    isFsaEligible: true,
    badges: ['Black Tube', 'Lightweight'],
    category: 'Diagnostics'
  }
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
  {
    id: 'positioning-3',
    name: '30-Degree Full Body Bed Support System with 4 Attached Bolsters',
    image: medicalMattressImg,
    originalPrice: 199.99,
    currentPrice: 169.99,
    rating: 4.6,
    reviewCount: 45,
    isFsaEligible: true,
    badges: ['Full Body Support', '4 Bolsters'],
    category: 'Positioning'
  },
  {
    id: 'positioning-4',
    name: '30º Bed System with Slider Sheet and Two Wedges',
    image: medicalMattressImg,
    originalPrice: 159.99,
    currentPrice: 134.99,
    rating: 4.5,
    reviewCount: 67,
    isFsaEligible: true,
    badges: ['Slider Sheet', 'Two Wedges'],
    category: 'Positioning'
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

export const orthopedicProducts: Product[] = [
  {
    id: 'orthopedic-1',
    name: '360 Air Walker Boot',
    image: compressionSocksImg,
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
  {
    id: 'orthopedic-3',
    name: 'Abductor/Contracture Cushion',
    image: medicalMattressImg,
    originalPrice: 99.99,
    currentPrice: 84.99,
    rating: 4.2,
    reviewCount: 34,
    isFsaEligible: true,
    badges: ['10 x 14 x 13', 'Skil-Care'],
    category: 'Orthopedic'
  }
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
  {
    id: 'personal-care-3',
    name: 'Dr. Scholl\'s Hard Skin Remover Glass Foot File',
    image: compressionSocksImg,
    originalPrice: 29.99,
    currentPrice: 24.99,
    rating: 4.9,
    reviewCount: 178,
    isFsaEligible: true,
    badges: ['Glass File', 'Dr. Scholl\'s'],
    category: 'Personal Care'
  }
];

export const disposableProducts: Product[] = [
  {
    id: 'disposable-1',
    name: 'ProCure Nitrile Gloves (Powder Free)',
    image: compressionSocksImg,
    originalPrice: 34.99,
    currentPrice: 27.99,
    rating: 4.6,
    reviewCount: 567,
    isFsaEligible: true,
    badges: ['Powder Free', 'Nitrile'],
    category: 'Disposables'
  },
  {
    id: 'disposable-2',
    name: '7-10 Gallon Clear Trash Bags, 100 Count',
    image: compressionSocksImg,
    originalPrice: 19.99,
    currentPrice: 16.99,
    rating: 4.3,
    reviewCount: 89,
    badges: ['100 Count', 'High Density'],
    category: 'Disposables'
  }
];

export const sunscreenProducts: Product[] = [
  {
    id: 'sunscreen-1',
    name: 'Coppertone Waterbabies Baby Sunscreen Lotion SPF 50',
    image: compressionSocksImg,
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
    image: oxygenConcentratorImg,
    currentPrice: 100.00,
    rating: 4.2,
    reviewCount: 67,
    badges: ['20AH Capacity', 'Metro Mobility'],
    category: 'Battery & Power'
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
  ...batteryProducts
];