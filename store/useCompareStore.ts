import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CompareState = {
    compareIds: string[];

    toggleCompare: (productId: string) => void;
    removeFromCompare: (productId: string) => void;
}

export const useCompareStore = create<CompareState>() (
    persist(
        (set, get) => ({
            compareIds: []

            toggleCompare: (productId) => {
                const currentIds = get().compareIds;

                if(currentIds.includes(productId)) {
                    set({
                        compareIds: currentIds.filter((id) => id !== productId)
                    })
                    return;
                }

                if(currentIds.length) {
                    return;

                    set({
                        compareIds: [...currentIds, productId],
                    })
                }
            }
        })
    )
)