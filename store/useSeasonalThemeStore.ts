import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getCurrentSeason,
  SEASONAL_THEMES,
  type Season,
  type SeasonMode,
} from "../theme/seasonalTheme";

type SeasonalThemeState = {
    mode: SeasonMode;

    setMode: (mode: SeasonMode) => void;

    resetToAuto: () => void;
}

export const useSeasonalThemeStore = create<SeasonalThemeState>() (
    persist(
        (set) => ({
            mode: "auto",

            setMode: (mode) => set({mode}),

            resetToAuto: () => set({mode: "auto"}),
        }),
        {
            name: "alimarket-seasonal-theme",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export function useSeasonalTheme() {
    const mode = useSeasonalThemeStore((state) => state.mode);
    const setMode = useSeasonalThemeStore((state) => state.setMode);
    const resetToAuto = useSeasonalThemeStore((state) => state.resetToAuto);

    const season: Season =
        mode === "auto" ? getCurrentSeason() : mode;
    
    const colors = SEASONAL_THEMES[season];

    return{
        mode,
        season,
        colors,
        setMode,
        resetToAuto,
    }
}