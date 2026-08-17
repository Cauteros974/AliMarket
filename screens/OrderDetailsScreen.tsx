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
            </ScrollView>
        </SafeAreaView>
    )
}