import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { products, categories } from "../data/products";
import { colors } from "../theme/colors";
import { useShopStore } from "../store/useShopStore";


type SearchSuggestionsProps = {
    query: string;
    onPick: (value: string) => void;
}

type Props = { 
    visible: boolean;
    onSelectProduct?: (productId: string) => void;
    onSelectCategory?: (categoryId: string) => void;
};

const popularSearches = [
    "headphones",
    "smartwatch",
    "keyboard",
    "hoodie",
    "fitness",
    "beauty",
];

export default function SearchSuggestions({visible, onSelectProduct, onSelectCategory}: Props){
    const searchQuery = useShopStore(
        (state) => state.searchQuery
    );

    const recentlyViewedIds = useShopStore(
        (state) => state.recentlyViewedIds
    );

    const setSearchQuery = useShopStore(
        (state) => state.setSearchQuery
    );

    const clearRecentlyViewed = useShopStore(
        (state) => state.clearRecentlyViewed
    );

    const query = searchQuery.trim().toLowerCase();

    const productSuggestions = useMemo(() => {
        if (!query) {
            return [];
        }

        return products
            .filter((product) => {
                const title = product.title.toLowerCase();
                const description = 
                    product.description.toLowerCase();

                return(
                    title.includes(query) ||
                    description.includes(query)
                );
            })
            .slice(0, 3);
    }, [query]);

    const recentlyViewed = useMemo(() => {
    if (query) {
      return [];
    }

    return recentlyViewedIds
      .map((id) =>
        products.find(
          (product) => product.id === id
        )
      )
  }, [query, recentlyViewedIds]);

    return(
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
            >
                {query &&  productSuggestions}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        marginTop: 8,
        overflow: "hidden",
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    text: {
        color: colors.text,
        fontWeight: "800"
    }
})