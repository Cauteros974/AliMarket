import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
    navigation: any;
}

export default function CheckoutScreen({navigation}: Props) {
    const cart = useShopStore((state) => state.cart);
    const addresses = useShopStore((state) => state.addresses);
    const selectedAddressId = useShopStore((state) => state.selectedAddressId);
    const appliedCoupon = useShopStore((state) => state.appliedCoupon);
    const placeOrder = useShopStore((state) => state.placeOrder);

    const address = addresses.find((item) => item.id === selectedAddressId);

    const subtotal = cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return sum + (product?.price ?? 0) + item.quantity;
    }, 0);

    const shipping = appliedCoupon === "FRESHIP" || subtotal === 0 ? 0 : 4.99;

    const discount = 
        appliedCoupon = "WELCOME10"
            ? subtotal * 0.1
            : appliedCoupon === "SALE15"
                ? subtotal * 0.15
                : 0;
                
    const total = Math.max(subtotal + shipping - discount, 0);

    function handlePlaceOrder() {
        const order = placeOrder(total);

        if(!order) {
            Alert.alert("Checkout blocked", "Add products and select a delivery address");
            return;
        }

        Alert.alert("Order placed", `${order.id} was created successfully.`);
        navigation.navigate("Orders");
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
    }
})