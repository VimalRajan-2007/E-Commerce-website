import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Package,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Address, PaymentMethodType, Order } from '../types';

interface CheckoutPageProps {
  onOrderSuccess: (order: Order) => void;
  onBackToCart: () => void;
  onContinueShopping: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderSuccess,
  onBackToCart,
  onContinueShopping,
}) => {
  const {
    cart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartGrandTotal,
    appliedCoupon,
    addresses,
    addAddress,
    createOrder,
    currentUser,
    addToast,
  } = useStore();

  // Multi-step progress (1: Address, 2: Delivery, 3: Payment, 4: Confirmed)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Address selection
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || 'new'
  );

  // New address form state
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98201 12345');
  const [streetAddress, setStreetAddress] = useState('Flat 402, Signature Skyline Towers');
  const [apartmentSuite, setApartmentSuite] = useState('Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [postalCode, setPostalCode] = useState('560038');

  // Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'priority'>(
    'standard'
  );

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [upiId, setUpiId] = useState('alex.mercer@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [isProcessing, setIsProcessing] = useState(false);

  // Created order record
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const activeShippingFee =
    deliveryMethod === 'express' ? 499 : deliveryMethod === 'priority' ? 999 : cartShipping;

  const finalGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax + activeShippingFee);

  // Step 1 validation
  const handleProceedToDelivery = () => {
    if (selectedAddressId === 'new') {
      if (!fullName.trim() || !phone.trim() || !streetAddress.trim() || !city.trim() || !postalCode.trim()) {
        addToast('Please fill all required address fields', 'error');
        return;
      }
      addAddress({
        fullName,
        phone,
        streetAddress,
        apartmentSuite,
        city,
        state,
        postalCode,
        country: 'India',
        isDefault: false,
      });
    }
    setCurrentStep(2);
  };

  // Step 3: Mock Payment processing
  const handlePlaceOrder = () => {
    setIsProcessing(true);

    const activeAddress: Address =
      addresses.find((a) => a.id === selectedAddressId) || {
        id: `addr-${Date.now()}`,
        userId: currentUser?.id || 'guest',
        fullName,
        phone,
        streetAddress,
        apartmentSuite,
        city,
        state,
        postalCode,
        country: 'India',
        isDefault: true,
      };

    setTimeout(() => {
      setIsProcessing(false);

      const order = createOrder({
        userId: currentUser?.id || 'guest',
        items: cart.map((item) => ({
          id: `item-${Date.now()}-${item.product.id}`,
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.images[0],
          unitPrice: item.product.price,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
        })),
        subtotal: cartSubtotal,
        discount: cartDiscount,
        tax: cartTax,
        shippingFee: activeShippingFee,
        grandTotal: finalGrandTotal,
        couponCode: appliedCoupon?.code,
        status: 'placed',
        shippingAddress: activeAddress,
        paymentMethod,
        paymentStatus: 'completed',
        transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        trackingNumber: `NX-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      });

      setCreatedOrder(order);
      clearCart();
      setCurrentStep(4);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback gracefully
      }

      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          {[
            { step: 1, title: '1. Shipping Address' },
            { step: 2, title: '2. Delivery Speed' },
            { step: 3, title: '3. Payment' },
            { step: 4, title: '4. Order Placed' },
          ].map(({ step, title }) => (
            <div
              key={step}
              className={`flex items-center gap-2 text-xs font-bold ${
                currentStep >= step
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                  currentStep >= step
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {currentStep > step ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              <span className="hidden sm:inline">{title}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Address Selection */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
              Delivery Address
            </h2>

            {/* Saved Addresses */}
            {addresses.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Saved Address
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-cyan-500 bg-cyan-50/20 dark:bg-cyan-950/20 ring-2 ring-cyan-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {addr.fullName}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {addr.streetAddress}, {addr.apartmentSuite && `${addr.apartmentSuite}, `}
                        {addr.city}, {addr.state} - {addr.postalCode}
                      </p>
                      <span className="text-[11px] text-slate-400 block mt-2">
                        Phone: {addr.phone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Address Form Option */}
            <div className="pt-2">
              <label
                onClick={() => setSelectedAddressId('new')}
                className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 cursor-pointer"
              >
                <input
                  type="radio"
                  name="addrChoice"
                  checked={selectedAddressId === 'new'}
                  onChange={() => setSelectedAddressId('new')}
                  className="accent-cyan-500"
                />
                <span>+ Deliver to a New Address</span>
              </label>

              {selectedAddressId === 'new' && (
                <div className="mt-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98201 12345"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="House/Flat number, Building name, Street"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Area / Landmark</label>
                    <input
                      type="text"
                      value={apartmentSuite}
                      onChange={(e) => setApartmentSuite(e.target.value)}
                      placeholder="e.g. Indiranagar"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Karnataka"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="560038"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={onBackToCart}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Bag</span>
              </button>
              <button
                onClick={handleProceedToDelivery}
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 flex items-center gap-2"
              >
                <span>Continue to Delivery Speed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Delivery Speed */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
              Select Delivery Speed
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 'standard',
                  title: 'Standard Insured Logistics',
                  time: '3–4 Business Days',
                  price: 0,
                  desc: 'Handled via BlueDart / Delhivery Priority Surface',
                },
                {
                  id: 'express',
                  title: 'Express Overnight Air Cargo',
                  time: '1–2 Business Days',
                  price: 499,
                  desc: 'Direct airport hub dispatch with dedicated vehicle handling',
                },
                {
                  id: 'priority',
                  title: 'Same-Day Metro Dispatch',
                  time: 'Today by 9:00 PM',
                  price: 999,
                  desc: 'Available for Bangalore, Mumbai, NCR locations',
                },
              ].map((option) => (
                <div
                  key={option.id}
                  onClick={() => setDeliveryMethod(option.id as any)}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === option.id
                      ? 'border-cyan-500 bg-cyan-50/20 dark:bg-cyan-950/20 ring-2 ring-cyan-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Truck className="w-5 h-5 text-cyan-500 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {option.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {option.time} · {option.desc}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-bold tabular-nums text-slate-900 dark:text-white">
                    {option.price === 0 ? 'FREE' : `₹${option.price}`}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Address</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
              Payment Method
            </h2>

            {/* Clear Mock Payment Notice per requirements */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl text-xs text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold">Portfolio Demonstration Environment:</span>
                <p className="mt-0.5">
                  This checkout simulates real-world e-commerce flow. No real charges or payment credentials will be deducted.
                </p>
              </div>
            </div>

            {/* Payment Options Accordion */}
            <div className="space-y-3">
              {[
                { id: 'upi', name: 'Instant UPI (Google Pay, PhonePe, Paytm)', icon: QrCode },
                { id: 'credit_card', name: 'Credit Card (Visa, Mastercard, RuPay)', icon: CreditCard },
                { id: 'debit_card', name: 'Debit Card / ATM Pin', icon: CreditCard },
                { id: 'net_banking', name: 'Net Banking (HDFC, ICICI, SBI, Axis)', icon: Building },
                { id: 'cod', name: 'Cash on Delivery (OTP Verified)', icon: Banknote },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as PaymentMethodType)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === m.id
                        ? 'border-cyan-500 bg-cyan-50/20 dark:bg-cyan-950/20 ring-2 ring-cyan-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {m.name}
                        </span>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id as PaymentMethodType)}
                        className="accent-cyan-500"
                      />
                    </div>

                    {/* Sub-inputs */}
                    {paymentMethod === 'upi' && m.id === 'upi' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <label className="text-[11px] text-slate-500 block mb-1">Enter UPI ID</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@bank"
                          className="w-full max-w-sm p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>
                    )}

                    {paymentMethod === 'credit_card' && m.id === 'credit_card' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-slate-500 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 block mb-1">Expiry</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 block mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span>Final Payable Amount:</span>
              <span className="text-base tabular-nums">₹{finalGrandTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-600/20 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Order Confirmation & Live Tracking Timeline */}
        {currentStep === 4 && createdOrder && (
          <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-8 animate-fadeIn text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Payment Confirmed · Receipt Dispatched
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                  Order #{createdOrder.orderNumber}
                </h2>
                <p className="text-xs text-slate-500">
                  Confirmation SMS & email sent to {currentUser?.email || 'customer'}.
                </p>
              </div>
            </div>

            {/* Order Timeline Visual Stepper (Placed -> Confirmed -> Packed -> Shipped -> Out for Delivery -> Delivered) */}
            <div className="py-6 border-y border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-6 text-center">
                Fulfillment Timeline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center text-xs">
                {[
                  { label: 'Placed', active: true, done: true },
                  { label: 'Confirmed', active: true, done: false },
                  { label: 'Packed', active: false, done: false },
                  { label: 'Shipped', active: false, done: false },
                  { label: 'Out for Delivery', active: false, done: false },
                  { label: 'Delivered', active: false, done: false },
                ].map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        s.done
                          ? 'bg-emerald-500 text-white'
                          : s.active
                          ? 'bg-cyan-500 text-white animate-pulse'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {s.done ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-semibold ${
                        s.active || s.done
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Shipping Address:</span>
                <p>
                  {createdOrder.shippingAddress.fullName}<br />
                  {createdOrder.shippingAddress.streetAddress}, {createdOrder.shippingAddress.city}<br />
                  {createdOrder.shippingAddress.state} - {createdOrder.shippingAddress.postalCode}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Payment Summary:</span>
                <p>
                  Method: <span className="uppercase font-semibold">{createdOrder.paymentMethod}</span><br />
                  Transaction ID: <span className="font-mono">{createdOrder.transactionId}</span><br />
                  Total Amount Paid: <span className="font-bold text-slate-900 dark:text-white tabular-nums">₹{createdOrder.grandTotal.toLocaleString('en-IN')}</span>
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onContinueShopping}
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
