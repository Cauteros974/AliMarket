import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QuantityStepper from "../components/QuantityStepper";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type CartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function CartScreen({navigation}: CartScreenProps) {
    const cart = useShopStore((state) => state.cart);
    const increaseQuantity = useShopStore((state) => state.increaseQuantity);
    const decreaseQuantity = useShopStore((state) => state.decreaseQuantity);
    const removeFromCart = useShopStore((state) => state.removeFromCart);
    const clearCart = useShopStore((state) => state.clearCart);

    const cartProducts = cart
        .map((item) => ({
            item,
            product: products.find((product) => product.id === item.productId),
        }))
        .filter((entry) => entry.product);

    const subtotal = cartProducts.reduce(
        (sum, entry) => sum + (entry.product?.price ?? 0) * entry.item.quantity,
        0
    );
}

