import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import FavoritesScreen from "./FavoritesScreen";

type Props = NativeStackScreenProps<RootStackParamList, "CategoryDetails">;

export default function CategoryDetailsScreen({ navigation, route }: Props) {
    const category = categories.find((item) => item.id === route.params.categoryId);

    const categoryProducts = products.filter(
        (item) => item.categoryId === route.params.categoryId
    );


    return(
        <SafeAreaView>
            <FlatList 
                data={categoryProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>{category?.title ?? "Category"}</Text>
                        <Text style={styles.subtitle}>{category?.subcategories.join(" · ")}</Text>
                    </View>
                }

                renderItem={({item}) => (
                    <ProductCard 
                        product={item}
                        isFavorite={FavoritesScreen.includes(item.id)}
                        onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 20,
    },
    title: {
        color: colors.text, 
        fontSize: 28,
    },
    gridRow: {
        gap: 12,
        marginBottom: 12
    },
    subtitle: {
        color: colors.muted,
        fontWeight: "700",
        marginBottom: 16
    },
})