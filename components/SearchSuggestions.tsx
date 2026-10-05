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

export default function SearchSuggestions({
  visible,
  onSelectProduct,
  onSelectCategory,
}: Props) {
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

        return (
          title.includes(query) ||
          description.includes(query)
        );
      })
      .slice(0, 5);
  }, [query]);
  
  const categorySuggestions = useMemo(() => {
    if (!query) {
      return [];
    }

    return categories
      .filter((category) =>
        category.title
          .toLowerCase()
          .includes(query)
      )
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
      .filter(Boolean)
      .slice(0, 4);
  }, [query, recentlyViewedIds]);
  
  const filteredPopular = useMemo(() => {
    if (!query) {
      return popularSearches.slice(0, 5);
    }

    return popularSearches
      .filter((item) =>
        item.includes(query)
      )
      .slice(0, 5);
  }, [query]);

  if (!visible) {
    return null;
  }

  function handleSearchSelect(value: string) {
    setSearchQuery(value);
  }

  function handleProductSelect(productId: string) {
    const product = products.find(
      (item) => item.id === productId
    );

    if (product) {
      setSearchQuery(product.title);
    }

    onSelectProduct?.(productId);
  }

  function handleCategorySelect(categoryId: string) {
    const category = categories.find(
      (item) => item.id === categoryId
    );

    if (category) {
      setSearchQuery(category.title);
    }

    onSelectCategory?.(categoryId);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        
        {query && productSuggestions.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Products
                </Text>

                {productSuggestions.map((product) => (
                    <Pressable
                        onPress={() => handleProductSelect(product.id)}
                        key={product.id}
                        style={styles.productRow}
                    >
                     <View style={styles.iconBox}>
                        <Ionicons 
                            name="search-outline"
                            size={18}
                            color={colors.primary}
                        />
                     </View>

                     <View style={styles.textContainer}>
                        <Text 
                            style={styles.productTitle}
                            numberOfLines={1}
                        >
                            {product.title}
                        </Text>
                     </View>
                    </Pressable>
                ))}
            </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

})
