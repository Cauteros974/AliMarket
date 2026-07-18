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

    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + shipping;

    function handleCheckout() {
        Alert.alert("Order placed", "Your demo order was created successfully.");
        clearCart()
    }

    return(
        <SafeAreaView style={styles.safeArea}>
             <View style={styles.content}>
                <Text style={styles.title}>Cart</Text>

                <FlatList 
                    data={cartProducts}
                    keyExtractor={(entry) => entry.item.productId}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Ionicons name="bag-handle-outline" size={46} color={colors.primary} />
                            <Text style={styles.emptyTitle}>Your cart is empty</Text>
                            <Text style={styles.emptyText}>Add something from the catalog to start.</Text>
                        </View>
                    }
                    renderItem={({item}) => {
                        if(!item.product) return null;

                        return(
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("ProductDetails", { productId: item.product!.id })
                                }
                                style={styles.cartItem}
                            >
                                <Image source={{ uri: item.product.image }} style={styles.image}/>

                                <View style={styles.itemInfo}>
                                    <Text numberOfLines={2} style={styles.itemTitle}>
                                        {item.product.title}
                                    </Text>

                                    <Text style={styles.itemPrice}>{formatPrice(item.product.price)}</Text>

                                    <View style={styles.itemFooter}>
                                        <QuantityStepper
                                            quantity={item.item.quantity}
                                            onMinus={() => decreaseQuantity(item.product!.id)}
                                            onPlus={() => increaseQuantity(item.product!.id)}
                                        />

                                        <Pressable>
                                            <Text style={styles.removeText}>Remove</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        )
                    }}
                />
             </View>

             {cartProducts.length > 0 ? (
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>{formatPrice(shipping)}</Text>
                    </View>
                </View>
             )}
        </SafeAreaView>
    )
}

