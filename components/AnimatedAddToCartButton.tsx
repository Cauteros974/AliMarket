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

        setTimeout(() => {
            setAdding(false);
            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 1200);
        }, 350)
      }

      const buttonText = adding
        ? "Adding"
        : added
            ? "Added"
            : "Add to cart";
            
      const iconName = added
        ? "checkmark-circle-outline"
        : "bag-add-outline";

      return(
        <Animated.View
            style={[
                styles.wrapper,
                {
                    transform: [{scale}],
                },
            ]}
        >
            <Pressable
                onPress={handlePress}
                disabled={adding}
                style={[
                    styles.button,
                    added && styles.buttonAdded,
                ]}
            >
                <Ionicons 
                    name={iconName}
                    size={18}
                    color={colors.white}
                />

                <Text style={styles.text}>
                    {buttonText}
                </Text>
            </Pressable>
        </Animated.View>
      )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%"
    },
    
    button: {
        minHeight: 32,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 14,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    buttonAdded: {
        backgroundColor: "#22C55E"
    },

    text: {
        color: colors.white,
        fontSize: 15,
    }
})