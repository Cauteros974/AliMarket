import { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { categories, products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import SkeletonProductGrid from "../components/SkeletonProductGrid";
import { colors } from "../theme/colors";

type CatalogScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList>;
};

const sortOptions = [
    { value: "popular", label: "Popular" },
    { value: "priceAsc", label: "Price ↑" },
    { value: "priceDesc", label: "Price ↓" },
    { value: "rating", label: "Top rated" },
] as const;

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

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = useMemo(() => {
        const minPrice = Number(filters.minPrice) || 0;
        const maxPrice = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;
        const query = searchQuery.trim().toLowerCase();

        return [...products]
            .filter((product) => {
                const matchesCategory = !selectedCategoryId || product.categoryId === selectedCategoryId;
                const matchesSearch =
                    product.title.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query);
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                const matchesRating = product.rating >= filters.minRating;
                const matchesDelivery = !filters.freeDeliveryOnly || product.delivery.toLowerCase().includes("free");
                const matchesDiscount = !filters.discountsOnly || Boolean(product.oldPrice);

                return (
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
            });
    }, [filters, searchQuery, selectedCategoryId, sortOption]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={loading ? [] : filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Catalog</Text>
                        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.row}
                        >
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

                        <View style={styles.wrap}>
                            {sortOptions.map((option) => (
                                <Pressable
                                    key={option.value}
                                    onPress={() => setSortOption(option.value)}
                                    style={[styles.filterButton, sortOption === option.value && styles.activeFilter]}
                                >
                                    <Text
                                        style={[
                                            styles.filterText,
                                            sortOption === option.value && styles.activeFilterText,
                                        ]}
                                    >
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
                                <Text
                                    style={[
                                        styles.filterText,
                                        filters.freeDeliveryOnly && styles.activeFilterText,
                                    ]}
                                >
                                    Free delivery
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => updateFilters({ discountsOnly: !filters.discountsOnly })}
                                style={[styles.filterButton, filters.discountsOnly && styles.activeFilter]}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        filters.discountsOnly && styles.activeFilterText,
                                    ]}
                                >
                                    Discounts
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() =>
                                    updateFilters({ minRating: filters.minRating === 4.5 ? 0 : 4.5 })
                                }
                                style={[styles.filterButton, filters.minRating === 4.5 && styles.activeFilter]}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        filters.minRating === 4.5 && styles.activeFilterText,
                                    ]}
                                >
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
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 28,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginBottom: 16,
    },
    row: {
        paddingVertical: 20,
        paddingLeft: 6,
    },
    blockTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "900",
        marginBottom: 10,
        paddingLeft: 15,
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 14,
        paddingLeft: 5,
    },
    filterButton: {
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    activeFilter: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    filterText: {
        color: colors.text,
        fontSize: 12,
        fontWeight: "800",
    },
    activeFilterText: {
        color: colors.white,
    },
    priceRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 14,
        paddingLeft: 5,
    },
    input: {
        flex: 1,
        minHeight: 46,
        borderRadius: 14,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 12,
        color: colors.text,
        fontWeight: "700",
    },
    gridRow: {
        gap: 12,
        marginBottom: 12,
    },
    emptyState: {
        minHeight: 240,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900",
    },
    emptyText: {
        color: colors.muted,
        marginTop: 8,
    },
});