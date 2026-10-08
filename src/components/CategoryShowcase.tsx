import React from 'react';
import { CATEGORIES } from '../data/products';
import {
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Monitor,
  Tablet,
  Watch,
  Camera,
  Cpu,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (slug: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Monitor,
  Tablet,
  Watch,
  Camera,
  Cpu,
  Zap,
};

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Department Navigation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display mt-1">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
          >
            <span>Browse Full Electronics Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Laptop;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group relative p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-200 text-left flex flex-col justify-between h-40 cursor-pointer hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 group-hover:border-cyan-500/40 transition-colors shadow-sm">
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {cat.productCount} Premium Models
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
