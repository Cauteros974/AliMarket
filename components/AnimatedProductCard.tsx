import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;

    index?: number;

    staggerDelay?: number;
}

export default function AnimatedProductCard( {children, index = 0, staggerDelay = 70}:Props) {
    return(
        <Animated.View>
            {children}
        </Animated.View>
    )
}