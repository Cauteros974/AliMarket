import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
    navigation: any;
};

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "card" | "cash";

export default function CheckoutScreen({ navigation }: Props) {
    const cart = useShopStore((state) => state.cart);
    const addresses = useShopStore((state) => state.addresses);
    const selectedAddressId = useShopStore(
        (state) => state.selectedAddressId
    );
    const appliedCoupon = useShopStore(
        (state) => state.appliedCoupon
    );
    const placeOrder = useShopStore((state) => state.placeOrder);

    const [deliveryMethod, setDeliveryMethod] =
        useState<DeliveryMethod>("standard");

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("card");

    const address = addresses.find(
        (item) => item.id === selectedAddressId
    );

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

    const subtotal = orderItems.reduce(
        (sum, item) => sum + item.lineTotal,
        0
    );

    const shipping = useMemo(() => {
        if (subtotal === 0 || appliedCoupon === "FRESHIP") {
            return 0;
        }

        return deliveryMethod === "express" ? 8.99 : 4.99;
    }, [subtotal, appliedCoupon, deliveryMethod]);

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

        if (!address) {
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
            );
            return;
        }

        const order = placeOrder(total);

        if (!order) {
            Alert.alert(
                "Checkout blocked",
                "We couldn't create your order. Please try again."
            );
            return;
        }

        Alert.alert(
            "Order placed!",
            `Your order ${order.id} was created successfully.`,
            [
                {
                    text: "View orders",
                    onPress: () => navigation.navigate("Orders"),
                },
            ]
        );
    }

    function renderOption(
        selected: boolean,
        title: string,
        description: string,
        onPress: () => void
    ) {
        return (
            <Pressable
                onPress={onPress}
                style={[
                    styles.option,
                    selected && styles.selectedOption,
                ]}
            >
                <View style={styles.optionRadio}>
                    {selected && <View style={styles.optionRadioInner} />}
                </View>

                <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{title}</Text>
                    <Text style={styles.optionDescription}>
                        {description}
                    </Text>
                </View>

                {selected && (
                    <Text style={styles.selectedLabel}>Selected</Text>
                )}
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Checkout</Text>
                <Text style={styles.subtitle}>
                    Review your order before placing it.
                </Text>

                {/* Delivery address */}
                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>
                            Delivery address
                        </Text>

                        <Pressable
                            onPress={() => navigation.navigate("Addresses")}
                        >
                            <Text style={styles.link}>
                                {address ? "Change" : "Select"}
                            </Text>
                        </Pressable>
                    </View>

                    {address ? (
                        <View style={styles.addressContent}>
                            <Text style={styles.addressTitle}>
                                {address.title}
                            </Text>

                            <Text style={styles.muted}>
                                {address.city}, {address.street}
                            </Text>

                            <Text style={styles.muted}>
                                {address.phone}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.muted}>
                            No delivery address selected.
                        </Text>
                    )}
                </View>

                {/* Products */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Your products ({orderItems.length})
                    </Text>

                    {orderItems.map((item) => (
                        <View
                            key={item.product.id}
                            style={styles.productRow}
                        >
                            <View style={styles.productInfo}>
                                <Text
                                    style={styles.productTitle}
                                    numberOfLines={2}
                                >
                                    {item.product.title}
                                </Text>

                                <Text style={styles.muted}>
                                    Quantity: {item.quantity}
                                </Text>
                            </View>

                            <Text style={styles.productPrice}>
                                {formatPrice(item.lineTotal)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Delivery method */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Delivery method
                    </Text>

                    {renderOption(
                        deliveryMethod === "standard",
                        "Standard delivery",
                        "3–5 business days · €4.99",
                        () => setDeliveryMethod("standard")
                    )}

                    {renderOption(
                        deliveryMethod === "express",
                        "Express delivery",
                        "1–2 business days · €8.99",
                        () => setDeliveryMethod("express")
                    )}

                    {appliedCoupon === "FRESHIP" && (
                        <Text style={styles.successText}>
                            Free shipping coupon applied!
                        </Text>
                    )}
                </View>

                {/* Payment method */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Payment method
                    </Text>

                    {renderOption(
                        paymentMethod === "card",
                        "Bank card",
                        "Pay by card (demo selection)",
                        () => setPaymentMethod("card")
                    )}

                    {renderOption(
                        paymentMethod === "cash",
                        "Cash on delivery",
                        "Pay when your order arrives",
                        () => setPaymentMethod("cash")
                    )}
                </View>

                {/* Order summary */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Order summary
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.muted}>Subtotal</Text>
                        <Text style={styles.value}>
                            {formatPrice(subtotal)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.muted}>Shipping</Text>
                        <Text style={styles.value}>
                            {formatPrice(shipping)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.muted}>Discount</Text>
                        <Text style={styles.discountValue}>
                            -{formatPrice(discount)}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>
                            {formatPrice(total)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerTotal}>
                    <Text style={styles.footerLabel}>Total to pay</Text>
                    <Text style={styles.footerPrice}>
                        {formatPrice(total)}
                    </Text>
                </View>

                <Pressable
                    onPress={handlePlaceOrder}
                    style={[
                        styles.primaryButton,
                        cart.length === 0 && styles.disabledButton,
                    ]}
                    disabled={cart.length === 0}
                >
                    <Text style={styles.primaryButtonText}>
                        Place order
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 180,
    },

    title: {
        color: colors.text,
        fontSize: 29,
        fontWeight: "900",
    },

    subtitle: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 5,
        marginBottom: 20,
    },

    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 14,
    },

    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    cardTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
        marginBottom: 14,
    },

    link: {
        color: colors.primary,
        fontWeight: "800",
    },

    addressContent: {
        gap: 5,
    },

    addressTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "800",
    },

    muted: {
        color: colors.muted,
        fontSize: 13,
        lineHeight: 20,
    },

    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 12,
    },

    productInfo: {
        flex: 1,
        gap: 5,
    },

    productTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "700",
    },

    productPrice: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "900",
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        marginBottom: 10,
        gap: 10,
    },

    selectedOption: {
        borderColor: colors.primary,
        backgroundColor: colors.surface,
    },

    optionRadio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    optionRadioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },

    optionContent: {
        flex: 1,
        gap: 3,
    },

    optionTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "800",
    },

    optionDescription: {
        color: colors.muted,
        fontSize: 12,
    },

    selectedLabel: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
    },

    successText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "800",
        marginTop: 3,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    value: {
        color: colors.text,
        fontWeight: "800",
    },

    discountValue: {
        color: colors.primary,
        fontWeight: "800",
    },

    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 14,
    },

    totalLabel: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
    },

    totalValue: {
        color: colors.primary,
        fontSize: 21,
        fontWeight: "900",
    },

    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 12,
    },

    footerTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    footerLabel: {
        color: colors.muted,
        fontSize: 13,
        fontWeight: "700",
    },

    footerPrice: {
        color: colors.primary,
        fontSize: 21,
        fontWeight: "900",
    },

    primaryButton: {
        height: 54,
        borderRadius: 17,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    disabledButton: {
        opacity: 0.5,
    },

    primaryButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "900",
    },
});