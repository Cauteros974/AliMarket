import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { categories, products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { CategoryId } from "../types/product";

type CatalogScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type FilterId = CategoryId | "all";

export default function CatalogScreen({ navigation }: CatalogScreenProps) {
    const [selectedCategory, setSelectedCategory] = useState<FilterId>("all");

    const searchQuery = useShopStore((state) => state.searchQuery);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const setSearchQuery = useShopStore((state) => state.setSearchQuery);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

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