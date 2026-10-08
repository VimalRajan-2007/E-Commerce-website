import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  UserProfile,
  Order,
  Address,
  NotificationItem,
  Coupon,
  OrderStatus,
} from '../types';
import { PRODUCTS, DEMO_COUPONS } from '../data/products';
import {
  DEMO_CUSTOMER_USER,
  DEMO_ADMIN_USER,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  getStoredData,
  setStoredData,
} from '../lib/supabase';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartGrandTotal: number;

  // Coupons
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;

  // Compare
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Auth & Profile
  currentUser: UserProfile | null;
  login: (email: string, password?: string, asAdmin?: boolean) => boolean;
  signup: (fullName: string, email: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id' | 'userId'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Theme & UI Modals
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization
  const [products, setProducts] = useState<Product[]>(() =>
    getStoredData('products', PRODUCTS)
  );

  const [cart, setCart] = useState<CartItem[]>(() =>
    getStoredData('cart', [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[6], quantity: 1 }
    ])
  );

  const [wishlist, setWishlist] = useState<Product[]>(() =>
    getStoredData('wishlist', [PRODUCTS[1], PRODUCTS[12]])
  );

  const [compareList, setCompareList] = useState<Product[]>(() =>
    getStoredData('compare', [])
  );

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() =>
    getStoredData('recent', [PRODUCTS[0], PRODUCTS[1], PRODUCTS[6]])
  );

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() =>
    getStoredData('current_user', DEMO_CUSTOMER_USER)
  );

  const [addresses, setAddresses] = useState<Address[]>(() =>
    getStoredData('addresses', INITIAL_ADDRESSES)
  );

  const [orders, setOrders] = useState<Order[]>(() =>
    getStoredData('orders', INITIAL_ORDERS)
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getStoredData('notifications', INITIAL_NOTIFICATIONS)
  );

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() =>
    getStoredData('coupon', null)
  );

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nexora_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default to sleek futuristic dark mode
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => { setStoredData('products', products); }, [products]);
  useEffect(() => { setStoredData('cart', cart); }, [cart]);
  useEffect(() => { setStoredData('wishlist', wishlist); }, [wishlist]);
  useEffect(() => { setStoredData('compare', compareList); }, [compareList]);
  useEffect(() => { setStoredData('recent', recentlyViewed); }, [recentlyViewed]);
  useEffect(() => { setStoredData('current_user', currentUser); }, [currentUser]);
  useEffect(() => { setStoredData('addresses', addresses); }, [addresses]);
  useEffect(() => { setStoredData('orders', orders); }, [orders]);
  useEffect(() => { setStoredData('notifications', notifications); }, [notifications]);
  useEffect(() => { setStoredData('coupon', appliedCoupon); }, [appliedCoupon]);

  // Sync Theme Class to Document
  useEffect(() => {
    localStorage.setItem('nexora_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toast System
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Theme Toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart Functions
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    if (product.stockStatus === 'out_of_stock' || product.stock <= 0) {
      addToast(`${product.name} is currently out of stock`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          (selectedColor ? item.selectedColor === selectedColor : !item.selectedColor)
      );
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > product.stock) {
          addToast(`Maximum stock limit reached (${product.stock} units)`, 'error');
          return prev;
        }
        addToast(`Updated quantity in cart (${nextQty})`);
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: nextQty }
            : item
        );
      } else {
        const colorLabel = selectedColor ? ` (${selectedColor})` : '';
        addToast(`Added "${product.name.slice(0, 28)}..."${colorLabel} to cart`);
        return [...prev, { product, quantity, selectedColor }];
      }
    });
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter((item) =>
        selectedColor
          ? !(item.product.id === productId && item.selectedColor === selectedColor)
          : item.product.id !== productId
      )
    );
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        const isMatch = selectedColor
          ? item.product.id === productId && item.selectedColor === selectedColor
          : item.product.id === productId;
        if (isMatch) {
          if (quantity > item.product.stock) {
            addToast(`Only ${item.product.stock} units available in stock`, 'error');
            return { ...item, quantity: item.product.stock };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const calculateDiscount = () => {
    if (!appliedCoupon || cartSubtotal < appliedCoupon.minOrderAmount) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.discountValue) / 100;
      return appliedCoupon.maxDiscountAmount
        ? Math.min(calculated, appliedCoupon.maxDiscountAmount)
        : calculated;
    }
    return appliedCoupon.discountValue;
  };

  const cartDiscount = calculateDiscount();
  // Standard 18% GST included in base price or standard e-commerce breakdown
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.18);
  const cartShipping = cartSubtotal > 4999 || cartSubtotal === 0 ? 0 : 499;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax + cartShipping);

  // Coupon Engine
  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const matched = DEMO_COUPONS.find((c) => c.code === formatted);

    if (!matched) {
      addToast(`Invalid coupon code "${formatted}"`, 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (cartSubtotal < matched.minOrderAmount) {
      const msg = `Minimum order amount of ₹${matched.minOrderAmount.toLocaleString('en-IN')} required for this coupon.`;
      addToast(msg, 'error');
      return { success: false, message: msg };
    }

    setAppliedCoupon(matched);
    addToast(`Coupon "${matched.code}" applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Wishlist Functions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast(`Removed from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast(`Added to wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveToCart = (productId: string) => {
    const found = wishlist.find((p) => p.id === productId);
    if (found) {
      addToCart(found, 1);
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  // Product Comparison (up to 3 devices)
  const addToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      addToast('Item already in comparison list', 'info');
      setIsCompareOpen(true);
      return;
    }
    if (compareList.length >= 3) {
      addToast('You can compare a maximum of 3 products', 'error');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    addToast(`Added to compare list (${compareList.length + 1}/3)`);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Recently Viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  // Auth Functions
  const login = (email: string, password?: string, asAdmin = false) => {
    if (asAdmin || email.toLowerCase().includes('admin')) {
      setCurrentUser(DEMO_ADMIN_USER);
      addToast(`Welcome back, Administrator ${DEMO_ADMIN_USER.fullName}`);
      setIsAuthModalOpen(false);
      return true;
    }
    // Customer login
    const user: UserProfile = {
      id: DEMO_CUSTOMER_USER.id,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email.toLowerCase(),
      phone: '+91 98201 12345',
      avatarUrl: DEMO_CUSTOMER_USER.avatarUrl,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(user);
    addToast(`Signed in as ${user.email}`);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (fullName: string, email: string, password?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      email: email.toLowerCase(),
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    addToast(`Account created! Welcome to NEXORA, ${fullName}`);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Signed out successfully', 'info');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    addToast('Profile updated successfully');
  };

  // Address Functions
  const addAddress = (address: Omit<Address, 'id' | 'userId'>) => {
    const newAddr: Address = {
      ...address,
      id: `addr-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      isDefault: addresses.length === 0 ? true : address.isDefault,
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    addToast('Address added to your address book');
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updates };
        }
        if (updates.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    addToast('Address updated');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('Address deleted', 'info');
  };

  // Orders Functions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const orderNumber = `NX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Send order confirmation notification
    const orderNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Order Placed Successfully',
      message: `Your order #${orderNumber} for ₹${newOrder.grandTotal.toLocaleString('en-IN')} has been placed.`,
      type: 'order',
      link: '/orders',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [orderNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    addToast(`Order status updated to "${status.replace(/_/g, ' ')}"`);
  };

  // Notification Functions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('All notifications marked as read', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Admin Product Management
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Added new product: ${newProduct.name}`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Product catalog updated');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog', 'info');
  };

  // Auth Modal Controls
  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Quick View Controls
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartGrandTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        recentlyViewed,
        addRecentlyViewed,
        currentUser,
        login,
        signup,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        orders,
        createOrder,
        updateOrderStatus,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
