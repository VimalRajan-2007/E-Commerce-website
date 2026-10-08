import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface QuickViewModalProps {
  onNavigateProduct: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigateProduct }) => {
  const { quickViewProduct, closeQuickView, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="p-8 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-72 object-contain hover:scale-105 transition-transform"
            />
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {product.brand} · {product.category}
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight font-display">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {product.rating}
                </span>
                <span>·</span>
                <span>{product.reviewCount} customer reviews</span>
                <span>·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">In Stock</span>
              </div>

              {/* Price & EMI */}
              <div className="pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black tabular-nums text-slate-900 dark:text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  EMI available starting from ₹{Math.round(product.price / 12).toLocaleString('en-IN')}/month
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Quick Specs Highlight */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                {product.specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">{spec.key}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    closeQuickView();
                  }}
                  className="flex-1 py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    isFavorited ? 'text-rose-500' : 'text-slate-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  closeQuickView();
                  onNavigateProduct(product);
                }}
                className="w-full text-center text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center justify-center gap-1"
              >
                <span>View Full Product Specifications & Customer Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
