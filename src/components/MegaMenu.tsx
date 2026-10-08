import React from 'react';
import { Laptop, Smartphone, Headphones, Gamepad2, Zap, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (slug: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onSelectCategory }) => {
  if (!isOpen) return null;

  const categories = [
    {
      title: 'Computing',
      icon: Laptop,
      slug: 'laptops',
      items: [
        { name: 'Creator & Pro Laptops', slug: 'laptops' },
        { name: '4K & OLED Monitors', slug: 'monitors' },
        { name: 'PC Components & GPUs', slug: 'components' },
        { name: 'NVMe SSDs & RAM', slug: 'components' },
      ],
    },
    {
      title: 'Mobile & Wearables',
      icon: Smartphone,
      slug: 'smartphones',
      items: [
        { name: 'Flagship Smartphones', slug: 'smartphones' },
        { name: 'OLED Productivity Tablets', slug: 'tablets' },
        { name: 'Titanium Smartwatches', slug: 'smartwatches' },
        { name: 'Stylus Pens & Folios', slug: 'tablets' },
      ],
    },
    {
      title: 'Hi-Fi Audio',
      icon: Headphones,
      slug: 'audio',
      items: [
        { name: 'Studio Over-Ear Headphones', slug: 'audio' },
        { name: 'Noise-Cancelling Earbuds', slug: 'audio' },
        { name: 'High-Fidelity Speakers', slug: 'audio' },
        { name: 'Microphones & DACs', slug: 'audio' },
      ],
    },
    {
      title: 'Gaming Gear',
      icon: Gamepad2,
      slug: 'gaming',
      items: [
        { name: 'PlayStation & Consoles', slug: 'gaming' },
        { name: 'High-Refresh Handhelds', slug: 'gaming' },
        { name: 'Esports Mice & Keyboards', slug: 'gaming' },
        { name: 'Spatial Gaming Headsets', slug: 'gaming' },
      ],
    },
    {
      title: 'Power & Peripherals',
      icon: Zap,
      slug: 'accessories',
      items: [
        { name: 'GaN 250W Power Banks', slug: 'accessories' },
        { name: 'Thunderbolt 4 Docks', slug: 'accessories' },
        { name: '3-in-1 Wireless Chargers', slug: 'accessories' },
        { name: 'Tri-Band Wi-Fi 7 Mesh', slug: 'accessories' },
      ],
    },
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-200 z-40 py-8 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="space-y-4">
                <button
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onClose();
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group text-left"
                >
                  <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{cat.title}</span>
                </button>
                <ul className="space-y-2.5 text-xs">
                  {cat.items.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          onSelectCategory(item.slug);
                          onClose();
                        }}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Featured Spotlight Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-xl border border-slate-800 text-white flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <Flame className="w-3.5 h-3.5" />
                <span>Featured Showcase</span>
              </div>
              <h4 className="font-bold text-sm tracking-tight text-white">
                Sony WH-1000XM5
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Save 14% on industry-defining noise cancelling technology.
              </p>
            </div>
            <button
              onClick={() => {
                onSelectCategory('audio');
                onClose();
              }}
              className="mt-4 flex items-center justify-between text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group pt-2 border-t border-slate-800"
            >
              <span>Explore Audio Deals</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% Genuine Manufacturer Hardware
            </span>
            <span>·</span>
            <span>All-India Express Delivery within 48-72h</span>
            <span>·</span>
            <span>Zero-Cost EMI Available</span>
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              onClose();
            }}
            className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
          >
            View Complete Catalog (40+ Devices) →
          </button>
        </div>
      </div>
    </div>
  );
};
