/**
 * NEXORA Database & Supabase Data Layer
 * Handles authentication, data persistence, and database operations.
 * Works seamlessly with Supabase credentials or with local persistent storage fallback.
 */

import { UserProfile, Order, Address, NotificationItem, Product } from '../types';
import { PRODUCTS, DEMO_COUPONS, DEMO_REVIEWS } from '../data/products';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('your-project-id')
);

// Demo seed accounts
export const DEMO_ADMIN_USER: UserProfile = {
  id: 'usr-admin-001',
  fullName: 'Sarah Vance',
  email: 'admin@nexora.io',
  phone: '+91 98765 43210',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'admin',
  createdAt: '2025-01-01T00:00:00Z',
};

export const DEMO_CUSTOMER_USER: UserProfile = {
  id: 'usr-cust-002',
  fullName: 'Alex Mercer',
  email: 'alex.mercer@nexora.io',
  phone: '+91 98201 12345',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  role: 'customer',
  createdAt: '2025-06-15T00:00:00Z',
};

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    userId: 'usr-cust-002',
    fullName: 'Alex Mercer',
    phone: '+91 98201 12345',
    streetAddress: 'Flat 402, Signature Skyline Towers, 100ft Road',
    apartmentSuite: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India',
    isDefault: true,
  },
  {
    id: 'addr-2',
    userId: 'usr-cust-002',
    fullName: 'Alex Mercer (Work)',
    phone: '+91 98201 12345',
    streetAddress: 'Tower B, 7th Floor, Embassy TechVillage, Outer Ring Road',
    apartmentSuite: 'Devarabeesanahalli',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103',
    country: 'India',
    isDefault: false,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10492',
    orderNumber: 'NX-2026-89412',
    userId: 'usr-cust-002',
    items: [
      {
        id: 'item-1',
        productId: 'prod-aud-1',
        productName: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
        productImage: '/src/assets/images/category_audio_headphones_1791472494366.jpg',
        unitPrice: 29990,
        quantity: 1,
        totalPrice: 29990,
      },
      {
        id: 'item-2',
        productId: 'prod-acc-2',
        productName: 'Logitech MX Master 3S Performance Wireless Mouse (Graphite)',
        productImage: '/src/assets/images/hero_flagship_showcase_1791472454257.jpg',
        unitPrice: 8995,
        quantity: 1,
        totalPrice: 8995,
      }
    ],
    subtotal: 38985,
    discount: 3898,
    tax: 6315,
    shippingFee: 0,
    grandTotal: 41402,
    couponCode: 'WELCOME10',
    status: 'shipped',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'upi',
    paymentStatus: 'completed',
    transactionId: 'UPI-984021849182',
    estimatedDeliveryDate: '2026-10-12T18:00:00Z',
    trackingNumber: 'NX-DEL-EXP-774921',
    createdAt: '2026-10-06T11:42:00Z',
  },
  {
    id: 'ord-10440',
    orderNumber: 'NX-2026-77319',
    userId: 'usr-cust-002',
    items: [
      {
        id: 'item-3',
        productId: 'prod-acc-1',
        productName: 'Anker Prime 27,650mAh Power Bank (250W Multi-Port)',
        productImage: '/src/assets/images/hero_flagship_showcase_1791472454257.jpg',
        unitPrice: 14999,
        quantity: 1,
        totalPrice: 14999,
      }
    ],
    subtotal: 14999,
    discount: 500,
    tax: 2609,
    shippingFee: 0,
    grandTotal: 17108,
    couponCode: 'SAVE500',
    status: 'delivered',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    transactionId: 'TXN-CC-4819204812',
    estimatedDeliveryDate: '2026-09-28T14:30:00Z',
    trackingNumber: 'NX-DEL-EXP-662910',
    createdAt: '2026-09-25T09:15:00Z',
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order Dispatched',
    message: 'Your order NX-2026-89412 has been shipped via Express Logistics. Track your package live.',
    type: 'order',
    link: '/orders',
    isRead: false,
    createdAt: '2026-10-07T08:30:00Z',
  },
  {
    id: 'notif-2',
    title: 'Exclusive Weekend Perk',
    message: 'Use code NEXORA20 at checkout for an extra 20% savings on flagship laptops and audio gear.',
    type: 'deal',
    link: '/deals',
    isRead: false,
    createdAt: '2026-10-06T12:00:00Z',
  },
  {
    id: 'notif-3',
    title: 'Price Drop Alert',
    message: 'Apple MacBook Air 15" M3 is now available at a special limited-time price of ₹1,54,900.',
    type: 'deal',
    link: '/product/apple-macbook-air-15-m3',
    isRead: true,
    createdAt: '2026-10-05T15:20:00Z',
  }
];

// Helper to get or initialize persistent LocalStorage
export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(`nexora_${key}`);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
  }
  return defaultValue;
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`nexora_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}
