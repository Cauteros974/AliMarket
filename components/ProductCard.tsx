import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { Product } from "../types/product";
import { formatPrice } from "../utils/format";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    onPress: () => void;
    onToggleFavorite: () => void;
};

export default function ProductCard({
    product,
    isFavorite,
    onPress,
    onToggleFavorite,
}: ProductCardProps) {
    return(
        <Pressable onPress={onPress} style={styles.card}>
            <View style={styles.imageWrap}>
                <Image source={{ uri: product.image }} style={styles.image} />

                {product.discountLabel ? (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discountLabel}</Text>
                    </View>
                ): null}

                <Pressable onPress={onToggleFavorite} style={styles.favoriteButton}>
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={18}
                        color={isFavorite ? colors.danger : colors.text}
                    />
                </Pressable>
            </View>

            <Text numberOfLines={2} style={styles.title}>
                {product.title}
            </Text>

            <View style={styles.metaRow}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.metaText}>{product.rating}</Text>
                <Text style={styles.soldText}>{product.sold.toLocaleString("en-US")} sold</Text>
            </View>

            <View>
                <Text style={styles.price}>{formatPrice(product.price)}</Text>
                {product.oldPrice ? <Text style={styles.oldPrice}>{formatPrice(product.oldPrice)}</Text> : null}
            </View>

        </Pressable>
    )
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 18,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    imageWrap: {
        height: 110,
        borderRadius: 14,
        backgroundColor: colors.surfaceSoft,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    discountBadge: {
        position: "absolute",
        left: 8,
        top: 8,
        backgroundColor: colors.primary,
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    discountText: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "900"
    },
    favoriteButton: {
        position: "absolute",
        right: 8,
        top: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.92)",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "400",
        marginTop: 10,
        minHeight: 38,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8
    }
})