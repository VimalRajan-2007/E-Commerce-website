import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Shield,
  Search,
  DollarSign,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus } from '../types';
import { CATEGORIES, BRANDS } from '../data/products';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    addToast,
    currentUser,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');
  
  // Product search filter
  const [productSearch, setProductSearch] = useState('');
  
  // Add product modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Apple');
  const [newProdCategory, setNewProdCategory] = useState('Laptops');
  const [newProdCategorySlug, setNewProdCategorySlug] = useState('laptops');
  const [newProdPrice, setNewProdPrice] = useState(49999);
  const [newProdStock, setNewProdStock] = useState(20);
  const [newProdDesc, setNewProdDesc] = useState('');

  // Analytics Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.grandTotal, 0);
  const totalOrders = orders.length;
  const totalProductsSold = orders.reduce(
    (acc, o) => acc + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  );
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock' || p.stock < 10).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) {
      addToast('Please enter a product title', 'error');
      return;
    }

    addProduct({
      sku: `NX-ADM-${Date.now().toString().slice(-6)}`,
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: newProdBrand,
      category: newProdCategory,
      categorySlug: newProdCategorySlug,
      price: Number(newProdPrice),
      originalPrice: Math.round(Number(newProdPrice) * 1.15),
      discountPercent: 12,
      stock: Number(newProdStock),
      stockStatus: Number(newProdStock) > 10 ? 'in_stock' : 'low_stock',
      rating: 4.8,
      reviewCount: 1,
      shortDescription: newProdDesc || 'Official certified electronics hardware.',
      description: newProdDesc || 'High quality electronic product.',
      images: ['/src/assets/images/hero_flagship_showcase_1791472454257.jpg'],
      specs: [
        { groupName: 'General', key: 'Manufacturer', value: newProdBrand },
        { groupName: 'General', key: 'Model Year', value: '2026' }
      ],
      whatsInTheBox: ['Main hardware unit', 'Power adapter', 'Quick start guide'],
      warrantyInfo: '1 Year Manufacturer Warranty',
    });

    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  const filteredCatalog = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Shield className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Administrative Control Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display mt-1">
              NEXORA Operations & Analytics
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            {[
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'products', label: 'Inventory', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: Real-time Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Gross Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-black tabular-nums text-slate-900 dark:text-white">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+18.4% vs last cycle</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Orders
                </span>
                <div className="text-2xl sm:text-3xl font-black tabular-nums text-slate-900 dark:text-white">
                  {totalOrders}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>100% fulfillment rate</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Average Order Value (AOV)
                </span>
                <div className="text-2xl sm:text-3xl font-black tabular-nums text-slate-900 dark:text-white">
                  ₹{averageOrderValue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500">
                  Across enterprise & pro purchases
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Low Stock Warnings
                </span>
                <div className="text-2xl sm:text-3xl font-black tabular-nums text-amber-500">
                  {lowStockCount}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Requires PO replenishment</span>
                </div>
              </div>
            </div>

            {/* Visual Analytics Charts (Clean SVG Charts) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Revenue Trend Over Time */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      Monthly Revenue Trajectory (₹ Lakhs)
                    </h3>
                    <p className="text-xs text-slate-500">Trailing 6 months electronics volume</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-500">FY 2026 Active</span>
                </div>

                {/* SVG Bar Chart */}
                <div className="h-56 flex items-end justify-between gap-4 pt-8 px-2 border-b border-slate-100 dark:border-slate-800">
                  {[
                    { month: 'Nov', rev: 28, height: '45%' },
                    { month: 'Dec', rev: 42, height: '65%' },
                    { month: 'Jan', rev: 35, height: '52%' },
                    { month: 'Feb', rev: 58, height: '80%' },
                    { month: 'Mar', rev: 49, height: '70%' },
                    { month: 'Apr', rev: 72, height: '95%' },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <span className="text-[10px] font-bold tabular-nums text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{bar.rev}L
                      </span>
                      <div
                        className="w-full max-w-[48px] bg-cyan-500/20 group-hover:bg-cyan-500 rounded-t-xl transition-all duration-300 relative overflow-hidden"
                        style={{ height: bar.height }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-80" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 mt-1">
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Volume Share */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Sales by Category
                </h3>
                <div className="space-y-4 pt-2">
                  {[
                    { cat: 'Laptops', share: 42, color: 'bg-cyan-500' },
                    { cat: 'Smartphones', share: 28, color: 'bg-blue-500' },
                    { cat: 'Audio', share: 15, color: 'bg-indigo-500' },
                    { cat: 'Gaming', share: 10, color: 'bg-purple-500' },
                    { cat: 'Peripherals', share: 5, color: 'bg-emerald-500' },
                  ].map((item) => (
                    <div key={item.cat} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">{item.cat}</span>
                        <span className="tabular-nums text-slate-900 dark:text-white">{item.share}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Top Selling Products */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Top Performing Hardware Units
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                      <th className="py-3 font-semibold">Hardware Model</th>
                      <th className="py-3 font-semibold">Category</th>
                      <th className="py-3 font-semibold">Unit Price</th>
                      <th className="py-3 font-semibold">Units Dispatched</th>
                      <th className="py-3 font-semibold">Revenue Contribution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {products.slice(0, 5).map((p, idx) => (
                      <tr key={p.id}>
                        <td className="py-3 flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-8 h-8 rounded-lg object-contain bg-slate-50 dark:bg-slate-800 p-1" />
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</span>
                        </td>
                        <td className="py-3 text-slate-500">{p.category}</td>
                        <td className="py-3 font-bold tabular-nums">₹{p.price.toLocaleString('en-IN')}</td>
                        <td className="py-3 tabular-nums">{140 - idx * 22}</td>
                        <td className="py-3 font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                          ₹{((140 - idx * 22) * p.price).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Inventory & Catalog Management */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter by name, brand, SKU..."
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:bg-cyan-600 flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Hardware Device</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-slate-400">
                      <th className="py-3.5 px-4 font-semibold">SKU & Product</th>
                      <th className="py-3.5 px-4 font-semibold">Department</th>
                      <th className="py-3.5 px-4 font-semibold">Price (₹)</th>
                      <th className="py-3.5 px-4 font-semibold">Stock Level</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {filteredCatalog.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 shrink-0">
                              <img src={product.images[0]} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {product.sku} · {product.brand}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {product.category}
                        </td>
                        <td className="py-3 px-4 font-bold tabular-nums text-slate-900 dark:text-white">
                          ₹{product.price.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 tabular-nums">
                          {product.stock} units
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              product.stockStatus === 'in_stock'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                            }`}
                          >
                            {product.stockStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                const newStock = prompt('Enter updated stock count:', String(product.stock));
                                if (newStock !== null) {
                                  const parsed = parseInt(newStock, 10);
                                  if (!isNaN(parsed)) {
                                    updateProduct(product.id, {
                                      stock: parsed,
                                      stockStatus: parsed > 10 ? 'in_stock' : parsed > 0 ? 'low_stock' : 'out_of_stock',
                                    });
                                  }
                                }
                              }}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:text-cyan-500"
                              title="Update Stock"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                                  deleteProduct(product.id);
                                }
                              }}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:text-rose-500"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Active Fulfillment & Shipments ({orders.length})
            </h2>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-slate-400">
                      <th className="py-3.5 px-4 font-semibold">Order ID</th>
                      <th className="py-3.5 px-4 font-semibold">Date</th>
                      <th className="py-3.5 px-4 font-semibold">Customer / Destination</th>
                      <th className="py-3.5 px-4 font-semibold">Amount</th>
                      <th className="py-3.5 px-4 font-semibold">Current Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {ord.shippingAddress.fullName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {ord.shippingAddress.city}, {ord.shippingAddress.state}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold tabular-nums text-slate-900 dark:text-white">
                          ₹{ord.grandTotal.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                            {ord.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="p-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer"
                          >
                            <option value="placed">Placed</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Add New Electronics Device
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Dell XPS 14 Core Ultra 7"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1">Brand</label>
                  <select
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    {BRANDS.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Category</label>
                  <select
                    value={newProdCategorySlug}
                    onChange={(e) => {
                      setNewProdCategorySlug(e.target.value);
                      const c = CATEGORIES.find((cat) => cat.slug === e.target.value);
                      if (c) setNewProdCategory(c.name);
                    }}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Summary of processor, screen, battery specs..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
