import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainNavigation = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationData = [
    {
      title: 'SHOP BY',
      id: 'shop-by',
      subcategories: [
        { name: 'Durable Medical Equipment', path: '/category/durable-medical-equipment' },
        { name: 'Hospital Beds & Mattresses', path: '/category/hospital-beds' },
        { name: 'Mobility Products', path: '/category/mobility' },
        { name: 'Bathroom Safety', path: '/category/bathroom-safety' },
        { name: 'Respiratory Equipment', path: '/category/respiratory' },
        { name: 'Compression Therapy', path: '/category/compression' },
        { name: 'Daily Living Aids', path: '/category/daily-living-aids' },
        { name: 'Patient Lifts & Slings', path: '/category/patient-lifts' },
        { name: 'Wheelchairs & Transport Chairs', path: '/category/wheelchairs' },
        { name: 'Mobility Scooters', path: '/category/mobility-scooters' },
        { name: 'Walkers & Rollator', path: '/category/walkers' },
        { name: 'Canes & Crutches', path: '/category/canes-crutches' },
        { name: 'Multipurpose Ramps', path: '/category/ramps' },
        { name: 'Stair Lift', path: '/category/stair-lift' }
      ]
    },
    {
      title: 'MEDICAL EQUIPMENT',
      id: 'medical-equipment',
      subcategories: [
        { name: 'Hospital Beds', path: '/category/hospital-beds' },
        { name: 'Electric Hospital Beds', path: '/category/electric-hospital-beds' },
        { name: 'Semi-Electric Hospital Beds', path: '/category/semi-electric-beds' },
        { name: 'Adjustable Beds for Seniors', path: '/category/adjustable-beds' },
        { name: 'Rotating Sit to Stand Hospital Bed', path: '/category/rotating-beds' },
        { name: 'Low Hospital Beds', path: '/category/low-hospital-beds' },
        { name: 'Bariatric Hospital Bed', path: '/category/bariatric-beds' },
        { name: 'Hospital Bed Mattresses', path: '/category/bed-mattresses' },
        { name: 'Bed Rails', path: '/category/bed-rails' },
        { name: 'Hospital Bedding', path: '/category/hospital-bedding' },
        { name: 'Bed Pillows', path: '/category/bed-pillows' },
        { name: 'Bed Accessories', path: '/category/bed-accessories' },
        { name: 'Overbed Table', path: '/category/overbed-table' },
        { name: 'Patient Lifts', path: '/category/patient-lifts' },
        { name: 'Bathroom Safety', path: '/category/bathroom-safety' },
        { name: 'Physical Therapy', path: '/category/physical-therapy' }
      ]
    },
    {
      title: 'SHOP BY NEEDS',
      id: 'shop-by-needs',
      subcategories: [
        { name: 'Footwear', path: '/category/diabetic-footwear' },
        { name: 'Medicines & Treatments', path: '/category/medicines' },
        { name: 'Personal Care', path: '/category/personal-care' },
        { name: 'Household & Pet Essentials', path: '/category/household' },
        { name: 'Vitamins & Supplements', path: '/category/vitamins' },
        { name: 'Sexual Wellness', path: '/category/sexual-wellness' },
        { name: 'Home Health Care Solutions', path: '/category/home-health' },
        { name: 'Fitness & Recovery', path: '/category/fitness' },
        { name: 'Caregiver Essentials', path: '/category/caregiver' },
        { name: 'Exam Rooms', path: '/category/exam-rooms' },
        { name: 'Baby & Children', path: '/category/baby-children' },
        { name: 'Diapering', path: '/category/diapering' },
        { name: 'Bath Skin & Hair', path: '/category/bath-skin-hair' },
        { name: 'Feeding & Nursing', path: '/category/feeding-nursing' },
        { name: 'Kids Oral Care', path: '/category/kids-oral-care' },
        { name: 'Children & Baby\'s Health Care', path: '/category/children-health-care' },
        { name: 'Children\'s Vitamins & Supplements', path: '/category/children-vitamins' },
        { name: 'Baby Furniture', path: '/category/baby-furniture' },
        { name: 'Children\'s Masks', path: '/category/children-masks' },
        { name: 'Pediatric DME Products', path: '/category/pediatric-dme' },
        { name: 'Postpartum', path: '/category/postpartum' }
      ]
    },
    {
      title: 'FSA/HSA ELIGIBLE',
      id: 'fsa-hsa',
      subcategories: [
        { name: 'All FSA/HSA Products', path: '/category/fsa-eligible' },
        { name: 'Medical Equipment', path: '/category/fsa-medical-equipment' },
        { name: 'Health Monitors', path: '/category/fsa-monitors' },
        { name: 'Mobility Aids', path: '/category/fsa-mobility' },
        { name: 'Compression Products', path: '/category/fsa-compression' },
        { name: 'Diabetic Care', path: '/category/fsa-diabetic' },
        { name: 'First Aid & Safety', path: '/category/fsa-first-aid' },
        { name: 'Pain Relief', path: '/category/fsa-pain-relief' },
        { name: 'Respiratory Care', path: '/category/fsa-respiratory' }
      ]
    },
    {
      title: 'BRANDS',
      id: 'brands',
      subcategories: [
        { name: 'Drive Medical', path: '/category/drive-medical' },
        { name: 'Invacare', path: '/category/invacare' },
        { name: 'ProHeal', path: '/category/proheal' },
        { name: 'Sammons Preston', path: '/category/sammons-preston' },
        { name: 'APEX medtech', path: '/category/apex-medtech' },
        { name: 'Med-Mizer', path: '/category/med-mizer' },
        { name: 'StarSleep', path: '/category/starsleep' },
        { name: 'Graham Field', path: '/category/graham-field' },
        { name: 'Proactive Medical', path: '/category/proactive-medical' },
        { name: 'Circle Specialty', path: '/category/circle-specialty' },
        { name: 'All Brands', path: '/category/all-brands' }
      ]
    }
  ];

  const handleDropdownEnter = (id: string) => {
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleSubcategoryClick = (path: string) => {
    setActiveDropdown(null);
    navigate(path);
  };

  return (
    <nav className="bg-slate-800 text-white relative z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <ul className="flex items-center space-x-8">
            {navigationData.map((item) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center py-4 px-2 text-sm font-medium hover:text-red-400 transition-colors">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === item.id && (
                  <div className="absolute top-full left-0 bg-white text-gray-900 shadow-xl border rounded-md min-w-[250px] z-50">
                    <div className="py-2">
                      {item.subcategories.map((subcategory, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubcategoryClick(subcategory.path)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-6">
            <span className="text-red-400 font-bold text-sm">COUPONS</span>
            <span className="text-sm">SHOP FSA/HSA</span>
            <span className="text-sm">CONTACT US</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;