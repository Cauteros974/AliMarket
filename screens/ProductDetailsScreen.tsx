import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";

type ProductDetailsProps = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({route}: ProductDetailsProps) {
    const product = products.find((item) => item.id === route.params.productId);

    const addToCard = useShopStore((state) => state.addToCart);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    if(!product) {
        return(
            <SafeAreaView>
                <View>
                    <Text style={styles.missingTitle}>Product not found</Text>
                </View>
            </SafeAreaView>
        )
    }
}