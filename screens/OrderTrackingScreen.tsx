import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";

type Props = NativeStackScreenProps<RootStackParamList, "OrderTracking">;

export default function OrderTrackingScreen(){
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
