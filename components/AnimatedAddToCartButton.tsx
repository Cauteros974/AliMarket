import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useShopStore } from "../store/useShopStore";
import { useState, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

type Props = {
    productId: string;
}

export default function AnimatedAddToCartButton({
    productId,
}: Props) {
    const addToCart = useShopStore((state) => state.addToCart);

    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const scale = useRef(new Animated.Value(1)).current;

      function animateButton() {
            Animated.sequence([
                Animated.spring(scale, {
                toValue: 0.92,
                tension: 180,
                friction: 6,
                useNativeDriver: true,
            }),

            Animated.spring(scale, {
                toValue: 1.06,
                tension: 180,
                friction: 5,
                useNativeDriver: true,
            }),

            Animated.spring(scale, {
                toValue: 1,
                tension: 160,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();
      }

      function handlePress() {
        if(adding) {
            return;
        }

        setAdding(true);

        animateButton();

        addToCart(productId);
      }
}