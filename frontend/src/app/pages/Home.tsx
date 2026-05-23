import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { PropertyCard } from '../components/PropertyCard';
import { MapPin, ArrowRight } from 'lucide-react';
import { mockProperties } from '../data/mockProperties';

// Default location (Nairobi CBD)
const DEFAULT_LOCATION = { lat: -1.2864, lng: 36.8172 };

// Calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function Home() {
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [locationName, setLocationName] = useState('Nairobi CBD');

  useEffect(() => {
    // Try to get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationName('Your Location');
        },
        () => {
          // If permission denied, use default location
          console.log('Using default location');
        }
      );
    }
  }, []);

  const recommendedProperties = useMemo(() => {
    return mockProperties
      .map(property => ({
        ...property,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          property.coordinates.lat,
          property.coordinates.lng
        )
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6);
  }, [userLocation]);

  const handleHeroSearch = (query: string) => {
    // Navigate to properties page with search query
    window.location.href = `/properties?search=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Hero onSearch={handleHeroSearch} />

      <main className="container mx-auto px-6 py-12">
        {/* Recommended Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-yellow-600" />
                <h2 className="text-3xl font-bold text-white">
                  Recommended Near You
                </h2>
              </div>
              <p className="text-zinc-400">
                Closest verified properties to {locationName}
              </p>
            </div>
            <Link
              to="/properties"
              className="flex items-center gap-2 text-yellow-600 hover:text-yellow-500 font-semibold transition-colors group"
            >
              View All Properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedProperties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why Choose Find a Home?
          </h2>
          <Features />
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-black/80 mb-6 text-lg">
            Browse through hundreds of verified listings with complete utilities information
          </p>
          <Link
            to="/properties"
            className="inline-block bg-black hover:bg-zinc-900 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Explore All Properties
          </Link>
        </div>
      </main>
    </>
  );
}
