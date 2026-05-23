import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { FilterSidebar, Filters } from '../components/FilterSidebar';
import { PropertyCard } from '../components/PropertyCard';
import { mockProperties } from '../data/mockProperties';

export function Properties() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 200000],
    bedrooms: null,
    waterType: [],
    backupPower: false,
    fiberProviders: [],
    maxDistanceToRoad: 5000
  });

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Price filter
      if (property.price > filters.priceRange[1]) return false;

      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;

      // Water type filter
      if (filters.waterType.length > 0) {
        if (!filters.waterType.includes(property.waterType)) return false;
      }

      // Backup power filter
      if (filters.backupPower && !property.hasBackupPower) return false;

      // Fiber providers filter
      if (filters.fiberProviders.length > 0) {
        const hasProvider = filters.fiberProviders.some(provider =>
          property.fiberProviders.includes(provider)
        );
        if (!hasProvider) return false;
      }

      // Distance to road filter
      if (property.distanceToRoad > filters.maxDistanceToRoad) return false;

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <main className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">All Properties</h1>
        <p className="text-zinc-400">
          Browse through our complete collection of verified listings
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search by location or property type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-600 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
        {/* Sidebar */}
        <aside>
          <FilterSidebar onFilterChange={setFilters} />
        </aside>

        {/* Listings */}
        <div>
          <div className="mb-6">
            <p className="text-zinc-400">
              {filteredProperties.length} verified listing{filteredProperties.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
                <p className="text-zinc-400">Try adjusting your filters to see more results</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
