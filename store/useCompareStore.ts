import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

type CompareState = {
    compareIds: string[];

    toggleCompare: (productId: string) => void;
    removeFromCompare: (productId: string) => void;
}

export type useCompareStore = create<CompareState>() (

)