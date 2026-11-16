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
    
    const totalItems = order.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    )

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Order details</Text>

                    <Text style={styles.subtitle}>
                        Your purchase information
                    </Text>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="receipt-outline"
                            size={23}
                            color={colors.primary}
                        />
                    </View>
                </View>

                {/* Order information */}
                <View style={styles.card}>
                    <View style={styles.orderHeader}>
                        <View style={styles.orderIcon}>
                            <Ionicons 
                                name="bag-check-outline"
                                size={23}
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.orderHeaderInfo}>
                            <Text style={styles.orderId}>
                                Order #{order.id}
                            </Text>

                            <Text style={styles.muted}>
                                {formatDate(order.createdAt)}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.statusContainer}>
                        <View
                            style={[
                                styles.statusDot,
                                { backgroundColor: statusColor },
                            ]}
                        />

                        <View style={styles.statusInfo}>
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: statusColor },
                                ]}
                            >
                                {String(order.status)}
                            </Text>

                             <Text style={styles.statusDescription}>
                                {getStatusDescription(
                                    String(order.status)
                                )}
                            </Text>
                        </View>
                    </View>
                </View>

                <Pressable
                    onPress={() =>
                        navigation.navigate("OrderTracking", {
                            orderId: order.id,
                        })
                    }
                    style={styles.trackButton}
                >
                    <View style={styles.trackIcon}>
                        <Ionicons 
                            name="location-outline"
                            size={21}
                            color={colors.white}
                        />
                    </View>

                    <View style={styles.trackInfo}>
                        <Text style={styles.trackTitle}>
                            Track your order
                        </Text>

                        <Text style={styles.trackDescription}>
                            Check your delivery progress
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.white}
                    />
                </Pressable>
                
                {/* Delivery address */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIcon}>
                            <Ionicons
                                name="location-outline"
                                size={19}
                                color={colors.primary}
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Delivery address
                        </Text>
                    </View>

                    <Text style={styles.addressTitle}>
                        {order.address.title}
                    </Text>


                    <Text style={styles.addressText}>
                        {order.address.city}, {order.address.street}
                    </Text>
                    
                    <View style={styles.addressPhone}>
                        <Ionicons
                            name="call-outline"
                            size={15}
                            color={colors.muted}
                        />

                        <Text style={styles.muted}>
                            {order.address.phone}
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIcon}>
                            <Ionicons
                                name="cube-outline"
                                size={19}
                                color={colors.primary}
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Products
                        </Text>

                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>
                                {totalItems}
                            </Text>
                        </View>
                    </View>

                    {orderProducts.map((item) => (
                        <View
                            key={item.product.id}
                            style={styles.productRow}
                        >
                            <Image 
                                source={item.product.image}
                                style={styles.productImage}
                                resizeMode="cover"
                            />

                            <View style={styles.productInfo}>
                                <Text
                                    numberOfLines={2}
                                    style={styles.productTitle}
                                >
                                    {item.product.title}
                                </Text>

                                <Text style={styles.productQuantity}>
                                    Quantity: {item.quantity}
                                </Text>

                                <Text style={styles.productPrice}>
                                    {formatPrice(item.lineTotal)}
                                </Text>
                            </View>
                        </View>
                    ))}

                    {orderProducts.length === 0 && (
                        <Text style={styles.muted}>
                            Product information is unavailable.
                        </Text>
                    )}
                </View>

                {/* Price summary */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIcon}>
                            <Ionicons
                                name="wallet-outline"
                                size={19}
                                color={colors.primary}
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Payment summary
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Products
                        </Text>

                        <Text style={styles.summaryValue}>
                            {formatPrice(
                                orderProducts.reduce(
                                    (sum, item) =>
                                        sum + item.lineTotal,
                                    0
                                )
                            )}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>
                            Order total
                        </Text>

                        <Text style={styles.totalValue}>
                            {formatPrice(order.total)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.footerNote}>
                    Thank you for shopping with AliMarket!
                </Text>
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
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 35,
    },

    header: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    title: { 
        color: colors.text, 
        fontSize: 28, 
        fontWeight: "900", 
    },

    subtitle: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 5,
    },

    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 13,
    },

    orderHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    orderIcon: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    orderHeaderInfo: {
        flex: 1,
        gap: 5,
    },

    orderId: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "900",
    },

    muted: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
    },

    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
    },

    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    statusInfo: {
        flex: 1,
        gap: 4,
    },

    statusText: {
        fontSize: 13,
        fontWeight: "900"
    },

    statusDescription: {
        color: colors.muted,
        fontSize: 12,
    },

    trackButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 18,
        padding: 14,
        marginBottom: 13,
        gap: 12,
    },

    trackIcon: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    trackInfo: {
        flex: 1,
        gap: 4,
    },

    trackTitle: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "900",
    },

    trackDescription: {
        color: colors.white,
        opacity: 0.8,
        fontSize: 11
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        marginBottom: 15,
    },

    sectionIcon: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    cardTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "900",
        flex: 1,
    },
});