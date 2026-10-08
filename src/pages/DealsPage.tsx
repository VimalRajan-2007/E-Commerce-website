import React, { useState } from 'react';
import { Flame, Timer, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface DealsPageProps {
  onSelectProduct: (product: Product) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({ onSelectProduct }) => {
  const { products } = useStore();
  const [dealCategory, setDealCategory] = useState<string>('all');

  const dealProducts = products.filter(
    (p) => (p.isDeal || p.discountPercent >= 10) && (dealCategory === 'all' || p.categorySlug === dealCategory)
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Deals Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-amber-500/20 text-white space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>Seasonal Hardware Clearout</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white">
            Exclusive Electronics Deals & Special Drops
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Direct price reductions on high-tier laptops, flagship 5G devices, studio monitors, and audiophile gear. All backed with official manufacturer warranty.
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-amber-300 font-semibold">
            <Tag className="w-4 h-4" />
            <span>Use checkout code <strong>NEXORA20</strong> for up to 20% savings on qualifying carts</span>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Deals' },
            { id: 'laptops', label: 'Laptop Sales' },
            { id: 'smartphones', label: 'Smartphone Deals' },
            { id: 'audio', label: 'Audio & Hi-Fi' },
            { id: 'gaming', label: 'Gaming Hardware' },
            { id: 'accessories', label: 'Accessories' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDealCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                dealCategory === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
