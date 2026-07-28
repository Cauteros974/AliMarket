import { useMemo } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { categories, products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { SortOption } from "../types/shop";


type CatalogScreenProps = {
  navigation: any;
};

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Popular", value: "popular" },
  { label: "Low price", value: "priceAsc" },
  { label: "High price", value: "priceDesc" },
  { label: "Rating", value: "rating" },
];

export default function CatalogScreen({ navigation }: CatalogScreenProps) {

    const searchQuery = useShopStore((state) => state.searchQuery);
    const selectedCategoryId = useShopStore((state) => state.selectedCategoryId);
    const sortOption = useShopStore((state) => state.sortOption);
    const filters = useShopStore((state) => state.filters);
    const favoriteIds = useShopStore((state) => state.favoriteIds);

    const setSearchQuery = useShopStore((state) => state.setSearchQuery);
    const setSelectedCategoryId = useShopStore((state) => state.setSelectedCategoryId);


    const filteredProducts = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return products.filter((product) => {
            const matchesCategory = 
                selectedCategory === "all" || product.categoryId === selectedCategory;

            const matchesSearch = 
                product.title.toLowerCase().includes(normalizedQuery) ||
                product.description.toLowerCase().includes(normalizedQuery);
                
            return matchesCategory && matchesSearch;
        })
    }, [searchQuery, selectedCategory]);

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <Text style={styles.title}>Catalog</Text>
                
                <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categories}
                >
                    <CategoryChip
                        category={{ id: "electronics", title: "All", icon: "apps-outline" }}
                        selected={selectedCategory === "all"}
                        onPress={() => setSelectedCategory("all")}
                    />

                    {categories.map((category) => (
                        <CategoryChip
                            key={category.id}
                            category={category}
                            selected={selectedCategory === category.id}
                            onPress={() => setSelectedCategory(category.id)}
                        />
                    ))}
                </ScrollView>

                <FlatList 
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.gridRow}
                    contentContainerStyle={styles.grid}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>Nothing found</Text>
                            <Text style={styles.emptyText}>Try another category or search phrase.</Text>
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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 8,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginBottom: 16,
    },
    categories: {
        paddingVertical: 16,
    },
    gridRow: {
        gap: 12,
        marginBottom: 12,
    },
    grid: {
        paddingBottom: 28
    },
    emptyState: {
        minHeight: 240,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900"
    },
    emptyText: {
        color: colors.muted,
        marginTop: 8
    }
});