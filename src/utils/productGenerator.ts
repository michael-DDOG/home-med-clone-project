import { Product } from '@/data/products';
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

// Product name templates for different categories
const productTemplates = {
  wellness: [
    'Digital Fingertip Pulse Oximeter',
    'Blood Pressure Monitor',
    'TENS Unit Pain Relief Device',
    'Digital Thermometer',
    'Nebulizer Machine',
    'Blood Glucose Monitor',
    'Heart Rate Monitor',
    'Pulse Oximeter',
    'Digital Scale',
    'Blood Pressure Cuff',
    'Stethoscope',
    'Medical Thermometer',
    'Oxygen Monitor',
    'EKG Monitor',
    'Sleep Apnea Monitor'
  ],
  mobility: [
    'Lightweight Wheelchair',
    'Transport Wheelchair',
    'Folding Walker',
    'Rollator Walker',
    'Walking Cane',
    'Quad Cane',
    'Mobility Scooter',
    'Transfer Board',
    'Gait Belt',
    'Walking Frame',
    'Mobility Aid',
    'Wheelchair Cushion',
    'Walker Accessories',
    'Mobility Ramp',
    'Transfer Disc'
  ],
  respiratory: [
    'Oxygen Concentrator',
    'CPAP Machine',
    'BiPAP Machine',
    'Nebulizer',
    'Pulse Oximeter',
    'Peak Flow Meter',
    'Spirometer',
    'Humidifier',
    'Oxygen Tank',
    'Nasal Cannula',
    'CPAP Mask',
    'Oxygen Mask',
    'Breathing Exerciser',
    'Incentive Spirometer',
    'Portable Ventilator'
  ],
  hospitalBeds: [
    'Semi-Electric Hospital Bed',
    'Full Electric Hospital Bed',
    'Manual Hospital Bed',
    'Bariatric Hospital Bed',
    'Low Hospital Bed',
    'ICU Bed',
    'Medical Mattress',
    'Pressure Relief Mattress',
    'Air Mattress',
    'Foam Mattress',
    'Gel Mattress',
    'Bed Rails',
    'Overbed Table',
    'Bed Trapeze',
    'Patient Lift'
  ],
  bathroomSafety: [
    'Grab Bar',
    'Shower Chair',
    'Bath Bench',
    'Toilet Safety Frame',
    'Raised Toilet Seat',
    'Bedside Commode',
    'Shower Stool',
    'Bath Lift',
    'Transfer Bench',
    'Toilet Paper Aid',
    'Long Handle Sponge',
    'Shower Caddy',
    'Non-Slip Mat',
    'Bath Pillow',
    'Shower Curtain'
  ]
};

const brands = ['ProHeal', 'MedEquip', 'HealthCare Pro', 'MediSupply', 'CareMax', 'LifeSupport', 'MedTech', 'HealthFirst'];
const badges = ['FDA Approved', 'Best Seller', 'Staff Pick', 'Professional Grade', 'Clinically Validated', 'Top Rated', 'Premium Quality'];

// Generate products for a specific category
export function generateProductsForCategory(
  categoryName: string, 
  count: number = 100,
  baseImage: string,
  categoryType: string
): Product[] {
  const products: Product[] = [];
  const templates = productTemplates[categoryType as keyof typeof productTemplates] || productTemplates.wellness;
  
  for (let i = 0; i < count; i++) {
    const templateIndex = i % templates.length;
    const template = templates[templateIndex];
    const variation = Math.floor(i / templates.length) + 1;
    
    const basePrice = Math.random() * 800 + 50; // $50-$850 range
    const discount = Math.random() * 0.3; // 0-30% discount
    const originalPrice = basePrice;
    const currentPrice = basePrice * (1 - discount);
    
    const rating = 4.0 + Math.random() * 1.0; // 4.0-5.0 rating
    const reviewCount = Math.floor(Math.random() * 1000) + 50; // 50-1050 reviews
    
    const product: Product = {
      id: `${categoryName.toLowerCase()}-${i + 1}`,
      name: variation > 1 ? `${template} - Model ${variation}` : template,
      image: baseImage,
      originalPrice: Math.round(originalPrice * 100) / 100,
      currentPrice: Math.round(currentPrice * 100) / 100,
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      isStaffPick: Math.random() > 0.8, // 20% chance
      isFsaEligible: Math.random() > 0.2, // 80% chance
      badges: Math.random() > 0.5 ? [badges[Math.floor(Math.random() * badges.length)]] : [],
      category: categoryName
    };
    
    products.push(product);
  }
  
  return products;
}

// Generate comprehensive product catalog
export function generateComprehensiveCatalog(): {
  [key: string]: Product[]
} {
  return {
    wellness: generateProductsForCategory('Wellness', 120, pulseOximeterImg, 'wellness'),
    mobility: generateProductsForCategory('Mobility', 110, wheelchairImg, 'mobility'),
    respiratory: generateProductsForCategory('Respiratory', 105, oxygenConcentratorImg, 'respiratory'),
    hospitalBeds: generateProductsForCategory('Hospital Beds', 115, hospitalBedImg, 'hospitalBeds'),
    bathroomSafety: generateProductsForCategory('Bathroom Safety', 108, grabBarImg, 'bathroomSafety'),
    compression: generateProductsForCategory('Compression', 102, compressionSocksImg, 'wellness'),
    diagnostics: generateProductsForCategory('Diagnostics', 118, pulseOximeterImg, 'wellness'),
    pediatric: generateProductsForCategory('Pediatric', 103, wheelchairImg, 'mobility'),
    orthopedic: generateProductsForCategory('Orthopedic', 125, compressionSocksImg, 'wellness'),
    positioning: generateProductsForCategory('Positioning', 112, medicalMattressImg, 'hospitalBeds'),
    personalCare: generateProductsForCategory('Personal Care', 135, tensUnitImg, 'wellness'),
    disposables: generateProductsForCategory('Disposables', 140, compressionSocksImg, 'wellness')
  };
}