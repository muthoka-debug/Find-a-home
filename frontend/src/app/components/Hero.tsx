import { motion } from 'framer-motion';
import { Search, Shield } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
}

const heroImages = [
  'https://images.unsplash.com/photo-1706808849827-7366c098b317?w=1920&q=80',
  'https://images.unsplash.com/photo-1706855203772-c249b75fe016?w=1920&q=80',
  'https://images.unsplash.com/photo-1706808849803-f61304e024ab?w=1920&q=80',
  'https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?w=1920&q=80',
  'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=1920&q=80'
];

export function Hero({ onSearch }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    // Scroll to listings
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={image}
              alt={`Luxury home ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/30 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-600 text-sm font-medium">100% Verified Listings</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Dream Home
              </span>
            </h1>

            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Discover verified properties with complete utilities information, fiber connectivity,
              and commute details. No scams, no surprises.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl pl-16 pr-6 py-5 text-white text-lg placeholder:text-zinc-400 focus:outline-none focus:border-yellow-600 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage
                ? 'bg-yellow-600 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-yellow-600 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-yellow-600 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
