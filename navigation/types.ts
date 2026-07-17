export type RootStackParamList = {
    MainTabs: undefined;

  CategoryDetails: {
    categoryId: string;
  };

  ProductDetails: {
    productId: string;
  };

  Seller: {
    sellerId: string;
  };

  Checkout: undefined;
  Orders: undefined;
  OrderDetails: {
    orderId: string;
  };
  OrderTracking: {
    orderId: string;
  };
  Addresses: undefined;
  Notifications: undefined;
  WishlistCollections: undefined;
  PaymentMethods: undefined;
  QRScanner: undefined;
  Settings: undefined;
  Support: undefined;
  Auth: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Catalog: undefined;
    Cart: undefined;
    Favorites: undefined;
    Profile: undefined;
}