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

export default function CatalogScreen({navigation}: CatalogScreenProps) {
    const [selectedCategory, setSelectedCategory] = useState<FilterId>("all");

    const searchQuery = useShopStore((state) => state.searchQuery);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const setSearchQuery = useShopStore((state) => state.setSearchQuery);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    const filteredProducts = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return(
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text>Catalog</Text>
                </View>
            </SafeAreaView>
        )
    })
}