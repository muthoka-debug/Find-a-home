import { SlidersHorizontal, ChevronDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  priceRange: [number, number];
  bedrooms: number | null;
  waterType: string[];
  backupPower: boolean;
  fiberProviders: string[];
  maxDistanceToRoad: number;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 200000],
    bedrooms: null,
    waterType: [],
    backupPower: false,
    fiberProviders: [],
    maxDistanceToRoad: 5000
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    bedrooms: true,
    utilities: false,
    connectivity: false,
    location: false
  });

  const updateFilters = (updates: Partial<Filters>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: 'waterType' | 'fiberProviders', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilters({ [key]: updated });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters =
    filters.bedrooms !== null ||
    filters.waterType.length > 0 ||
    filters.backupPower ||
    filters.fiberProviders.length > 0 ||
    filters.maxDistanceToRoad < 5000 ||
    filters.priceRange[1] < 200000;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/80 px-5 py-4 border-b border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-600/10 p-1.5 rounded-lg">
              <SlidersHorizontal className="w-4 h-4 text-yellow-600" />
            </div>
            <h2 className="font-semibold text-white">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => {
                const resetFilters: Filters = {
                  priceRange: [0, 200000],
                  bedrooms: null,
                  waterType: [],
                  backupPower: false,
                  fiberProviders: [],
                  maxDistanceToRoad: 5000
                };
                setFilters(resetFilters);
                onFilterChange(resetFilters);
              }}
              className="text-xs text-yellow-600 hover:text-yellow-500 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Price Range */}
        <div className="border-b border-zinc-800/50">
          <button
            onClick={() => toggleSection('price')}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-200">Price Range</span>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.price && (
            <div className="px-5 pb-4">
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters({ priceRange: [0, parseInt(e.target.value)] })}
                className="w-full accent-yellow-600"
              />
              <div className="text-sm text-yellow-600 font-medium mt-2">
                Up to KSH {filters.priceRange[1].toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Bedrooms */}
        <div className="border-b border-zinc-800/50">
          <button
            onClick={() => toggleSection('bedrooms')}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-200">Bedrooms</span>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedSections.bedrooms ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.bedrooms && (
            <div className="px-5 pb-4">
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => updateFilters({ bedrooms: filters.bedrooms === num ? null : num })}
                    className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                      filters.bedrooms === num
                        ? 'bg-yellow-600 border-yellow-600 text-black shadow-lg shadow-yellow-600/20'
                        : 'border-zinc-700/50 text-zinc-400 hover:border-yellow-600/50 hover:text-yellow-600'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Utilities */}
        <div className="border-b border-zinc-800/50">
          <button
            onClick={() => toggleSection('utilities')}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-200">Utilities</span>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedSections.utilities ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.utilities && (
            <div className="px-5 pb-4 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 mb-2">Water Source</p>
                <div className="space-y-2">
                  {['borehole', 'council', 'both'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.waterType.includes(type)}
                        onChange={() => toggleArrayFilter('waterType', type)}
                        className="w-3.5 h-3.5 accent-yellow-600 cursor-pointer"
                      />
                      <span className="text-sm text-zinc-300 group-hover:text-yellow-600 transition-colors capitalize">
                        {type === 'both' ? 'Both Sources' : type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.backupPower}
                    onChange={(e) => updateFilters({ backupPower: e.target.checked })}
                    className="w-3.5 h-3.5 accent-yellow-600 cursor-pointer"
                  />
                  <span className="text-sm text-zinc-300 group-hover:text-yellow-600 transition-colors">
                    Backup Power
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Connectivity */}
        <div className="border-b border-zinc-800/50">
          <button
            onClick={() => toggleSection('connectivity')}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-200">Fiber Ready</span>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedSections.connectivity ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.connectivity && (
            <div className="px-5 pb-4 space-y-2">
              {['Safaricom', 'Zuku'].map(provider => (
                <label key={provider} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.fiberProviders.includes(provider)}
                    onChange={() => toggleArrayFilter('fiberProviders', provider)}
                    className="w-3.5 h-3.5 accent-yellow-600 cursor-pointer"
                  />
                  <span className="text-sm text-zinc-300 group-hover:text-yellow-600 transition-colors">
                    {provider}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <button
            onClick={() => toggleSection('location')}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-200">Commute Distance</span>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedSections.location ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.location && (
            <div className="px-5 pb-4">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.maxDistanceToRoad}
                onChange={(e) => updateFilters({ maxDistanceToRoad: parseInt(e.target.value) })}
                className="w-full accent-yellow-600"
              />
              <div className="text-sm text-zinc-400 mt-2">
                Max {filters.maxDistanceToRoad}m to road
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
