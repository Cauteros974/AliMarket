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
                                : "Your order is moving through the delivery process."
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

                                        {index !== steps.length - 1 && (
                                            <View
                                                style={[
                                                    styles.timelineLine,
                                                    completed &&
                                                        styles.completedLine,
                                                ]}
                                            />
                                        )}
                                    </View>

                                    <View
                                        style={[
                                            styles.timelineContent,
                                            index === steps.length - 1 &&
                                                styles.lastTimelineContent,
                                        ]}
                                    >
                                        <View style={styles.timelineTitleRow}>
                                            <Text
                                                style={[
                                                    styles.stepTitle,
                                                    completed &&
                                                        styles.completedText,
                                                ]}
                                            >
                                                {step.title}
                                            </Text>

                                            {current && (
                                                <View style={styles.currentBadge}>
                                                    <Text style={styles.currentBadgeText}>
                                                        Current
                                                    </Text>
                                                </View>
                                            )}
                                        </View>

                                        <Text style={styles.stepDescription}>
                                            {step.description}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.stepState,
                                                completed &&
                                                    styles.completedState,
                                            ]}
                                        >
                                            {completed
                                                ? "Completed"
                                                : upcoming
                                                    ? "Waiting for update"
                                                    : ""}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
                
                {/* Delivery address */}
                <View style={styles.addressCard}>
                    <View style={styles.addressIcon}>
                        <Ionicons
                            name="location-outline"
                            size={22}
                            color={colors.primary}
                        />
                    </View>

                    <View style={styles.addressInfo}>
                        <Text style={styles.addressLabel}>
                            DELIVERY DESTINATION
                        </Text>

                        <Text style={styles.addressTitle}>
                            {order.address.title}
                        </Text>

                        <Text style={styles.addressText}>
                            {order.address.city}, {order.address.street}
                        </Text>

                        <Text style={styles.addressPhone}>
                            {order.address.phone}
                        </Text>
                    </View>
                </View>

                <View style={styles.demoNotice}>
                    <Ionicons
                        name="information-circle-outline"
                        size={19}
                        color={colors.primary}
                    />

                    <Text style={styles.demoText}>
                        This is a demonstration tracking timeline.
                        Delivery updates are based on the order status stored in the app.
                    </Text>
                </View>

                <Pressable
                    onPress={() => 
                        navigation.navigate("OrderDetails", {
                            orderId: order.id,
                        })
                    }
                    style={styles.detailsButton}
                >
                    <Text style={styles.detailsButtonText}>
                        Back to order details
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={17}
                        color={colors.primary}
                    />
                </Pressable>
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
        paddingTop: 12,
        paddingBottom: 35,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900"
    },

    subtitle: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 5,
    },

    headerIcon: {
        width: 47,
        height: 47,
        borderRadius: 15,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    orderCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 14,
    },

    orderTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
    },

    orderIcon: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },
    
    orderInfo: {
        flex: 1,
        gap: 4,
    },

    orderLabel: {
        color: colors.muted,
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 1,
    },

    orderId: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "900",
    },

    statusBadge: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "900",
    },

    orderDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 14,
    },

    orderDateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    orderDate: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "700",
    },

    progressCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
    },

    progressPercent: {
        color: colors.primary,
        fontSize: 17,
        fontWeight: "900",
    },

    progressTrack: {
        height: 9,
        borderRadius: 999,
        backgroundColor: colors.surfaceSoft,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: colors.primary,
        borderRadius: 999,
    },
})
