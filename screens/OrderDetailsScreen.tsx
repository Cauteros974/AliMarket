import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "OrderDetails">;

export default function OrderDetailsScreen({route}: Props) {
    const orders = useShopStore((state) => state.orders);
    const order = orders.find((item) => item.id === route.params.orderId);

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
                                <Image source={{ uri: product.image }} style={styles.productImage} />

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
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}