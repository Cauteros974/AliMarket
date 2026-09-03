import { CategoryId } from "../types/shop";

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  CategoryDetails: { categoryId: CategoryId };
  Seller: { sellerId: string };
  Checkout: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
  OrderTracking: { orderId: string };
  Auth: undefined;
  Addresses: undefined;
  Notifications: undefined;
  PaymentMethods: undefined;
  Support: undefined;
  WishlistCollections: undefined;
  QRScanner: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Catalog: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};