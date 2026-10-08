import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  Clock,
  ChevronRight,
  Plus,
  Trash2,
  Check,
  Truck,
  ExternalLink,
  Shield,
  CreditCard,
  Eye,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, Product, Address } from '../types';

interface AccountPageProps {
  initialTab?: string;
  onSelectProduct: (product: Product) => void;
  onTrackOrder: (order: Order) => void;
  onExploreCatalog: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  initialTab = 'overview',
  onSelectProduct,
  onTrackOrder,
  onExploreCatalog,
}) => {
  const {
    currentUser,
    orders,
    wishlist,
    addresses,
    recentlyViewed,
    deleteAddress,
    addAddress,
    updateProfile,
    moveToCart,
    openAuthModal,
    addToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile Form state
  const [name, setName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  // Add Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  if (!currentUser) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors">
        <div className="max-w-md mx-auto text-center px-4 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-500">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
              Access Your NEXORA Account
            </h2>
            <p className="text-xs text-slate-500">
              Sign in to manage your hardware orders, view warranty documents, and save delivery preferences.
            </p>
          </div>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 transition-colors"
          >
            Sign In or Create Account
          </button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: name, email, phone });
    addToast('Profile saved successfully');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim() || !newPincode.trim()) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    addAddress({
      fullName: currentUser.fullName,
      phone: currentUser.phone || '+91 98201 12345',
      streetAddress: newStreet,
      city: newCity,
      state: newState || 'Karnataka',
      postalCode: newPincode,
      country: 'India',
      isDefault: addresses.length === 0,
    });
    setNewStreet('');
    setNewCity('');
    setNewPincode('');
    setIsAddingAddress(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top User Greeting Banner */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'}
              alt={currentUser.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/30"
            />
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400">
                Verified Customer Tier
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                {currentUser.fullName}
              </h1>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {orders.length} Completed Orders
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300">
              {wishlist.length} Wishlist Items
            </span>
          </div>
        </div>

        {/* Dashboard Layout: Sidebar Tabs + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-3 shadow-sm space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'orders', label: 'Order History', icon: Package },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'recent', label: 'Recently Viewed', icon: Eye },
              { id: 'profile', label: 'Profile Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </aside>

          {/* Content Pane */}
          <main className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm">
            
            {/* TAB: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                    Account Overview
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage your orders, warranties, and hardware preferences.
                  </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Orders</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums mt-1 block">
                      {orders.length}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Wishlist Items</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums mt-1 block">
                      {wishlist.length}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Saved Addresses</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums mt-1 block">
                      {addresses.length}
                    </span>
                  </div>
                </div>

                {/* Latest Order Snapshot */}
                {orders.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Recent Shipment
                    </span>
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Order #{orders[0].orderNumber}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 capitalize">
                            {orders[0].status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {orders[0].items.length} electronic device(s) · Placed {new Date(orders[0].createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => onTrackOrder(orders[0])}
                        className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:bg-cyan-600 transition-colors whitespace-nowrap"
                      >
                        Track Status
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Order History */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                    Order History ({orders.length})
                  </h2>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700/60">
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              Order #{order.orderNumber}
                            </span>
                            <span className="text-xs text-slate-400 ml-2">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold tabular-nums text-slate-900 dark:text-white">
                              ₹{order.grandTotal.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                              {order.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>

                        {/* Items in order */}
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 p-1 shrink-0 overflow-hidden">
                                  <img src={item.productImage} alt="" className="w-full h-full object-contain" />
                                </div>
                                <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                                  {item.productName} (x{item.quantity})
                                </span>
                              </div>
                              <span className="tabular-nums font-bold text-slate-900 dark:text-white">
                                ₹{item.totalPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">
                            Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </span>
                          <button
                            onClick={() => onTrackOrder(order)}
                            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                          >
                            Live Tracking Timeline →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 text-xs">
                    No orders placed yet.
                  </div>
                )}
              </div>
            )}

            {/* TAB: Saved Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                    Saved Devices ({wishlist.length})
                  </h2>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col justify-between space-y-3"
                      >
                        <div
                          className="w-full h-32 rounded-xl bg-white dark:bg-slate-900 p-2 flex items-center justify-center cursor-pointer"
                          onClick={() => onSelectProduct(product)}
                        >
                          <img src={product.images[0]} alt="" className="max-h-full object-contain" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">
                            {product.brand}
                          </span>
                          <h4
                            onClick={() => onSelectProduct(product)}
                            className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-cyan-500 cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <span className="text-sm font-black tabular-nums text-slate-900 dark:text-white mt-1 block">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <button
                          onClick={() => moveToCart(product.id)}
                          className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 transition-colors"
                        >
                          Move to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-3">
                    <Heart className="w-10 h-10 text-slate-400 mx-auto opacity-40" />
                    <p className="text-xs text-slate-500">Your wishlist is currently empty.</p>
                    <button
                      onClick={onExploreCatalog}
                      className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
                    >
                      Browse Catalog
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                    Address Book
                  </h2>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form onSubmit={handleCreateAddress} className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-slate-900 dark:text-white">New Delivery Location</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-slate-400 block mb-1">Street Address</label>
                        <input
                          type="text"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          className="w-full p-2 bg-white dark:bg-slate-900 border rounded-xl"
                          placeholder="Flat, Building, Street"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">City</label>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full p-2 bg-white dark:bg-slate-900 border rounded-xl"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">PIN Code</label>
                        <input
                          type="text"
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          className="w-full p-2 bg-white dark:bg-slate-900 border rounded-xl"
                          placeholder="6-digit PIN"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-xl">Save</button>
                      <button type="button" onClick={() => setIsAddingAddress(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {addr.fullName}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-cyan-500 font-bold uppercase">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                          {addr.streetAddress}, {addr.city}, {addr.state} - {addr.postalCode}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Recently Viewed */}
            {activeTab === 'recent' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                  Recently Visited Electronics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentlyViewed.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 cursor-pointer hover:border-cyan-500 transition-colors"
                    >
                      <div className="w-full h-28 bg-white dark:bg-slate-900 rounded-xl p-2 flex items-center justify-center">
                        <img src={product.images[0]} alt="" className="max-h-full object-contain" />
                      </div>
                      <div className="mt-2">
                        <span className="text-[10px] text-cyan-500 font-bold">{product.brand}</span>
                        <h4 className="text-xs font-bold line-clamp-1">{product.name}</h4>
                        <span className="text-xs font-black tabular-nums mt-1 block">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                  Profile Settings
                </h2>
                <form onSubmit={handleSaveProfile} className="max-w-md space-y-4 text-xs">
                  <div>
                    <label className="text-slate-500 block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-cyan-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};
