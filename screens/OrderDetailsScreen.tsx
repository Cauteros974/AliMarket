import { Ionicons } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import type { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

type Props = {
  route: RouteProp<RootStackParamList, "OrderDetails">;
  navigation: NativeStackNavigationProp<RootStackParamList, "OrderDetails">;
};

export default function OrderDetailsScreen({ navigation, route }: Props) {
    const order = useShopStore((state) =>
        state.orders.find((item) => item.id === route.params.orderId)
    );

    function getStatusColor(status: string) {
        const normalized = status.toLowerCase();

        if (normalized.includes("deliver")) {
            return "#16A36A";
        }

        if (normalized.includes("cancel")) {
            return "#E05252";
        }

        if (
            normalized.includes("ship") ||
            normalized.includes("transit")
        ) {
            return "#3978D5";
        }

        return colors.primary;
    }

    function getStatusDescription(status: string) {
        const normalized = status.toLowerCase();

        if (normalized.includes("deliver")) {
            return "Your order has been delivered.";
        }

        if (normalized.includes("cancel")) {
            return "This order has been cancelled.";
        }

        if (
            normalized.includes("ship") ||
            normalized.includes("transit")
        ) {
            return "Your order is on its way.";
        }
        
        return "Your order is being processed.";
    }


    if(!order) {
        return(
            <SafeAreaView style={styles.safeArea}>
                 <View style={styles.notFound}>
                    <View style={styles.notFoundIcon}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={44}
                            color={colors.primary}
                        />
                    </View>

                    <Text style={styles.notFoundTitle}>
                        Order not found
                    </Text>

                    <Text style={styles.notFoundText}>
                        This order may have been removed or is no longer available.
                    </Text>

                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backButtonText}>
                            Go back
                        </Text>
                    </Pressable>
                 </View>
            </SafeAreaView>
        );
    }

    const statusColor = getStatusColor(String(order.status));

    const orderProducts = order.items
        .map((cartItem) => {
            const product = products.find(
                (item) => item.id === cartItem.productId
            );

            if (!product) return null;

            return {
                product,
                quantity: cartItem.quantity,
                lineTotal: product.price * cartItem.quantity,
            };
        })
        .filter((item) => item !== null);

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Order details</Text>

                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.orderId}>{order.id}</Text>
                            <Text style={styles.muted}>{formatDate(order.createdAt)}</Text>
                        </View>

                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{order.status}</Text>
                        </View>
                    </View>
                </View>

                <Pressable
                    onPress={() => navigation.navigate("OrderTracking", {orderId: order.id})}
                    style={styles.trackButton}
                >
                    <Text style={styles.trackText}>Track order</Text>
                </Pressable>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Delivery address</Text>
                    <Text style={styles.muted}>
                        {order.address.city}, {order.address.street}
                    </Text>
                    <Text style={styles.muted}>{order.address.phone}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Products</Text>

                    {order.items.map((cartItem) => {
                        const product = products.find((item) => item.id === cartItem.productId);
                        
                        if (!product) return null;
                        
                        return(
                            <View key={cartItem.productId} style={styles.productRow}>
                                <Image source={product.image} style={styles.productImage} />

                                <View style={styles.productInfo}>
                                    <Text numberOfLines={2} style={styles.productTitle}>
                                        {product.title}
                                    </Text>

                                    <Text style={styles.muted}>Quantity: {cartItem.quantity}</Text>
                                    <Text style={styles.productPrice}>
                                        {formatPrice(product.price * cartItem.quantity)}
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, 
        backgroundColor: colors.background 
    },
    content: { 
        padding: 18, 
        paddingBottom: 28 
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
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    orderId: { 
        color: colors.text, 
        fontSize: 17, 
        fontWeight: "900" 
    },
    muted: { 
        color: colors.muted, 
        marginTop: 4, 
        fontWeight: "700" 
    },
    statusBadge: {
        backgroundColor: colors.surfaceSoft,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    statusText: { 
        color: colors.primary, 
        fontSize: 12, 
        fontWeight: "900" 
    },
    trackButton: {
        height: 46,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
    },
    cardTitle: { 
        color: colors.text, 
        fontSize: 18, 
        fontWeight: "900", 
        marginBottom: 8 
    },
    trackText: {
        color: colors.white,
        fontWeight: "900",
    },
    productRow: {
        flexDirection: "row",
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    productImage: {
        width: 72,
        height: 72,
        borderRadius: 14,
        backgroundColor: colors.surfaceSoft,
    },
    productInfo: { 
        flex: 1 
    },
    productTitle: { 
        color: colors.text, 
        fontWeight: "900", 
        lineHeight: 20 
    },
    productPrice: { 
        color: colors.primary, 
        fontWeight: "900", 
        marginTop: 6 
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
    emptyState: { 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    },
    emptyTitle: { 
        color: colors.text, 
        fontSize: 22, 
        fontWeight: "900" 
    },
});