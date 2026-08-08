import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

export default function OrdersScreen(){
    const orders = useShopStore((state) => state.orders);

    return(
        <SafeAreaView style={styles.safeArea}>
            <FlatList 
                data={orders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                ListHeaderComponent={<Text style={styles.title}>Order history</Text>}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={38} color={colors.primary} />
                        <Text>No orders yet</Text>
                        <Text>Your checkout orders will apears here.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}