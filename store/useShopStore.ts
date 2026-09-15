import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Address,
  AppNotification,
  AppTheme,
  CartItem,
  CatalogFilters,
  Locale,
  Order,
  SortOption,
  ToastMessage,
  User,
  WishlistCollection,
} from "../types/shop";
import { createId } from "../utils/format";

const defaultAddress: Address = {
  id: "addr-main",
  title: "Home",
  city: "Kyiv",
  street: "Baridy Street 10", 
  postalCode: "01001",
  phone: "+380 00 000 00 00",
};

const defaultNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Summer sale started",
    message: "Selected electronics and home products are up to 60% off today.",
    date: "2026-07-04",
    read: false,
  },
  {
    id: "n2",
    title: "Coupon available",
    message: "Use WELCOME10 to get 10% off your first demo order.",
    date: "2026-07-03",
    read: false,
  },
];

type ShopState = {
  cart: CartItem[];
  favoriteIds: string[];
  searchQuery: string;
  selectedCategoryId: string | null;
  sortOption: SortOption;
  filters: CatalogFilters;
  couponCode: string;
  appliedCoupon: string | null;
  user: User | null;
  addresses: Address[];
  selectedAddressId: string | null;
  orders: Order[];
  notifications: AppNotification[];
  recentlyViewedIds: string[];
  wishlistCollections: WishlistCollection[];
  theme: AppTheme;
  locale: Locale;
  toast: ToastMessage | null;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (categoryId: string | null) => void;
  setSortOption: (option: SortOption) => void;
  updateFilters: (filters: Partial<CatalogFilters>) => void;
  resetFilters: () => void;
  setCouponCode: (code: string) => void;
  applyCoupon: () => boolean;
  clearCoupon: () => void;
  register: (name: string, email: string) => void;
  login: (email: string) => void;
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  selectAddress: (addressId: string) => void;
  removeAddress: (addressId: string) => void;
  placeOrder: (total: number) => Order | null;
  markNotificationRead: (notificationId: string) => void;
  recordRecentlyViewed: (productId: string) => void;
  createWishlistCollection: (title: string) => void;
  toggleCollectionProduct: (collectionId: string, productId: string) => void;
  setTheme: (theme: AppTheme) => void;
  setLocale: (locale: Locale) => void;
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  hideToast: () => void;
};

const initialFilters: CatalogFilters = {
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  freeDeliveryOnly: false,
  discountsOnly: false,
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      favoriteIds: [],
      searchQuery: "",
      selectedCategoryId: null,
      sortOption: "popular",
      filters: initialFilters,
      couponCode: "",
      appliedCoupon: null,
      user: null,
      addresses: [defaultAddress],
      selectedAddressId: defaultAddress.id,
      orders: [],
      notifications: defaultNotifications,
      recentlyViewedIds: [],
      wishlistCollections: [
        { id: "wl-home", title: "For home", productIds: [] },
        { id: "wl-gifts", title: "Gift ideas", productIds: [] },
        { id: "wl-tech", title: "Tech", productIds: [] },
      ],
      theme: "light",
      locale: "en",
      toast: null,

      addToCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId);

          if (existing) {
            get().showToast("Quantity updated", "success");

            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          get().showToast("Added to cart", "success");
          return { cart: [...state.cart, { productId, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (productId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(productId)
            ? state.favoriteIds.filter((id) => id !== productId)
            : [...state.favoriteIds, productId],
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedCategoryId: (categoryId) => set({ selectedCategoryId: categoryId }),

      setSortOption: (option) => set({ sortOption: option }),

      updateFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),

      resetFilters: () => set({ filters: initialFilters, sortOption: "popular" }),

      setCouponCode: (code) => set({ couponCode: code }),

      applyCoupon: () => {
        const code = get().couponCode.trim().toUpperCase();
        const validCodes = ["WELCOME10", "FREESHIP", "SALE15"];

        if (!validCodes.includes(code)) {
          set({ appliedCoupon: null });
          get().showToast("Invalid coupon", "error");
          return false;
        }

        set({ appliedCoupon: code, couponCode: code });
        get().showToast("Coupon applied", "success");
        return true;
      },

      clearCoupon: () => set({ appliedCoupon: null, couponCode: "" }),

      register: (name, email) =>
        set({ user: { id: createId("user"), name, email } }),

      login: (email) =>
        set({
          user: {
            id: createId("user"),
            name: email.split("@")[0] || "Customer",
            email,
          },
        }),

      logout: () => set({ user: null }),

      addAddress: (address) =>
        set((state) => {
          const newAddress = { ...address, id: createId("addr") };

          return {
            addresses: [...state.addresses, newAddress],
            selectedAddressId: newAddress.id,
          };
        }),

      selectAddress: (addressId) => set({ selectedAddressId: addressId }),

      removeAddress: (addressId) =>
        set((state) => {
          const addresses = state.addresses.filter((address) => address.id !== addressId);

          return {
            addresses,
            selectedAddressId:
              state.selectedAddressId === addressId
                ? addresses[0]?.id ?? null
                : state.selectedAddressId,
          };
        }),

      placeOrder: (total) => {
        const state = get();
        const address = state.addresses.find(
          (item) => item.id === state.selectedAddressId
        );

        if (state.cart.length === 0 || !address) {
          return null;
        }

        const order: Order = {
          id: createId("ORD").toUpperCase(),
          createdAt: new Date().toISOString(),
          status: "Processing",
          items: state.cart,
          total,
          address,
        };

        set((current) => ({
          orders: [order, ...current.orders],
          cart: [],
          appliedCoupon: null,
          couponCode: "",
          notifications: [
            {
              id: createId("n"),
              title: "Order created",
              message: `${order.id} is now processing.`,
              date: new Date().toISOString(),
              read: false,
            },
            ...current.notifications,
          ],
        }));

        get().showToast("Order placed", "success");
        return order;
      },

      markNotificationRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          ),
        })),

      recordRecentlyViewed: (productId) =>
        set((state) => ({
          recentlyViewedIds: [
            productId,
            ...state.recentlyViewedIds.filter((id) => id !== productId),
          ].slice(0, 12),
        })),

      createWishlistCollection: (title) =>
        set((state) => {
          const cleanTitle = title.trim();

          if (!cleanTitle) return state;

          return {
            wishlistCollections: [
              ...state.wishlistCollections,
              { id: createId("wl"), title: cleanTitle, productIds: [] },
            ],
          };
        }),

      toggleCollectionProduct: (collectionId, productId) =>
        set((state) => ({
          wishlistCollections: state.wishlistCollections.map((collection) => {
            if (collection.id !== collectionId) return collection;

            const exists = collection.productIds.includes(productId);

            return {
              ...collection,
              productIds: exists
                ? collection.productIds.filter((id) => id !== productId)
                : [...collection.productIds, productId],
            };
          }),
        })),

      setTheme: (theme) => set({ theme }),

      setLocale: (locale) => set({ locale }),

      showToast: (message, type = "info") =>
        set({ toast: { id: createId("toast"), message, type } }),

      hideToast: () => set({ toast: null }),
    }),
    {
      name: "alimarket-shop-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cart: state.cart,
        favoriteIds: state.favoriteIds,
        user: state.user,
        addresses: state.addresses,
        selectedAddressId: state.selectedAddressId,
        orders: state.orders,
        notifications: state.notifications,
        recentlyViewedIds: state.recentlyViewedIds,
        wishlistCollections: state.wishlistCollections,
        theme: state.theme,
        locale: state.locale,
      }),
    }
  )
);