import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem } from "../types/product";

type ShopState = {
    cart: CartItem[];
    favoriteIds: string[];
}