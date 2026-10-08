import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp, Laptop, Smartphone, Headphones, Gamepad2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCategory: (categorySlug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateCategory,
}) => {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'MacBook Pro M3 Max',
    'Sony WH-1000XM5',
    'PlayStation 5 Pro',
    'OLED Gaming Monitor',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = [
    'Gaming Laptop',
    'Noise Canceling Earbuds',
    'RTX 4090',
    'Titanium Smartwatch',
    '4K Mirrorless Camera',
  ];

  // Dynamic search matches
  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specs.some((s) => s.value.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  const handleSearchCommit = (term: string) => {
    if (!term.trim()) return;
    if (!recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev.slice(0, 4)]);
    }
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchCommit(query);
            }}
            placeholder="Search laptops, smartphones, headphones, GPUs..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 space-y-6">
          {query.trim() ? (
            /* Search Results */
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Matching Products ({filteredProducts.length})
                </span>
                <span className="text-xs text-slate-400">
                  Showing top electronics results
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        handleSearchCommit(p.name);
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                            {p.brand} · {p.category}
                          </div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                            {p.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right pl-4">
                        <div className="text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        {p.discountPercent > 0 && (
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            {p.discountPercent}% OFF
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    No hardware found for "<span className="text-cyan-500 font-medium">{query}</span>"
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try checking your spelling or search by brand name like Apple, Sony, Samsung, ASUS.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Default Search Dashboard (Recent, Popular, Categories) */
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
                    Recent Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleSearchCommit(item)}
                        className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Popular Tech Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSearchCommit(item)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Browse by Department
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Laptops', slug: 'laptops', icon: Laptop },
                    { label: 'Smartphones', slug: 'smartphones', icon: Smartphone },
                    { label: 'Audio', slug: 'audio', icon: Headphones },
                    { label: 'Gaming', slug: 'gaming', icon: Gamepad2 },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          onNavigateCategory(cat.slug);
                          onClose();
                        }}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors text-left group"
                      >
                        <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">↵</kbd> to search</span>
            <span>·</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">ESC</kbd> to exit</span>
          </div>
          <button
            onClick={() => {
              onNavigateCategory('all');
              onClose();
            }}
            className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
          >
            Explore all {products.length} products
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
