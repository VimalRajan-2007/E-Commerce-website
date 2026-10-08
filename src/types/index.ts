export type UserRole = 'customer' | 'admin' | 'manager';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface ProductSpec {
  groupName: string;
  key: string;
  value: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number; // in INR (₹)
  originalPrice: number;
  discountPercent: number;
  stock: number;
  stockStatus: StockStatus;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isDeal?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  shortDescription: string;
  description: string;
  images: string[];
  colors?: ProductColor[];
  specs: ProductSpec[];
  whatsInTheBox: string[];
  warrantyInfo: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  selectedColor?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type PaymentMethodType = 'upi' | 'credit_card' | 'debit_card' | 'net_banking' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  grandTotal: number;
  couponCode?: string;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'completed' | 'pending' | 'failed';
  transactionId?: string;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  timesUsed: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'deal' | 'stock' | 'system';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'newest'
  | 'bestseller';

export interface FilterState {
  category?: string;
  brand?: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}
