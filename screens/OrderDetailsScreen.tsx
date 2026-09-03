import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "OrderDetails">;

export default function OrderDetailsScreen({ navigation, route }: Props) {
    const order = useShopStore((state) =>
        state.orders.find((item) => item.id === route.params.orderId)
    );


    if(!order) {
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Order not found</Text>
                </View>
            </SafeAreaView>
        );
    }

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

                <Pressable>
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
    cardTitle: { 
        color: colors.text, 
        fontSize: 18, 
        fontWeight: "900", 
        marginBottom: 8 
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