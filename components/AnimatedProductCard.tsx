import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;

    index?: number;

    staggerDelay?: number;
}

export default function AnimatedProductCard( {children, index = 0, staggerDelay = 70}:Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(25)).current;
    const scale = useRef(new Animated.Value(0.94)).current;

    useEffect: (() => {
        const delay = Math.min(index * staggerDelay, 500)

        Animated.parallel({
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                delay,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                delay,
                friction: 8,
                tension: 55,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                delay,
                friction: 8,
                tension: 60,
                useNativeDriver: true,
            }),
        }).start();
    }, [opacity, translateY])

    return(
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [
                        {
                            translateY,
                        },
                        {
                            scale,
                        },
                    ],
                },
            ]}
        >
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})