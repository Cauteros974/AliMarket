import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

type Props = {
  navigation: any;
};

type FilterValue = "All" | string;

export default function OrdersScreen({ navigation }: Props) {
  const orders = useShopStore((state) => state.orders);
  
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("All");
    
  const filters = useMemo(() => {
    const statuses = Array.from(
      new Set(orders.map((order) => String(order.status)))
    );
        
      return ["All", ...statuses];
    }, [orders]);

    const filteredOrders = useMemo(() => {
      if (activeFilter === "All") {
        return orders;
      }
      
      return orders.filter(
        (order) => String(order.status) === activeFilter
      );
    }, [orders, activeFilter]);

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

    function getStatusBackground(status: string) {
        const normalized = status.toLowerCase();

        if (normalized.includes("deliver")) {
            return "#E5F7EE";
        }

        if (normalized.includes("cancel")) {
            return "#FCEAEA";
        }

        if (
            normalized.includes("ship") ||
            normalized.includes("transit")
        ) {
            return "#E8F0FC";
        }

        return colors.surfaceSoft;
    }

    function getProductCount(items: typeof orders[number]["items"]) {
        return items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }

    function renderOrder({ item }: { item: typeof orders[number] }) {
        const productNames = item.items.map((cartItem) => {
            const product = products.find(
                (entry) => entry.id === cartItem.productId
            );

            return {
                id: cartItem.productId,
                title: product?.title ?? "Product",
                quantity: cartItem.quantity,
            };
        });

        const statusColor = getStatusColor(String(item.status));
        const statusBackground = getStatusBackground(
            String(item.status)
        );

        return (
            <Pressable
                onPress={() =>
                    navigation.navigate("OrderDetails", {
                        orderId: item.id,
                    })
                }
                style={({ pressed }) => [
                    styles.orderCard,
                    pressed && styles.pressedCard,
                ]}
            >
                <View style={styles.orderHeader}>
                    <View style={styles.orderHeaderInfo}>
                        <Text style={styles.orderNumber}>
                            Order #{item.id}
                        </Text>

                        <Text style={styles.orderDate}>
                            {formatDate(item.createdAt)}
                        </Text>
                    </View>
                </View>

                <View style={styles.productsPreview}>
                    {productNames.slice(0, 3).map((product) => (
                        <View
                            key={product.id}
                            style={styles.productPreviewRow}
                        >
                            <View style={styles.productBullet}>
                                <Ionicons
                                    name="cube-outline"
                                    size={15}
                                    color={colors.primary}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={styles.productName}
                            >
                                {product.quantity} × {product.title}
                            </Text>
                        </View>
                    ))}

                    {productNames.length > 3 && (
                        <Text style={styles.moreProducts}>
                            +{productNames.length - 3} more products
                        </Text>
                    )}
                </View>

                <View style={styles.divider} />

                <View style={styles.orderFooter}>
                    <View style={styles.orderMeta}>
                        <Ionicons
                            name="bag-outline"
                            size={16}
                            color={colors.muted}
                        />
                    </View>
                    
                </View>

                <View style={styles.viewDetails}>
                    <Text style={styles.viewDetailsText}>
                        View order details
                    </Text>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrder}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.content,
                    filteredOrders.length === 0 && styles.emptyContent,
                ]}
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>
                                    My orders
                                </Text>

                                <Text style={styles.subtitle}>
                                    Keep track of your purchases
                                </Text>
                            </View>

                            <View style={styles.headerIcon}>
                                <Ionicons
                                    name="receipt-outline"
                                    size={24}
                                    color={colors.primary}
                                />
                            </View>
                        </View>

                        <View style={styles.statsCard}>
                            <View style={styles.statsIcon}>
                                <Ionicons
                                    name="cube-outline"
                                    size={21}
                                    color={colors.primary}
                                />
                            </View>

                            <View style={styles.statsInfo}>
                                <Text style={styles.statsValue}>
                                    {orders.length}
                                </Text>

                                <Text style={styles.statsLabel}>
                                    Total orders
                                </Text>
                            </View>

                            <View style={styles.statsDivider} />

                            <View style={styles.statsInfo}>
                                <Text style={styles.statsValue}>
                                    {formatPrice(
                                        orders.reduce(
                                            (sum, order) =>
                                                sum + order.total,
                                            0
                                        )
                                    )}
                                </Text>

                                <Text style={styles.statsLabel}>
                                    Total spent
                                </Text>
                            </View>
                        </View>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                Order history
                            </Text>

                            <Text style={styles.orderCount}>
                                {filteredOrders.length} orders
                            </Text>
                        </View>

                        <FlatList
                            horizontal
                            data={filters}
                            keyExtractor={(item) => item}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filters}
                            renderItem={({ item }) => {
                                const selected = activeFilter === item;

                                return (
                                    <Pressable
                                        onPress={() => setActiveFilter(item)}
                                        style={[
                                            styles.filterChip,
                                            selected &&
                                                styles.activeFilterChip,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.filterText,
                                                selected &&
                                                    styles.activeFilterText,
                                            ]}
                                        >
                                            {item === "All"
                                                ? "All orders"
                                                : item}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIcon}>
                            <Ionicons
                                name="receipt-outline"
                                size={42}
                                color={colors.primary}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            {orders.length === 0
                                ? "No orders yet"
                                : "No orders found"}
                        </Text>

                        <Text style={styles.emptyText}>
                            {orders.length === 0
                                ? "Your purchases will appear here once you place your first order."
                                : "There are no orders with this status."}
                        </Text>

                        {orders.length === 0 && (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("MainTabs", {
                                        screen: "Catalog",
                                    })
                                }
                                style={styles.shopButton}
                            >
                                <Text style={styles.shopButtonText}>
                                    Start shopping
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={17}
                                    color={colors.white}
                                />
                            </Pressable>
                        )}
                    </View>
                }
            />
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
        paddingBottom: 30,
    },

    emptyContent: {
        flexGrow: 1,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        color: colors.text,
        fontSize: 29,
        fontWeight: "900",
    },

    subtitle: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 5,
    },

    headerIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    statsCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 25,
    },

    statsIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    statsInfo: {
        flex: 1,
        gap: 4,
    },

    statsValue: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
    },

    statsLabel: {
        color: colors.muted,
        fontSize: 11,
        fontWeight: "600",
    },

    statsDivider: {
        width: 1,
        height: 38,
        backgroundColor: colors.border,
        marginHorizontal: 12,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 13,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: "900",
    },

    orderCount: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "700",
    },

    filters: {
        gap: 8,
        paddingBottom: 17,
    },

    filterChip: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    activeFilterChip: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    filterText: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "800",
    },

    activeFilterText: {
        color: colors.white,
    },

    orderCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 13,
    },

    pressedCard: {
        opacity: 0.85,
    },

    orderHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

    orderHeaderInfo: {
        flex: 1,
        gap: 5,
    },

    orderNumber: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "900",
    },

    orderDate: {
        color: colors.muted,
        fontSize: 12,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 999,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },

    statusText: {
        fontSize: 10,
        fontWeight: "900",
    },

    productsPreview: {
        marginTop: 17,
        gap: 10,
    },

    productPreviewRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    productBullet: {
        width: 27,
        height: 27,
        borderRadius: 9,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    productName: {
        flex: 1,
        color: colors.text,
        fontSize: 12,
        fontWeight: "700",
    },

    moreProducts: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
        marginLeft: 36,
    },

    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
    },

    orderFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    orderMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },

    orderMetaText: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "700",
    },

    orderTotalContainer: {
        alignItems: "flex-end",
        gap: 3,
    },

    totalCaption: {
        color: colors.muted,
        fontSize: 10,
    },

    orderTotal: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: "900",
    },

    viewDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },

    viewDetailsText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "900",
    },

    emptyState: {
        flex: 1,
        minHeight: 330,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    emptyIcon: {
        width: 82,
        height: 82,
        borderRadius: 28,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 17,
    },

    emptyTitle: {
        color: colors.text,
        fontSize: 21,
        fontWeight: "900",
    },

    emptyText: {
        color: colors.muted,
        textAlign: "center",
        fontSize: 13,
        lineHeight: 20,
        marginTop: 8,
    },

    shopButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        height: 48,
        borderRadius: 15,
        marginTop: 20,
    },

    shopButtonText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: "900",
    },
});
