import React from 'react';
import { X, Scale, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface CompareModalProps {
  onSelectProduct: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ onSelectProduct }) => {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart,
  } = useStore();

  if (!isCompareOpen) return null;

  // Extract all unique spec keys across the compared devices
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => p.specs.map((s) => s.key)))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Compare Hardware ({compareList.length}/3)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="overflow-auto p-6 flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Scale className="w-12 h-12 text-slate-400 mx-auto opacity-40" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No products selected for comparison
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse our catalog and click the scale icon on any product card to compare technical specifications side-by-side.
              </p>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="min-w-[640px]">
              {/* Product Headers */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-400 pt-4">
                  Feature / Device
                </div>
                {compareList.map((product) => (
                  <div key={product.id} className="space-y-3 relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-0 right-0 p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="w-24 h-24 mx-auto rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 flex items-center justify-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain cursor-pointer"
                        onClick={() => {
                          setIsCompareOpen(false);
                          onSelectProduct(product);
                        }}
                      />
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">
                        {product.brand}
                      </span>
                      <h4
                        onClick={() => {
                          setIsCompareOpen(false);
                          onSelectProduct(product);
                        }}
                        className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-cyan-500 cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <div className="text-sm font-black tabular-nums text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-400 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                ))}
                {/* Empty slot placeholder if < 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-400"
                  >
                    <span className="text-xs font-semibold">+ Add device</span>
                  </div>
                ))}
              </div>

              {/* General Specs Rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {/* Price Row */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-semibold text-slate-500">Price</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="font-bold tabular-nums text-slate-900 dark:text-white">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <span key={i} className="text-slate-400">—</span>
                  ))}
                </div>

                {/* Rating Row */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-semibold text-slate-500">Rating & Reviews</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="font-medium text-slate-700 dark:text-slate-300">
                      ★ {p.rating} ({p.reviewCount} reviews)
                    </span>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <span key={i} className="text-slate-400">—</span>
                  ))}
                </div>

                {/* Stock Status */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-semibold text-slate-500">Availability</span>
                  {compareList.map((p) => (
                    <span
                      key={p.id}
                      className={`font-semibold capitalize ${
                        p.stockStatus === 'in_stock'
                          ? 'text-emerald-500'
                          : p.stockStatus === 'low_stock'
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}
                    >
                      {p.stockStatus.replace('_', ' ')} ({p.stock} units)
                    </span>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <span key={i} className="text-slate-400">—</span>
                  ))}
                </div>

                {/* Technical Specs Rows */}
                {allSpecKeys.map((key) => (
                  <div key={key} className="grid grid-cols-4 gap-4 py-3 items-start">
                    <span className="font-semibold text-slate-500">{key}</span>
                    {compareList.map((p) => {
                      const spec = p.specs.find((s) => s.key === key);
                      return (
                        <span key={p.id} className="text-slate-800 dark:text-slate-200 font-medium">
                          {spec ? spec.value : '—'}
                        </span>
                      );
                    })}
                    {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                      <span key={i} className="text-slate-400">—</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
