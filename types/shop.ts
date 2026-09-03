export type CategoryId =
  | "electronics"
  | "fashion"
  | "home"
  | "beauty"
  | "sports"
  | "toys";

export type Category = {
  id: CategoryId;
  title: string;
  icon: string;
  subcategories: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  photos: string[];
};

export type ProductQuestion = {
  id: string;
  question: string;
  answer: string;
  author: string;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  followers: number;
  sales: number;
  location: string;
  description: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  sellerId: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  discountLabel?: string;
  delivery: string;
  freeDelivery: boolean;
  colors: string[];
  reviewList: Review[];
  questions: ProductQuestion[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type SortOption = "popular" | "priceAsc" | "priceDesc" | "rating";

export type CatalogFilters = {
  minPrice: string;
  maxPrice: string;
  minRating: number;
  freeDeliveryOnly: boolean;
  discountsOnly: boolean;
};

export type User = {
  name: string;
  email: string;
};

export type Address = {
  id: string;
  title: string;
  city: string;
  street: string;
  postalCode: string;
  phone: string;
};

export type OrderStatus =
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Local warehouse"
  | "Delivered";

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  address: Address;
};

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export type AppTheme = "light" | "dark";

export type Locale = "en" | "uk" | "de" | "fr";

export type WishlistCollection = {
  id: string;
  title: string;
  productIds: string[];
};

export type ToastMessage = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};
