import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { Product } from "../types/product";
import { formatPrice } from "../utils/format";

type ProductCardProps = {
    product: string
};

export default function ProductCard({
    product
}: ProductCardProps) {
    return(
        <Pressable onPress={onPress} style={styles.card}>
            <View style={styles.imageWrap}>
                <Image source={{ uri: product.image }} style={styles.image} />}}
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({

})