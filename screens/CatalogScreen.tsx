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
import QuantityStepper from "../components/QuantityStepper";


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
    const setSortOption = useShopStore((state) => state.setSortOption);
    const updateFilters = useShopStore((state) => state.updateFilters);
    const resetFilters = useShopStore((state) => state.resetFilters);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);


    const filteredProducts = useMemo(() => {
        const minPrice = Number(filters.minPrice) || 0;
        const maxPrice = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGE;
        const query = searchQuery.trim().toLowerCase();

        return [...products]
            .filter((product) => {
                const matchesCategory = !selectedCategoryId || product.categoryId === selectedCategoryId;
                const matchesSearch =   
                    product.title.toLowerCase().includes(query) || 
                    product.description.toLowerCase().includes(query);
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                const matchesRating = product.rating >= filters.minRating;
                const matchesDelivery = !filters.freeDeliveryOnly || product.delivery;
                const matchesDiscount = !filters.discountsOnly || Boolean(product.oldPrice);
                
                return(
                    matchesCategory &&
                    matchesSearch &&
                    matchesPrice &&
                    matchesRating &&
                    matchesDelivery &&
                    matchesDiscount
                );
            })
            .sort((a, b) => {
                if (sortOption === "priceAsc") return a.price - b.price;
                if (sortOption === "priceDesc") return b.price - a.price;
                if (sortOption === "rating") return b.rating - a.rating;
                return b.sold - a.sold;
            })
    }, [filters, searchQuery, selectedCategoryId, sortOption]);

    return(
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data = {filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle = {styles.content}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Catalog</Text>
                        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                            <CategoryChip
                                category={{ title: "All", icon: "apps-outline" }}
                                selected={!selectedCategoryId}
                                onPress={() => setSelectedCategoryId(null)}
                            />

                            {categories.map((category) => (
                                <CategoryChip
                                    key={category.id}
                                    category={category}
                                    selected={selectedCategoryId === category.id}
                                    onPress={() => setSelectedCategoryId(category.id)}
                                />
                            ))}
                        </ScrollView>

                        <Text style={styles.blockTitle}>Sort</Text>

                        <View style = {styles.wrap}>
                            {sortOptions.map((option) => (
                                <Pressable
                                    key={option.value}
                                    onPress={() => setSortOption(option.value)}
                                    style={[styles.filterButton, sortOption === option.value && styles.activeFilter]}
                                >
                                    <Text style={[styles.filterText, sortOption === option.value && styles.activeFilterText]}>
                                        {option.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        <Text style={styles.blockTitle}>Filters</Text>

                        <View style={styles.priceRow}>
                            <TextInput 
                                value={filters.minPrice}
                                onChangeText={(value) => updateFilters({ minPrice: value })}
                                keyboardType="numeric"
                                placeholder="Min €"
                                placeholderTextColor={colors.muted}
                                style={styles.input}
                            />

                            <TextInput 
                                value={filters.maxPrice}
                                onChangeText={(value) => updateFilters({ maxPrice: value })}
                                keyboardType="numeric"
                                placeholder="Max €"
                                placeholderTextColor={colors.muted}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.wrap}>
                            <Pressable
                                onPress={() => updateFilters({ freeDeliveryOnly: !filters.freeDeliveryOnly })}
                                style={[styles.filterButton, filters.freeDeliveryOnly && styles.activeFilter]}
                            >
                                <Text style={[styles.filterText, filters.freeDeliveryOnly && styles.activeFilterText]}>
                                    Free delivery
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => updateFilters({ discountsOnly: !filters.discountsOnly })}
                                style={[styles.filterButton, filters.discountsOnly && styles.activeFilter]}
                            >
                                <Text style={[styles.filterText, filters.discountsOnly && styles.activeFilterText]}>
                                    Discounts
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() =>
                                    updateFilters({minRating: filters.minRating === 4.5 ? 0 : 4.5 })
                                }
                                style={[styles.filterButton, filters.minRating === 4.5 && styles.activeFilter]}
                            >
                                <Text style={[styles.filterText, filters.minRating === 4.5 && styles.activeFilterText]}>
                                    4.5+ rating
                                </Text>
                            </Pressable>

                            <Pressable onPress={resetFilters} style={styles.filterButton}>
                                <Text style={styles.filterText}>Reset</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nothing found</Text>
                        <Text style={styles.emptyText}>Try another search or reset filters.</Text>
                    </View>
                }

                renderItem={({item}) => (
                    <ProductCard 
                        product={item}
                        isFavorite={favoriteIds.includes(item.id)}
                        onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                    />
                )}
            />
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