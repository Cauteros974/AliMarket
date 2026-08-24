import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { products, sellers } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Seller">;

export default function SellerScreen({navigation, route}: Props) {
    const seller = sellers.find((item) => item.id === route.params.sellerId);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    const sellerProducts = products.filter(
        (product) => product.sellerId === route.params.sellerId
    );

    if (!seller) {
        return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Seller not found</Text>
            </View>
        </SafeAreaView>
        );
    }

    return(
        <SafeAreaView>
            <FlatList 
                data={sellerProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <View style={styles.sellerCard}>
                        <Image source={{ uri: seller.avatar }} style={styles.avatar} />

                        <View style={styles.sellerInfo}>
                            <Text style={styles.name}>{seller.name}</Text>
                            <Text style={styles.meta}>
                                ★ {seller.rating} · {seller.sales.toLocaleString("en-US")} sales
                            </Text>
                            <Text style={styles.description}>{seller.description}</Text>

                            <Pressable style={styles.followButton}>
                                <Text style={styles.followText}>Follow store</Text>
                            </Pressable>
                        </View>
                    </View>
                }

                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isFavorite={favoriteIds.includes(item.id)}
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
        padding: 18, 
        paddingBottom: 28
    },
    sellerCard: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        gap: 16,
    },
})