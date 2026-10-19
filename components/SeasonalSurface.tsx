import React, {useEffect, useRef} from "react";
import {
  Animated,
  StyleSheet,
  type ViewProps,
} from "react-native";

import { SEASONAL_THEMES } from "../theme/seasonalTheme";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

type Props = ViewProps & {
    children?: React.ReactNode;
    colorRole?: "background" | "surface" | "surfaceElevated";
}

export default function SeasonalSurface({
    children,
    colorRole = "surface",
    style,
    ...props
}: Props) {
    const {season} = useSeasonalThemeContext();

    const color = useRef(
        new Animated.Value(1)
    ).current;

    const previousColor = useRef(
        SEASONAL_THEMES[season]
    );

    return(
        <Animated.View>
            {children}
        </Animated.View>
    )
}