import React from 'react';
import { Heart, Eye, ShoppingCart, Star, Check, Scale } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  layout?: 'grid' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  layout = 'grid',
}) => {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    openQuickView,
    addToCompare,
    compareList,
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  if (layout === 'compact') {
    return (
      <div className="group flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div
          className="flex items-center gap-4 w-full sm:w-auto cursor-pointer"
          onClick={() => onSelect(product)}
        >
          <div className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              {product.brand} · {product.category}
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating}
              </span>
              <span>·</span>
              <span>{product.reviewCount} reviews</span>
              {product.stockStatus === 'low_stock' && (
                <>
                  <span>·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Only {product.stock} left</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <div className="text-base font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                isFavorited ? 'text-rose-500' : 'text-slate-400'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-950 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Top Image Showcase (Solid neutral backdrop, 65-75% visual prominence) */}
      <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-center overflow-hidden">
        
        {/* Subtle Discount or Deal Tag (No colored pill sandwiches) */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Quick Actions (Floating Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label="Wishlist toggle"
            className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
              isFavorited
                ? 'bg-rose-500/10 text-rose-500'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            aria-label="Quick preview"
            className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-500 hover:text-cyan-500 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            aria-label="Compare device"
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-blue-600 text-white opacity-100'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 hover:text-blue-500 opacity-0 group-hover:opacity-100'
            }`}
            title="Compare"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Clickable Product Image */}
        <div
          onClick={() => onSelect(product)}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        
        {/* Brand & Category Kicker (Unboxed text with dot separator) */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Social Proof (Star rating and reviews) */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span aria-hidden="true">·</span>
          <span>{product.reviewCount} reviews</span>
          {product.stockStatus === 'low_stock' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">Only {product.stock} left</span>
            </>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="text-base font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stockStatus === 'out_of_stock'}
            className="px-3.5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-950 disabled:opacity-50 disabled:pointer-events-none text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
