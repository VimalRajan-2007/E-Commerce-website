import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, SortOption } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, BRANDS } from '../data/products';

interface CatalogPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory,
  onSelectProduct,
}) => {
  const { products } = useStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [layout, setLayout] = useState<'grid' | 'compact'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Sync category when parent prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setCurrentPage(1);
    }
  }, [initialCategory]);

  // Brand toggle helper
  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSearchQuery('');
    setPriceRange([0, 400000]);
    setMinRating(0);
    setInStockOnly(false);
    setDealsOnly(false);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specs.some((s) => s.value.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Price Range
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Stock
      if (inStockOnly && (p.stockStatus === 'out_of_stock' || p.stock <= 0)) {
        return false;
      }

      // Deals only
      if (dealsOnly && !p.isDeal && p.discountPercent < 10) {
        return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedBrands,
    searchQuery,
    priceRange,
    minRating,
    inStockOnly,
    dealsOnly,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating_desc':
        return list.sort((a, b) => b.rating - a.rating);
      case 'bestseller':
        return list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      case 'newest':
        return list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'relevance':
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Catalog Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Store</span>
            <span>/</span>
            <span className="capitalize font-semibold text-slate-900 dark:text-slate-100">
              {selectedCategory === 'all' ? 'All Electronics' : selectedCategory}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                {selectedCategory === 'all'
                  ? 'All Electronics Catalog'
                  : CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Catalog'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing {sortedProducts.length} certified electronics devices
              </p>
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
              <span>Filter & Refine ({selectedBrands.length + (selectedCategory !== 'all' ? 1 : 0)})</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Controls Strip */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by model, GPU, specs..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By & View Toggles */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="relevance">Featured & Relevant</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="bestseller">Best Selling</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Layout Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-400'
                }`}
                title="Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'compact'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-400'
                }`}
                title="Compact List"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Products Display */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Filter Hardware
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-400">Department</span>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Electronics ({products.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {products.filter((p) => p.categorySlug === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400">Manufacturer</span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                {BRANDS.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => toggleBrand(brand.name)}
                      className="rounded border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase text-slate-400">Max Price</span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  ₹{priceRange[1].toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="400000"
                step="5000"
                value={priceRange[1]}
                onChange={(e) => {
                  setPriceRange([priceRange[0], Number(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹5,000</span>
                <span>₹4,00,000+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 block mb-2">Rating</span>
              {[4.8, 4.5, 4.0].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setMinRating(minRating === r ? 0 : r);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    minRating === r
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>★ {r} & Above</span>
                  {minRating === r && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>

            {/* Toggles */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-cyan-600"
                />
                <span>In Stock Units Only</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={dealsOnly}
                  onChange={(e) => {
                    setDealsOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-cyan-600"
                />
                <span>Exclusive Discounts Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid / Listings */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Filter Chips */}
            {(selectedBrands.length > 0 || minRating > 0 || dealsOnly || inStockOnly || selectedCategory !== 'all') && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <span>{selectedCategory}</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
                {selectedBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggleBrand(b)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <span>{b}</span>
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {minRating > 0 && (
                  <button
                    onClick={() => setMinRating(0)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <span>{minRating}+ Stars</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-500 font-semibold hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Cards Container */}
            {paginatedProducts.length > 0 ? (
              layout === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
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
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={onSelectProduct}
                      layout="compact"
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                <Filter className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No matching electronic hardware found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your price ceiling, removing brand filters, or broadening your search terms.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        currentPage === i + 1
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Filter Products</span>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Quick Department */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400">Department</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
              >
                <option value="all">All Electronics</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
