import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Animated,AppState, type AppStateStatus } from "react-native"

import { getCurrentSeason, SEASONAL_THEMES, type Season, type SeasonColors, } from "./seasonalTheme";
import { useSeasonalThemeStore } from "../store/useSeasonalThemeStore";

export function SeasonalThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const mode = useSeasonalThemeStore((state) => state.mode);

    const [systemSeason, setSystemSeason] = useState<Season>(
        () => getCurrentSeason()
    );

    const transition = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const updateSeason = () => {
            setSystemSeason(getCurrentSeason());
        }

        const subscription = AppState.addEventListener(
            "change",
            (state: AppStateStatus) => (
                if (state === "active") {
                    updateSeason();
                }
            )
        )
    })
}