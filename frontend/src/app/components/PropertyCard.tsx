import { Home, Droplet, Zap, Wifi, MapPin, MessageCircle, Shield, CheckCircle } from 'lucide-react';

interface PropertyCardProps {
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
}

export function PropertyCard({
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  image,
  waterType,
  hasBackupPower,
  fiberProviders,
  distanceToRoad,
  agentWhatsApp,
  verified
}: PropertyCardProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the property: ${title}`);
    window.open(`https://wa.me/${agentWhatsApp}?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-gradient-to-br from-zinc-900 to-zinc-900/80 rounded-xl overflow-hidden border border-zinc-800/50 hover:border-yellow-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-600/10 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {verified && (
          <div className="absolute top-3 right-3 bg-yellow-600 text-black px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg">
            <Shield className="w-3 h-3" />
            Verified
          </div>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="text-xl font-bold text-white">
            KSH {price.toLocaleString()}
            <span className="text-xs text-zinc-300 font-normal ml-1">/mo</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-1.5 line-clamp-1">{title}</h3>

        <div className="flex items-center gap-1.5 text-yellow-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs">{location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-3 mb-3 text-zinc-400 text-xs">
          <div className="flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="w-1 h-1 bg-zinc-700 rounded-full" />
          <div className="flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="w-1 h-1 bg-zinc-700 rounded-full" />
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{distanceToRoad}m</span>
          </div>
        </div>

        {/* Utilities Tags - Compact */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {waterType === 'borehole' && (
            <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-blue-500/20">
              <Droplet className="w-2.5 h-2.5" />
              Borehole
            </span>
          )}
          {waterType === 'council' && (
            <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-blue-500/20">
              <Droplet className="w-2.5 h-2.5" />
              Council
            </span>
          )}
          {waterType === 'both' && (
            <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-blue-500/20">
              <Droplet className="w-2.5 h-2.5" />
              Both
            </span>
          )}
          {hasBackupPower && (
            <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-amber-500/20">
              <Zap className="w-2.5 h-2.5" />
              Power
            </span>
          )}
          {fiberProviders.map((provider) => (
            <span key={provider} className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-purple-500/20">
              <Wifi className="w-2.5 h-2.5" />
              {provider}
            </span>
          ))}
        </div>

        {/* WhatsApp Button - Compact */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm group-hover:shadow-lg group-hover:shadow-yellow-600/20"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}
