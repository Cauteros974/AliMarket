import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { OrderStatus } from "../types/shop";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "OrderTracking">;

const steps: OrderStatus[] = [
    "Processing",
    "Packed",
    "Shipped",
    "Local warehouse",
    "Delivered",
]

export default function OrderTrackingScreen({ route }: Props) {
    const order = useShopStore((state) => 
        state.orders.find((item) => item.id === route.params.orderId)
    );

    if (!order) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Order not found</Text>
                </View>
            </SafeAreaView>
        );
    }
  
    const activeIndex = steps.indexOf(order.status);

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Tracking</Text>
                <Text style={styles.subtitle}>{order.id}</Text>

                <View style={styles.card}>
                    {steps.map((step, index) => {
                        const active = index <= activeIndex;

                        return(
                            <View key={step} style={styles.stepRow}>
                                <View style={[styles.dot, active && styles.activeDot]}>

                                    <View style={styles.stepInfo}>
                                        <Text style={[styles.stepTitle, active && styles.activeText]}>
                                            {step}
                                        </Text>
                                    </View>
                                    <Text style={styles.stepText}>
                                        {active ? "Completed in demo timeline" : "Waiting for update"}
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.mapMock}>
                    <Text style={styles.mapTitle}>Delivery route preview</Text>
                    <Text style={styles.mapText}>
                        {order.address.city}, {order.address.street}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

})
