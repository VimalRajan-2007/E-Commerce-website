import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Sun,
  Moon,
  ChevronDown,
  Bell,
  Scale,
  Shield,
  LogOut,
  Package,
  Settings,
  Menu,
  X,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MegaMenu } from './MegaMenu';
import { Product } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string | Product) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const {
    cartCount,
    cartGrandTotal,
    wishlist,
    compareList,
    currentUser,
    logout,
    openAuthModal,
    theme,
    toggleTheme,
    setIsSearchOpen,
    setIsCompareOpen,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useStore();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setIsNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  NEXORA
                </span>
                <span className="text-[10px] tracking-wider uppercase text-cyan-600 dark:text-cyan-400 font-semibold -mt-1 hidden sm:inline">
                  Technology, Upgraded
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with hover transitions) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                currentView === 'home'
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            {/* Shop Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => onNavigate('catalog', 'all')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'catalog'
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Shop</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-cyan-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => onNavigate('catalog', 'laptops')}
              className="px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap"
            >
              Laptops
            </button>

            <button
              onClick={() => onNavigate('catalog', 'smartphones')}
              className="px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap"
            >
              Smartphones
            </button>

            <button
              onClick={() => onNavigate('catalog', 'audio')}
              className="px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap"
            >
              Audio
            </button>

            <button
              onClick={() => onNavigate('catalog', 'gaming')}
              className="px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap"
            >
              Gaming
            </button>

            <button
              onClick={() => onNavigate('deals')}
              className={`px-3 py-2 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                currentView === 'deals'
                  ? 'text-amber-500'
                  : 'text-amber-600 dark:text-amber-400 hover:text-amber-500 hover:bg-amber-500/10'
              }`}
            >
              Deals
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Compare, Wishlist, Cart, Profile, Theme) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search electronics"
              className="p-2 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-2 group"
            >
              <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-cyan-500" />
              <span className="hidden xl:inline text-xs text-slate-400">Search hardware...</span>
              <kbd className="hidden xl:inline text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd>
            </button>

            {/* Compare Products Indicator */}
            <button
              onClick={() => setIsCompareOpen(true)}
              aria-label="Compare products"
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('account', 'wishlist')}
              aria-label="View wishlist"
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => onNavigate('cart')}
              aria-label="View shopping bag"
              className="relative flex items-center gap-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl transition-all shadow-sm group"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400 dark:text-cyan-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tabular-nums">
                {cartCount}
              </span>
              <span className="hidden md:inline text-xs font-semibold tabular-nums border-l border-slate-700 dark:border-slate-300 pl-2">
                ₹{cartGrandTotal.toLocaleString('en-IN')}
              </span>
            </button>

            {/* Notifications Center */}
            <div className="relative" ref={notifMenuRef}>
              <button
                onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
                aria-label="Notifications"
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Notifications ({unreadNotificationsCount} unread)
                    </span>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.link) onNavigate('orders');
                            setIsNotifMenuOpen(false);
                          }}
                          className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                            !n.isRead ? 'bg-cyan-50/40 dark:bg-cyan-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {n.title}
                            </span>
                            {!n.isRead && (
                              <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {n.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No notifications yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Light/Dark Mode Switch */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative" ref={userMenuRef}>
              {currentUser ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                    alt={currentUser.fullName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-cyan-500/40"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {currentUser.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 rounded-xl transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {currentUser.fullName}
                    </p>
                    <p className="text-slate-500 truncate text-[11px]">
                      {currentUser.email}
                    </p>
                    {currentUser.role === 'admin' && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                        Administrator Access
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('account', 'overview');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Customer Account</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('account', 'orders');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>My Orders</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('account', 'wishlist');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Wishlist</span>
                    </button>
                  </div>

                  {currentUser.role === 'admin' && (
                    <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors font-semibold text-left"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    </div>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={(slug) => {
          onNavigate('catalog', slug);
          setIsMegaMenuOpen(false);
        }}
      />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-6 space-y-4 animate-slideDown">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('catalog', 'all'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              All Electronics
            </button>
            <button
              onClick={() => { onNavigate('catalog', 'laptops'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              Laptops
            </button>
            <button
              onClick={() => { onNavigate('catalog', 'smartphones'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              Smartphones
            </button>
            <button
              onClick={() => { onNavigate('catalog', 'audio'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              Audio & Hi-Fi
            </button>
            <button
              onClick={() => { onNavigate('catalog', 'gaming'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              Gaming Gear
            </button>
            <button
              onClick={() => { onNavigate('deals'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold"
            >
              Flash Deals
            </button>
            <button
              onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left bg-slate-50 dark:bg-slate-800"
            >
              About NEXORA
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Free Express Delivery across India</span>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { onNavigate('admin'); setIsMobileMenuOpen(false); }}
                className="text-cyan-500 font-bold"
              >
                Admin Portal →
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
