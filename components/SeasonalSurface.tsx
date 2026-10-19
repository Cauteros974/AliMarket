import React, {useEffect, useRef} from "react";
import {
  Animated,
  StyleSheet,
  type ViewProps,
} from "react-native";

import { SEASONAL_THEMES } from "../theme/seasonalTheme";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

export default function SeasonalSurface({
    const {season} = useSeasonalThemeContext();
})