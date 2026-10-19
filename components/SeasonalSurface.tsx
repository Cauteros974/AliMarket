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
    colorRole
}: Props) {
    const {season} = useSeasonalThemeContext();

    return(
        <Animated.View>
            {children}
        </Animated.View>
    )
}