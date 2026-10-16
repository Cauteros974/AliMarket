import React, { createContext } from "react"
import { Animated,AppState, type AppStateStatus } from "react-native"

import { getCurrentSeason, SEASONAL_THEMES, type Season, type SeasonColors, } from "./seasonalTheme";
import { useSeasonalThemeStore } from "../store/useSeasonalThemeStore";

export function SeasonalThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const mode = useSeasonalThemeStore((state) => state.mode);
}