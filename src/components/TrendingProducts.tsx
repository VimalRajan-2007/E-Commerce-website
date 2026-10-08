import React, { useState } from 'react';
import { LayoutGrid, List, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface TrendingProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalog: (category?: string) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products,
  onSelectProduct,
  onExploreCatalog,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'laptops' | 'smartphones' | 'audio' | 'gaming'>('all');
  const [layout, setLayout] = useState<'grid' | 'compact'>('grid');

  const filtered = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.categorySlug === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Category Filter Buttons and Layout Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display mt-1">
              Trending Hardware
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Interactive Filter Tabs (Functional segmented buttons per design constitution) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {[
                { id: 'all', label: 'All' },
                { id: 'laptops', label: 'Laptops' },
                { id: 'smartphones', label: 'Smartphones' },
                { id: 'audio', label: 'Audio' },
                { id: 'gaming', label: 'Gaming' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'compact'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Compact List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        {layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                layout="grid"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                layout="compact"
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to Full Catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onExploreCatalog(activeTab === 'all' ? undefined : activeTab)}
            className="px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 font-bold text-xs tracking-wide transition-colors cursor-pointer"
          >
            Explore All {activeTab.toUpperCase()} ({products.filter((p) => activeTab === 'all' || p.categorySlug === activeTab).length} models)
          </button>
        </div>
      </div>
    </section>
  );
};
