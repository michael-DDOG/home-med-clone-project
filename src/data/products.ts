import pulseOximeterImg from '@/assets/pulse-oximeter.jpg';
import bloodPressureImg from '@/assets/blood-pressure-monitor.jpg';
import tensUnitImg from '@/assets/tens-unit.jpg';
import thermometerImg from '@/assets/thermometer.jpg';
import nebulizerImg from '@/assets/nebulizer.jpg';
import glucoseMeterImg from '@/assets/glucose-meter.jpg';

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