import React from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  ArrowLeft,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingPageProps {
  order: Order;
  onBackToOrders: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  order,
  onBackToOrders,
}) => {
  const statusSteps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'placed', label: 'Order Placed', desc: 'Received and verified in system' },
    { status: 'confirmed', label: 'Order Confirmed', desc: 'Hardware serial assigned' },
    { status: 'packed', label: 'Packed & Sealed', desc: 'Inspected with tamper-proof seal' },
    { status: 'shipped', label: 'In Transit', desc: 'Dispatched via priority air cargo' },
    { status: 'out_for_delivery', label: 'Out for Delivery', desc: 'Courier courier assigned' },
    { status: 'delivered', label: 'Delivered', desc: 'Signed and handed over' },
  ];

  const statusOrder: OrderStatus[] = [
    'placed',
    'confirmed',
    'packed',
    'shipped',
    'out_for_delivery',
    'delivered',
  ];

  const currentIndex = statusOrder.indexOf(order.status);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={onBackToOrders}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Order History</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <Printer className="w-4 h-4" />
            <span>Print Tax Invoice</span>
          </button>
        </div>

        {/* Order Details Header Box */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Official Tracking Record
              </span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                Order #{order.orderNumber}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()} · Tracking No: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{order.trackingNumber}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Estimated Arrival</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {new Date(order.estimatedDeliveryDate).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Detailed Stepper */}
          <div className="py-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-6">
              Live Fulfillment Status
            </span>
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 relative z-10">
                {statusSteps.map((step, idx) => {
                  const isPassed = idx < currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div key={step.status} className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isPassed
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/20 animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isPassed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <span
                          className={`text-xs font-bold block ${
                            isCurrent
                              ? 'text-cyan-600 dark:text-cyan-400'
                              : isPassed
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400 block sm:mt-0.5">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hardware Items List */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Items Included in this Consignment ({order.items.length})
            </span>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-950 p-1 shrink-0 flex items-center justify-center">
                      <img src={item.productImage} alt="" className="max-h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {item.productName}
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        Qty: {item.quantity} · Serial Verified
                      </span>
                    </div>
                  </div>
                  <span className="font-black tabular-nums text-slate-900 dark:text-white">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Financial Meta */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                Shipping Destination:
              </span>
              <p>
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.streetAddress}, {order.shippingAddress.city}<br />
                {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="font-bold text-slate-900 dark:text-white block flex items-center sm:justify-end gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-cyan-500" />
                Payment Summary:
              </span>
              <p>
                Method: <span className="uppercase font-semibold">{order.paymentMethod}</span><br />
                Subtotal: ₹{order.subtotal.toLocaleString('en-IN')}<br />
                Total Paid: <span className="font-black text-slate-900 dark:text-white tabular-nums">₹{order.grandTotal.toLocaleString('en-IN')}</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
