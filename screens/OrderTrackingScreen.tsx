import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { OrderStatus } from "../types/shop";

type Props = NativeStackScreenProps<RootStackParamList, "OrderTracking">;

const steps: OrderStatus[] = [
    "Processing",
    "Shipped",
    "Delivered",
]

export default function OrderTrackingScreen({ route }: Props) {
    const order = useShopStore((state) => 
        state.orders.find((item) => item.id === route.params.orderId)
    );

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Tracking</Text>
                <Text style={styles.subtitle}>{order.id}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
