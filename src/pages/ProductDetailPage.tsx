import React, { useState } from 'react';
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Scale,
  Plus,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { useStore } from '../context/StoreContext';
import { DEMO_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onNavigateCategory: (slug: string) => void;
  onSelectProduct: (product: Product) => void;
  onProceedToCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigateCategory,
  onSelectProduct,
  onProceedToCheckout,
}) => {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    addToCompare,
    products,
    addToast,
    currentUser,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'box' | 'shipping'>('specs');
  
  // Reviews state
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const matched = DEMO_REVIEWS.filter((r) => r.productId === product.id);
    return matched.length > 0 ? matched : [
      {
        id: 'rev-auto-1',
        productId: product.id,
        userName: 'Vikram Sethi',
        rating: 5,
        title: 'Exceptional build quality and performance',
        comment: `Purchased the ${product.name} last week. The performance is blisteringly fast and matches the benchmark numbers advertised. Seamless ordering process on NEXORA.`,
        verifiedPurchase: true,
        createdAt: '2026-02-18T10:15:00Z',
      },
      {
        id: 'rev-auto-2',
        productId: product.id,
        userName: 'Pooja Iyer',
        rating: 5,
        title: 'Solid packaging and prompt delivery',
        comment: 'Delivered in Bengaluru within 48 hours in tamper-sealed security packaging. Genuine product with warranty registered with zero issues.',
        verifiedPurchase: true,
        createdAt: '2026-02-22T16:40:00Z',
      }
    ];
  });

  // New review form
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Frequently bought together companion item
  const companionProduct = products.find(
    (p) => p.categorySlug === 'accessories' && p.id !== product.id
  ) || products[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Product link copied to clipboard!');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onProceedToCheckout();
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) {
      addToast('Please enter a review headline and comment', 'error');
      return;
    }
    const createdReview: ProductReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: currentUser?.fullName || 'Verified Customer',
      rating: newRating,
      title: newTitle,
      comment: newComment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };
    setReviews([createdReview, ...reviews]);
    setNewTitle('');
    setNewComment('');
    setIsSubmittingReview(false);
    addToast('Thank you! Your verified product review has been published.');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigateCategory('all')} className="hover:underline">Store</button>
          <span>/</span>
          <button onClick={() => onNavigateCategory(product.categorySlug)} className="capitalize hover:underline">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </div>

        {/* Top Section: Gallery (Left) & Contiguous Purchase Module (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          
          {/* Gallery Module */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image View */}
            <div className="relative aspect-[4/3] rounded-2xl bg-slate-50 dark:bg-slate-950 p-8 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Save {product.discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-950 p-2 border transition-all ${
                      activeImageIndex === idx
                        ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <ShieldCheck className="w-4 h-4 text-cyan-500 mx-auto" />
                <span className="block text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {product.warrantyInfo}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <Truck className="w-4 h-4 text-blue-500 mx-auto" />
                <span className="block text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Free Priority Shipping
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <RotateCcw className="w-4 h-4 text-emerald-500 mx-auto" />
                <span className="block text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  7-Day Replacement
                </span>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module (Right) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {product.brand} · {product.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-tight">
                {product.name}
              </h1>

              {/* Rating & Social Proof */}
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span>·</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {reviews.length} verified owner reviews
                </span>
                <span>·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {product.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                </span>
              </div>

              {/* Price & EMI Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black tabular-nums text-slate-900 dark:text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Inclusive of all taxes. No-cost EMI starts at <span className="font-bold text-slate-800 dark:text-slate-200">₹{Math.round(product.price / 12).toLocaleString('en-IN')}/mo</span> with major credit cards.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specs Snapshot */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl">
                    <span className="text-slate-400 text-[10px] block">{spec.key}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase CTA Strip */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 px-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Buy Now Direct Checkout */}
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-600/20 whitespace-nowrap"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    isFavorited ? 'text-rose-500' : 'text-slate-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Compare */}
                <button
                  onClick={() => addToCompare(product)}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 transition-colors"
                  title="Compare"
                >
                  <Scale className="w-4 h-4" />
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="Share link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Delivery Estimation Text */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>Express courier available · Delivers in 2 business days</span>
              </div>
            </div>

          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {companionProduct && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Frequently Bought Together
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4 flex-wrap">
                {/* Main Product */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 p-2">
                    <img src={product.images[0]} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[180px]">
                      {product.name}
                    </span>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Plus className="w-5 h-5 text-slate-400 shrink-0" />

                {/* Companion Product */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 p-2">
                    <img src={companionProduct.images[0]} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[180px]">
                      {companionProduct.name}
                    </span>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                      ₹{companionProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bundle Action */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Bundle Price:</span>
                  <span className="text-lg font-black tabular-nums text-slate-900 dark:text-white">
                    ₹{(product.price + companionProduct.price).toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    addToCart(companionProduct, 1);
                    addToast('Bundle added to your cart!');
                  }}
                  className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
                >
                  Add Both to Cart
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Detailed Tabs: Specifications, What's in Box, Customer Reviews */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm">
          
          {/* Tabs Bar */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-4 gap-6 overflow-x-auto">
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'box', label: "What's in the Box" },
              { id: 'reviews', label: `Reviews (${reviews.length})` },
              { id: 'shipping', label: 'Shipping & Warranty' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-xs font-bold transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            
            {/* Tech Specs Tab */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Comprehensive Hardware Specifications
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {product.specs.map((spec, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="py-3 px-4 font-semibold text-slate-500 w-1/3">
                            {spec.key}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* What's in the Box Tab */}
            {activeTab === 'box' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Package Contents
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {product.whatsInTheBox.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Customer Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      Verified Customer Feedback
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Average {product.rating} / 5.0 based on authentic verified orders
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmittingReview(!isSubmittingReview)}
                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
                  >
                    {isSubmittingReview ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {/* Add Review Form */}
                {isSubmittingReview && (
                  <form onSubmit={handleAddReview} className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Write Your Verified Review
                    </h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Your Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Review Headline (e.g., Unmatched performance for video editing)"
                      className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />

                    <textarea
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience regarding build quality, battery, thermals, and ergonomics..."
                      className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-cyan-600 text-white font-bold text-xs rounded-xl hover:bg-cyan-500"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {rev.userName}
                          </span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Verified Owner
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {rev.title}
                      </h5>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping & Warranty Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Warranty & Pan-India Logistics
                </h3>
                <p>
                  Every electronic product supplied by NEXORA includes official manufacturer warranty coverage. Authorized service centers nationwide honor this warranty via your tax invoice.
                </p>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Replacement Policy:</span>
                  <span>
                    7-Day replacement guarantee applies if the hardware is arrived defective, physically damaged, or dead on arrival.
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-display">
              Related Hardware
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
