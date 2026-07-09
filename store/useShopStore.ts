import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem } from "../types/product";

type ShopState = {
    cart: CartItem[];
    favoriteIds: string[];
    searchQuery: string;
    addToCart: (productId: string) => void;
}

export const useShopStore = create<ShopState>()(
    persist(
        (set) => ({
            cart: [],
            favoriteIds: [],
            searchQuery: "",
            addToCart: (productId) =>
                set((state) => {
                    const existing = state.cart.find((item) => item.productId === productId);
                })
        })
    )
)