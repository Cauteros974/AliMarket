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
                </View>

                <Text style={styles.title}>{product.title}</Text>

                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color={colors.warning} />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                    <Text style={styles.mutedText}>{pluralizeReviews(product.reviews)}</Text>
                    <Text style={styles.mutedText}>{product.sold.toLocaleString("en-US")} sold</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {

    },

    missing: {

    },
    
    missingTitle: {

    }
})