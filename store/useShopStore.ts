import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Address,
  AppNotification,
  CartItem,
  CatalogFilters,
  Order,
  SortOption,
  User,
  ToastMessage,
  WishlistCollection
} from "../types/shop";
import { createId } from "../utils/format";
import { AppTheme, Locale } from "../types/shop";

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
  toast: ToastMessage | null;
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  hideToast: () => void;
  clearToast: () => void;
  setUser: (user: User) => void;
  wishlistCollections: WishlistCollection[];
  createWishlistCollection: (title: string) => void;
  addProductToWishlistCollection: (collectionId: string, productId: string) => void;
  removeProductFromWishlistCollection: (collectionId: string, productId: string) => void;
  deleteWishlistCollection: (collectionId: string) => void;
  theme: AppTheme;
  locale: Locale;
  setTheme: (theme: AppTheme) => void;
  setLocale: (locale: Locale) => void;
  recentlyViewedIds: string[];
  addRecentlyViewed: (productId: string) => void;
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
      setUser: (user) => set({ user }),
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
      toast: null,
      showToast: (toast) =>
        set({
          toast: { ...toast, id: createId("toast") },
        }),
      hideToast: () => set({ toast: null }),
      clearToast: () => set({ toast: null }),
      notifications: defaultNotifications,
      wishlistCollections: [],

      theme: "system",
      locale: "en",
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),

      createWishlistCollection: (title) => {
        const trimmed = title.trim();
        if(!trimmed) return;

        set((state) => ({
          wishlistCollections: [
            ...state.wishlistCollections,
            {
              id: createId("collection"),
              title: trimmed,
              productIds: [],
              createdAt: new Date().toISOString(),
            }
          ],
        }));
      },

      addProductToWishlistCollection: (collectionId, productId) => 
        set((state) => ({
          wishlistCollections: state.wishlistCollections.map((collection) =>
            collection.id === collectionId && !collection.productIds.includes(productId)
              ? { ...collection, productIds: [...collection.productIds, productId] }
              : collection
          ),
        })),
        
      removeProductFromWishlistCollection: (collectionId, productId) =>
        set((state) => ({
          wishlistCollections: state.wishlistCollections.map((collection) =>
            collection.id === collectionId
              ? { ...collection, productIds: collection.productIds.filter((id) => id !== productId), }
              : collection
          ),
        })),
        
      deleteWishlistCollection: (collectionId) =>
        set((state) => ({
          wishlistCollections: state.wishlistCollections.filter(
            (collection) => collection.id !== collectionId
          ),
        })),

      addToCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

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
          return false;
        }

        set({ appliedCoupon: code, couponCode: code });
        return true;
      },

      clearCoupon: () => set({ appliedCoupon: null, couponCode: "" }),

      register: (name, email) => 
        set({
          user: {
            id: createId("user"),
            name,
            email,
          },
        }),

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

        recentlyViewedIds: [],

        addRecentlyViewed: (productId) => 
          set((state) => {
            const filtered = state.recentlyViewedIds.filter((id) => id !== productId);
            return{
              recentlyViewedIds: [productId, ...filtered].slice(0, 10),
            }
          })
    }),
    
    {
      name: "alimarket-shop-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cart: state.cart,
        favoriteIds: state.favoriteIds,
        wishlistCollections: state.wishlistCollections,
        user: state.user,
        addresses: state.addresses,
        selectedAddressId: state.selectedAddressId,
        orders: state.orders,
        notifications: state.notifications,
      }),
    }
  )
);