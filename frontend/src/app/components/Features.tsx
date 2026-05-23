import { motion } from 'framer-motion';
import { Shield, Droplet, Wifi, MapPin } from 'lucide-react';

const features = [
  {
    icon: Shield,
    label: 'Verified Listings',
    description: 'Every property manually verified to prevent scams'
  },
  {
    icon: Droplet,
    label: 'Utilities Transparent',
    description: 'Clear water & power info with explicit tags'
  },
  {
    icon: Wifi,
    label: 'Fiber Ready',
    description: 'Filter by ISP availability (Safaricom/Zuku)'
  },
  {
    icon: MapPin,
    label: 'Commute Info',
    description: 'Distance to main roads for public transport users'
  }
];

export function Features() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
      {features.map((feature, index) => (
        <motion.div
          key={feature.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4 hover:border-yellow-600/50 hover:shadow-lg hover:shadow-yellow-600/10 transition-all group"
        >
          <div className="bg-yellow-600/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-600/20 transition-colors">
            <feature.icon className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">{feature.label}</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
