import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
    onProductPress: (productId: string) => void;
}

export default function addRecentlyViewed({onProductPress} : Props) {
    const recentlyViewedIds = useShopStore(
        (state) => state.recentlyViewedIds
    );

    const recentlyViewedProducts = recentlyViewedIds
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);

    // We don't show anything if the user 
    // // hasn't watched anything yet.
    if(recentlyViewedProducts.length === 0) {
        return null;
    }

    return(
        <View style={styles.conteiner}>
            <View style={styles.header}>
                <Text style={styles.title}>Recently Viewed</Text>

                <Ionicons 
                    name="time-outline"
                    size={20}
                    color={colors.muted}
                />
            </View>

            <View style={styles.row}>
                {recentlyViewedProducts.map((product) => {
                    if(!product) return null;

                    return(
                        <Pressable
                            key={product.id}
                            style={styles.card}
                            onPress={() => onProductPress(product.id)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image 
                                    source={product.image}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={styles.productTitle}
                            >
                                {product.title}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})