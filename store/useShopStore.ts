import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem } from "../types/product";
import { products } from "../data/products";

type ShopState = {
    cart: CartItem[];
    favoriteIds: string[];
    searchQuery: string;
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
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
        })
    )
)