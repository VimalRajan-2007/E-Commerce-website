import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FlashDealsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllDeals: () => void;
}

export const FlashDeals: React.FC<FlashDealsProps> = ({
  products,
  onSelectProduct,
  onViewAllDeals,
}) => {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isDeal || p.discountPercent >= 12).slice(0, 4);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Countdown Clock */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Limited Hardware Allocation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
              Flash Deals & Special Drops
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 text-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 shadow-sm">
              <Timer className="w-4 h-4 text-amber-400" />
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                <span className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-amber-400">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            <button
              onClick={onViewAllDeals}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Deals Cards Grid */}
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
    </section>
  );
};
