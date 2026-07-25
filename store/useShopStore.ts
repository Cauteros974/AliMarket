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
} from "../types/shop";
import { createId } from "../utils/format";

const defaultAddress: Address = {
  id: "addr-main",
  title: "home",
  city: "Kyiv",
  street: "Baridy Street 10",
  postalCode: "01001",
  phone: "+380 00 000 00 00",
}

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
  }
];

type ShopState = {
  cart: CartItem[];
  favoriteIds: string[];
  searchQuery: string;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (categoryId: string | null) => void;
  setSortOption: (option: SortOption) => void;
};

const initialFilters: CatalogFilters = {
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  freeDeliveryOnly: false,
  discountsOnly: false,
}

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
      selectedAddresses: defaultAddress.id,
      order: [],
      notifications: defaultNotifications,

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

      setSelectedCategoryId: (categoryId) => set({selectedCategoryId: categoryId}),

      setSortOption: (option) => set({sortOption: option})
    }),
    {
      name: "alimarket-shop-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cart: state.cart,
        favoriteIds: state.favoriteIds,
      }),
    }
  )
);