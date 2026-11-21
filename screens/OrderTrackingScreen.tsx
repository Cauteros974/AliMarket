import { Ionicons } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import type { OrderStatus } from "../types/shop";
import { colors } from "../theme/colors";
import { formatDate } from "../utils/format";

type Props = {
  route: RouteProp<RootStackParamList, "OrderTracking">;
  navigation: NativeStackNavigationProp<RootStackParamList, "OrderTracking">;
};

const steps: {
    status: OrderStatus;
    title: string;
    description: string,
    icon: keyof typeof Ionicons.glyphMap;
} [] = [
    {
        status: "Processing",
        title: "Order placed",
        description: "Your order has been received and is being processed.",
        icon: "receipt-outline",
    },
    {
        status: "Packed",
        title: "Order packed",
        description: "Your products have been prepared for shipment.",
        icon: "cube-outline",
    },
    {
        status: "Shipped",
        title: "On the way",
        description: "Your package has left the warehouse.",
        icon: "car-outline",
    },
    {
        status: "Local warehouse",
        title: "Local warehouse",
        description: "Your package has arrived at the local distribution center.",
        icon: "business-outline",
    },
    {
        status: "Delivered",
        title: "Delivered",
        description: "Your package has reached its destination.",
        icon: "checkmark-done-outline",
    },
]

export default function OrderTrackingScreen({ route, navigation }: Props) {
    const order = useShopStore((state) => 
        state.orders.find((item) => item.id === route.params.orderId)
    );

    if (!order) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.emptyState}>
                    <View style={styles.emptyIcon}>
                        <Ionicons 
                            name="search-outline"
                            size={42}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={styles.emptyTitle}>Order not found</Text>

                    <Text style={styles.emptyText}>
                        We couldn't find the order you're looking for.
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
    
    const isCancelled =
        String(order.status).toLowerCase().includes("cancel");

    const activeIndex = steps.findIndex(
        (step) => step.status === order.status
    );

    const isUnknownStatus = activeIndex === -1 && !isCancelled;

    const progress = isUnknownStatus
        ? 0
        : activeIndex === -1
            ? 0
            : (activeIndex + 1) / steps.length;

    const statusColor = isCancelled
        ? "#E05252"
        : order.status === "Delivered"
            ? "#16A36A"
            : colors.primary;

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>
                            Track order
                        </Text>

                        <Text style={styles.subtitle}>
                            Follow your package progress
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="navigate-outline"
                            size={24}
                            color={colors.primary}
                        />
                    </View>
                </View>
                
                {/* Order card */}
                <View style={styles.orderCard}>
                    <View style={styles.orderTop}>
                        <View style={styles.orderIcon}>
                            <Ionicons 
                                name="cube-outline"
                                size={23}
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.orderInfo}>
                            <Text style={styles.orderLabel}>
                                ORDER NUMBER
                            </Text>

                            <Text style={styles.orderId}>
                                #{order.id}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor: isCancelled
                                        ? "#FCEAEA"
                                        : order.status === "Delivered"
                                            ? "#E5F7EE"
                                            : colors.surfaceSoft,
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: statusColor },
                                ]}
                            >
                                {String(order.status)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.orderDivider} />

                    <View style={styles.orderDateRow}>
                        <Ionicons
                            name="calendar-outline"
                            size={17}
                            color={colors.muted}
                        />

                        <Text style={styles.orderDate}>
                            Ordered on {formatDate(order.createdAt)}
                        </Text>
                    </View>
                </View>

                {/* Progress */}
                {!isCancelled && (
                    <View style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.sectionTitle}>
                                Delivery progress
                            </Text>

                            <Text style={styles.progressPercent}>
                                {Math.round(progress * 100)}%
                            </Text>
                        </View>

                        <View style={styles.progressTrack}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${progress * 100}%`,
                                    },
                                ]}
                            />
                        </View>

                        <Text style={styles.progressHint}>
                            ? "Your order has been successfully delivered."
                            : isUnknownStatus
                                ? "Waiting for a tracking update."
                                : "Your order is moving through the delivery process."}
                        </Text>
                    </View>
                )}

                {/* Cancelled state */}
                {isCancelled && (
                    <View style={styles.cancelledCard}>
                        <View style={styles.cancelledIcon}>
                            <Ionicons 
                                name="close-circle-outline"
                                size={30}
                                color="#E05252"
                            />
                        </View>

                        <View style={styles.cancelledInfo}>
                            <Text style={styles.cancelledTitle}>
                                Order cancelled
                            </Text>

                            <Text style={styles.cancelledText}>
                                This order is no longer being processed.
                            </Text>
                        </View>
                    </View>
                )}

                {isCancelled && (
                    <View style={styles.timelineCard}>
                        <Text style={styles.sectionTitle}>
                            Tracking history
                        </Text>

                        {steps.map((step, index) => {
                            const completed =
                                activeIndex >= 0 && index <= activeIndex;
                            
                            const current = index === activeIndex;

                            const upcoming = !completed;

                            return(
                                <View
                                    key={step.status}
                                    style={styles.timelineRow}
                                >
                                    <View style={styles.timelineIndicator}>
                                        <View
                                            style={[
                                                styles.timelineDot,
                                                completed &&
                                                    styles.completedDot,
                                                current &&
                                                    styles.currentDot,
                                            ]}
                                        >
                                            {completed && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={12}
                                                    color={colors.white}
                                                />
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 18,
        paddingBottom: 28,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900"
    },
    subtitle: {
        color: colors.muted,
        marginTop: 6,
        marginBottom: 16,
        fontWeight: "800",
    },
    card: {
        width: 380,
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16
    },
    stepRow: {
        flexDirection: "row",
        gap: 12,
        paddingVertical: 12,
    },
    dot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.border,
        marginTop: 2,
    },
    activeDot: {
        backgroundColor: colors.primary
    },
    stepInfo: {
        flex: 1
    },
    stepTitle: {
        color: colors.text,
        fontWeight: "900",
        fontSize: 16,
    },
    activeText: {
        color: colors.primary
    },
    stepText: {
        color: colors.primary,
        marginTop: 4,
        fontWeight: "700"
    },
    mapMock: {
        minHeight: 150,
        borderRadius: 22,
        backgroundColor: colors.surfaceSoft,
        padding: 18,
        marginTop: 14,
        justifyContent: "center",
    },
    mapTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "900"
    },
    mapText: {
        color: colors.muted,
        marginTop: 8,
        fontWeight: "800",
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyTitle: {
        color: colors.text,
        fontSize: 22,
        fontWeight: "900",
    },
})
