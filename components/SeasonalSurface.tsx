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
        SEASONAL_THEMES[season][colorRole]
    );

    const [fromColor, setFromColor] = React.useState(
        previousColor.current
    );

    const toColor = SEASONAL_THEMES[season][colorRole];

    useEffect(() => {
        setFromColor(previousColor.current);
        previousColor.current = toColor;

        color.setValue(0);

        Animated.timing(color, {
            toValue: 1,
            duration: 450,
            useNativeDriver: false,
        }).start()
    }, [season, toColor, color]);

    const backgroundColor = color.interpolate({
        inputRange: [0, 1],
        outputRange: [fromColor, toColor],
    });

    return(
        <Animated.View
            {...props}
            style={[
                styles.container,
                style, {backgroundColor}
            ]}
        >
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
    }
})