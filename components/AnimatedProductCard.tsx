import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;

    index?: number;

    staggerDelay?: number;
}

export default function AnimatedProductCard( {children, index = 0, staggerDelay = 70}:Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    return(
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                }
            ]}
        >
            {children}
        </Animated.View>
    )
}