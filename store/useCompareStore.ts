import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const MAX_COMPARE_PRODUCTS = 3;

type CompareState = {
    compareIds: string[];

    toggleCompare: (productId: string) => void;
    removeFromCompare: (productId: string) => void;
    clearCompare: () => void;
    isCompared: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>() (
    persist(
        (set, get) => ({
            compareIds: [],

            toggleCompare: (productId) => {
                const currentIds = get().compareIds;

                if(currentIds.includes(productId)) {
                    set({
                        compareIds: currentIds.filter((id) => id !== productId)
                    })
                    return;
                }

                if(currentIds.length >= MAX_COMPARE_PRODUCTS) {
                    return;
                }
                set({
                    compareIds: [...currentIds, productId],
                })
            }
        })
    )
)