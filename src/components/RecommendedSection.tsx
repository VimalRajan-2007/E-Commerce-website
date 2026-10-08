import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

interface RecommendedSectionProps {
  onSelectProduct: (product: Product) => void;
  onExploreMore: () => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  onSelectProduct,
  onExploreMore,
}) => {
  const { products, recentlyViewed } = useStore();

  // Find categories from recently viewed or fallback to featured
  const recentCategories = new Set(recentlyViewed.map((p) => p.categorySlug));
  
  const recommended = products
    .filter((p) => recentCategories.has(p.categorySlug) || p.isFeatured)
    .slice(0, 4);

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Hardware Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display mt-1">
              Recommended For You
            </h2>
          </div>
          <button
            onClick={onExploreMore}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>See more suggestions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
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
