import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Check,
  X,
  Truck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface CartPageProps {
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onContinueShopping,
  onProceedToCheckout,
  onSelectProduct,
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartGrandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 4999;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors">
        <div className="max-w-md mx-auto text-center px-4 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
              Your Hardware Bag is Empty
            </h2>
            <p className="text-xs text-slate-500">
              Explore our collection of laptops, flagship smartphones, gaming gear, and hi-fi audio devices.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 transition-colors"
          >
            Start Exploring Electronics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Progress Indicator */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <Truck className="w-4 h-4 text-cyan-500" />
                  {amountNeededForFreeShipping > 0
                    ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more to unlock FREE Express Shipping`
                    : 'Congratulations! You unlocked FREE Priority Shipping'}
                </span>
                <span className="font-bold tabular-nums text-cyan-600 dark:text-cyan-400">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/80">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors"
                >
                  <div
                    className="flex items-center gap-4 w-full sm:w-auto cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-950 p-2 shrink-0 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {product.brand} · {product.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-cyan-500">
                        {product.name}
                      </h3>
                      <div className="text-xs font-semibold tabular-nums text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <div className="text-sm font-black tabular-nums text-slate-900 dark:text-white">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onContinueShopping}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon Engine */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Have a Promo Code?
              </span>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold">
                    <Tag className="w-4 h-4" />
                    <span>{appliedCoupon.code} Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-rose-500"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. WELCOME10, NEXORA20"
                    className="flex-1 p-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white uppercase placeholder:normal-case focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-500 text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Demo Coupon Suggestions */}
              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <span>Available promotional codes:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['WELCOME10', 'NEXORA20', 'SAVE500'].map((code) => (
                    <button
                      key={code}
                      onClick={() => applyCoupon(code)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-mono font-semibold"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-bold tabular-nums">
                      -₹{cartDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                    ) : (
                      `₹${cartShipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (18% Included)</span>
                  <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                    ₹{cartTax.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Grand Total</span>
                  <span className="text-xl font-black tabular-nums text-slate-900 dark:text-white">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-bit Encrypted Checkout</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
