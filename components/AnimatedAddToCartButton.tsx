import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useShopStore } from "../store/useShopStore";
import { useState } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

type Props = {
    productId: string;
}

export default function AnimatedAddToCartButton({
    productId,
}: Props) {
    const addToCart = useShopStore((state) => state.addToCart);

      function animateButton() {
        Animated.sequence([
            Animated.spring(scale, {
            toValue: 1,
            tension: 200,
            friction: 6,
            useNativeDriver: true,
        })
        ])
      }
}