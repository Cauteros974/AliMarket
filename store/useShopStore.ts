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