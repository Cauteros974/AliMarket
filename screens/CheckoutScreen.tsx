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
}