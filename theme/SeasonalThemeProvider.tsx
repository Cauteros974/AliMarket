import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Animated,AppState, type AppStateStatus } from "react-native"

import { getCurrentSeason, SEASONAL_THEMES, type Season, type SeasonColors, } from "./seasonalTheme";
import { useSeasonalThemeStore } from "../store/useSeasonalThemeStore";
import { set } from "zod";

type SeasonalThemeContextValue = {
  season: Season;
  colors: SeasonColors;
  transition: Animated.Value;
};

const SeasonalThemeContext =
  createContext<SeasonalThemeContextValue | null>(null);

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
            (state: AppStateStatus) => {
                if (state === "active") {
                    updateSeason();
                }
            }
        );

        updateSeason();

        return () => subscription.remove();
    }, []);

    const season: Season = 
        mode === "auto" ? systemSeason : mode;

    const colors = SEASONAL_THEMES[season];

    useEffect(() => {
        transition.setValue(0);

        Animated.timing(transition, {
            toValue: 1,
            duration: 450,
            useNativeDriver: false,  
        }).start();
    }, [season, transition])

    const value = useMemo(
        () => ({
            season,
            colors,
            transition,
        }),
        [season, colors, transition]
    )

    return(
        <SeasonalThemeContext.Provider>

        </SeasonalThemeContext.Provider>
    )
}