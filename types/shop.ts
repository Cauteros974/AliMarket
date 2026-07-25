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
};

export type Product = {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
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