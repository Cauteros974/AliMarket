import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
    navigation: any;
}

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "card" | "cash";

export default function CheckoutScreen({navigation}: Props) {
    const cart = useShopStore((state) => state.cart);
    const addresses = useShopStore((state) => state.addresses);
    const selectedAddressId = useShopStore((state) => state.selectedAddressId);
    const appliedCoupon = useShopStore((state) => state.appliedCoupon);
    const placeOrder = useShopStore((state) => state.placeOrder);

    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

    const address = addresses.find((item) => item.id === selectedAddressId);

    const orderItems = useMemo(() => {
        return cart
            .map((item) => {
                const product = products.find(
                    (entry) => entry.id === item.productId
                );

                if (!product) return null;

                return {
                    product,
                    quantity: item.quantity,
                    lineTotal: product.price * item.quantity,
                };
            })
            .filter((item) => item !== null);
    }, [cart]);

    const subtotal = cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return sum + (product?.price ?? 0) + item.quantity;
    }, 0);

    const orderItem = useMemo(() => {
        return cart
        .map((item) => {
            const product = products.find(
                (entry) => entry.id === item.productId
            );
            
            if (!product) return null;
            
            return {
                product,
                quantity: item.quantity,
                lineTotal: product.price * item.quantity,
            };
        })
        .filter((item) => item !== null);
    },[cart]);

    const shipping = appliedCoupon === "FRESHIP" || subtotal === 0 ? 0 : 4.99;

    const discount = 
        appliedCoupon === "WELCOME10"
            ? subtotal * 0.1
            : appliedCoupon === "SALE15"
                ? subtotal * 0.15
                : 0;
                
    const total = Math.max(subtotal + shipping - discount, 0);

    function handlePlaceOrder() {
        if (cart.length === 0 || orderItems.length === 0) {
            Alert.alert(
                "Empty cart",
                "Add products to your cart before placing an order."
            );
            return;
        }

        if(!address) {
            Alert.alert(
                "Delivery address required",
                "Please select a delivery address first.",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Select address",
                        onPress: () => navigation.navigate("Addresses"),
                    },
                ]
            )
        }
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Checkout</Text>

                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>Delivery address</Text>

                        <Pressable onPress={() => navigation.navigate("Addresses")}>
                            <Text style={styles.link}>Change</Text>
                        </Pressable>
                    </View>

                    {address ? (
                        <Text style={styles.muted}>
                            {address.title} · {address.city}, {address.street} · {address.phone}{address.title }
                        </Text>
                    ) : (
                        <Text style={styles.muted}>No address selected.</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Order summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.muted}>Items</Text>
                        <Text style={styles.value}>{formatPrice(subtotal)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.muted}>Shipping</Text>
                        <Text style={styles.value}>{formatPrice(shipping)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.muted}>Discount</Text>
                        <Text style={styles.value}>-{formatPrice(discount)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable onPress={handlePlaceOrder} style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Place order</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: colors.background 
    },
    content: { 
        paddingHorizontal: 18, 
        paddingTop: 8, 
        paddingBottom: 110 
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginBottom: 16
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 12,
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    cardTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
        marginBottom: 0,
    },
    muted: {
        color: colors.muted,
        lineHeight: 21,
        fontWeight: "900"
    },
    link: {
        color: colors.primary,
        fontWeight: "900"
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    value: {
        color: colors.text,
        fontWeight: "900"
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 12
    },
    totalLabel: { 
        color: colors.text, 
        fontSize: 18, 
        fontWeight: "900" 
    },
    totalValue: { 
        color: colors.primary, 
        fontSize: 20, 
        fontWeight: "900" 
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    primaryButton: {
        height: 54,
        borderRadius: 18,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "900",
    }
})