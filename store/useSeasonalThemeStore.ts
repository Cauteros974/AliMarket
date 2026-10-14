import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

import { getCurrentSeason, SEASONAL_THEMES, type Season, type SeasonMode } from "../theme/seasonalTheme";

type SeasonalThemeState = {
    mode: SeasonMode;

    setMode: string;
}

export const useSeasonalThemeStore = create<SeasonalThemeState>() {
    persist(
        (set) => ({
            mode: "auto",

            setMode: (mode) => set({mode}),
        })
    )
}