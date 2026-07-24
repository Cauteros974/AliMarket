import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type FavoritesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function FavoritesScreen({navigation}: FavoritesScreenProps) {
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    const favorites = products.filter((product) => favoriteIds.includes(product.id));

    return(
        <SafeAreaView style={styles.safeArea}>
            <View >
                <Text>Saved products</Text>

                <FlatList 
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.grid}
                    ListEmptyComponent={
                        <View>
                            <Ionicons name="heart-outline" size={22}/>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    }
})