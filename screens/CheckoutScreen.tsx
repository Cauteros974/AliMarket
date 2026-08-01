import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
    navigation: any;
}

export default function CheckoutScreen({navigation}: Props) {
    const cart = useShopStore((state) => state.cart);
    const addresses = useShopStore((state) => state.addresses);
    const selectedAddressId = useShopStore((state) => state.selectedAddressId);
    const appliedCoupon = useShopStore((state) => state.appliedCoupon);
    const placeOrder = useShopStore((state) => state.placeOrder);

    const address = addresses.find((item) => item.id === selectedAddressId);

    const subtotal = cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return sum + (product?.price ?? 0) + item.quantity;
    }, 0);

    const shipping = appliedCoupon === "FRESHIP" || subtotal === 0 ? 0 : 4.99;

    const discount = 
        appliedCoupon = "WELCOME10"
            ? subtotal * 0.1
            : appliedCoupon === "SALE15"
                ? subtotal * 0.15
                : 0;
                
    const total = Math.max(subtotal + shipping - discount, 0);

    function handlePlaceOrder() {
        const order = placeOrder(total);

        if(!order) {
            Alert.alert("Checkout blocked", "Add products and select a delivery address");
            return;
        }

        Alert.alert("Order placed", `${order.id} was created successfully.`);
        navigation.navigate("Orders");
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Checkout</Text>

                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>Delivery address</Text>

                        <Pressable onPress={() => navigation.navigate("Addresses")}>
                            <Text style={styles.link}>Change</Text>
                        </Pressable>
                    </View>

                    {address ? (
                        <Text style={styles.muted}>
                            {address.title} · {address.city}, {address.street} · {address.phone}{address.title }
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}