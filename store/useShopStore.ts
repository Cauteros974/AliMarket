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
  },
];

type ShopState = {
  cart: CartItem[];
  favoriteIds: string[];
  searchQuery: string;
  selectedCategoryId: string | null;
  sortOption: SortOption;
  filters: CatalogFilters;
};

const initialFilters: CatalogFilters = {
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  freeDeliveryOnly: false,
  discountsOnly: false,
};

export const useShopStore = create <ShopState>() (
  persist(
    (set,get) => ({
      cart: [],
      favoriteIds: [],
      searchQuery: "",
      selectedCategoryId: null,
      sortOption: "popular",
      filters: initialFilters,
    })
  )
)