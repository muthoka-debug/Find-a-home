export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  waterType: 'borehole' | 'council' | 'both';
  hasBackupPower: boolean;
  fiberProviders: string[];
  distanceToRoad: number;
  agentWhatsApp: string;
  verified: boolean;
  coordinates: { lat: number; lng: number };
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern 3BR Apartment in Kilimani',
    price: 85000,
    location: 'Kilimani, Nairobi',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    waterType: 'both',
    hasBackupPower: true,
    fiberProviders: ['Safaricom', 'Zuku'],
    distanceToRoad: 150,
    agentWhatsApp: '254700000000',
    verified: true,
    coordinates: { lat: -1.2921, lng: 36.7872 }
  },
  {
    id: '2',
    title: 'Spacious 2BR in Westlands',
    price: 65000,
    location: 'Westlands, Nairobi',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    waterType: 'borehole',
    hasBackupPower: true,
    fiberProviders: ['Safaricom'],
    distanceToRoad: 200,
    agentWhatsApp: '254700000001',
    verified: true,
    coordinates: { lat: -1.2676, lng: 36.8070 }
  },
  {
    id: '3',
    title: 'Luxury 4BR Penthouse',
    price: 150000,
    location: 'Lavington, Nairobi',
    bedrooms: 4,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    waterType: 'both',
    hasBackupPower: true,
    fiberProviders: ['Safaricom', 'Zuku'],
    distanceToRoad: 100,
    agentWhatsApp: '254700000002',
    verified: true,
    coordinates: { lat: -1.2833, lng: 36.7667 }
  },
  {
    id: '4',
    title: 'Cozy 1BR Studio in Ngong Road',
    price: 35000,
    location: 'Ngong Road, Nairobi',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    waterType: 'council',
    hasBackupPower: false,
    fiberProviders: ['Zuku'],
    distanceToRoad: 300,
    agentWhatsApp: '254700000003',
    verified: true,
    coordinates: { lat: -1.3030, lng: 36.7640 }
  },
  {
    id: '5',
    title: 'Family 3BR with Garden',
    price: 75000,
    location: 'Karen, Nairobi',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    waterType: 'borehole',
    hasBackupPower: true,
    fiberProviders: ['Safaricom'],
    distanceToRoad: 500,
    agentWhatsApp: '254700000004',
    verified: true,
    coordinates: { lat: -1.3197, lng: 36.7078 }
  },
  {
    id: '6',
    title: 'Executive 2BR in Kileleshwa',
    price: 70000,
    location: 'Kileleshwa, Nairobi',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    waterType: 'both',
    hasBackupPower: true,
    fiberProviders: ['Safaricom', 'Zuku'],
    distanceToRoad: 250,
    agentWhatsApp: '254700000005',
    verified: true,
    coordinates: { lat: -1.2886, lng: 36.7774 }
  },
  {
    id: '7',
    title: 'Affordable 1BR in South B',
    price: 28000,
    location: 'South B, Nairobi',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    waterType: 'council',
    hasBackupPower: false,
    fiberProviders: ['Safaricom'],
    distanceToRoad: 180,
    agentWhatsApp: '254700000006',
    verified: true,
    coordinates: { lat: -1.3167, lng: 36.8333 }
  },
  {
    id: '8',
    title: 'Elegant 3BR Townhouse',
    price: 95000,
    location: 'Runda, Nairobi',
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    waterType: 'both',
    hasBackupPower: true,
    fiberProviders: ['Safaricom', 'Zuku'],
    distanceToRoad: 400,
    agentWhatsApp: '254700000007',
    verified: true,
    coordinates: { lat: -1.2167, lng: 36.7833 }
  },
  {
    id: '9',
    title: 'Compact Studio in Parklands',
    price: 32000,
    location: 'Parklands, Nairobi',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    waterType: 'borehole',
    hasBackupPower: true,
    fiberProviders: ['Zuku'],
    distanceToRoad: 120,
    agentWhatsApp: '254700000008',
    verified: true,
    coordinates: { lat: -1.2630, lng: 36.8583 }
  }
];
