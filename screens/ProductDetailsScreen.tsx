import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice, pluralizeReviews } from "../utils/format";

type ProductDetailsProps = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({route}: ProductDetailsProps) {
    const product = products.find((item) => item.id === route.params.productId);

    const addToCard = useShopStore((state) => state.addToCart);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    if(!product) {
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.missing}>
                    <Text style={styles.missingTitle}>Product not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    const isFavorite = favoriteIds.includes(product.id);

    return(
        <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.imageWrap}>
                    <Image source={{ uri: product.image }} style={styles.image} />

                    <Pressable>
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={22}
                            color={isFavorite ? colors.danger : colors.text}
                        />
                    </Pressable>
                </View>

                <View>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{formatPrice(product.price)}</Text>
                            {product.oldPrice ? (
                                <Text style={styles.oldPrice}>{formatPrice(product.oldPrice)}</Text>
                            ) : null}
                    </View>
                    
                    <Text style={styles.title}>{product.title}</Text>
                    
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={16} color={colors.warning} />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                        <Text style={styles.mutedText}>{pluralizeReviews(product.reviews)}</Text>
                        <Text style={styles.mutedText}>{product.sold.toLocaleString("en-US")} sold</Text>
                    </View>

                    <View style={styles.deliveryBox}>
                        <Ionicons name="airplane-outline" size={20} color={colors.primary} />
                        <View>
                            <Text style={styles.deliveryTitle}>Delivery</Text>
                            <Text style={styles.deliveryText}>{product.delivery}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Colors</Text>

                <View style={styles.colorRow}>
                    {product.colors.map((color) => (
                        <View key={color} style={[styles.colorDot, { backgroundColor: color }]} />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>
            </ScrollView>

            <View style={styles.footer}>
                 <Pressable onPress={() => toggleFavorite(product.id)} style={styles.secondaryButton}>
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={20}
                        color={colors.primary}
                    />
                </Pressable>

                <Pressable onPress={() => addToCart(product.id)} style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Add to cart</Text>
                </Pressable>
            </View>
            <View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingBottom: 116,
    },
    imageWrap: {
        margin: 18,
        height: 330,
        borderRadius: 28,
        backgroundColor: colors.surfaceSoft,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    favoriteButton: {
        position: "absolute",
        right: 14,
        top: 14,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.94)",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        paddingHorizontal: 18,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 10,
    },
    price: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: "900",
    },
    oldPrice: {
        color: colors.muted,
        fontSize: 16,
        textDecorationLine: "line-through",
    },
    title: {
        color: colors.text,
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "900",
        marginTop: 10,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
    },
    ratingText: {
        color: colors.text,
        fontWeight: "900",
    },
    mutedText: {
        color: colors.muted,
        fontSize: 13,
    },
    deliveryBox: {
        marginTop: 22,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    deliveryTitle: {
        color: colors.text,
        fontWeight: "900",
    },
    deliveryText: {
        color: colors.muted,
        marginTop: 3,
    },
})