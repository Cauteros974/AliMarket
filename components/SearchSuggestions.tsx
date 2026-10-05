import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { categories, products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

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
        {/* Search suggestions */}
        {query && productSuggestions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Products
            </Text>

            {productSuggestions.map((product) => (
              <Pressable
                key={product.id}
                style={styles.productRow}
                onPress={() =>
                  handleProductSelect(product.id)
                }
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

                  <Text
                    style={styles.productDescription}
                    numberOfLines={1}
                  >
                    €{product.price.toFixed(2)}
                  </Text>
                </View>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={colors.muted}
                />
              </Pressable>
            ))}
          </View>
        )}

        {/* Category suggestions */}
        {query &&
          categorySuggestions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Categories
              </Text>

              {categorySuggestions.map((category) => (
                <Pressable
                  key={category.id}
                  style={styles.categoryRow}
                  onPress={() =>
                    handleCategorySelect(category.id)
                  }
                >
                  <Ionicons
                    name={
                      category.icon as keyof typeof Ionicons.glyphMap
                    }
                    size={20}
                    color={colors.primary}
                  />

                  <Text style={styles.categoryText}>
                    {category.title}
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={colors.muted}
                  />
                </Pressable>
              ))}
            </View>
          )}

        {/* Popular searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {query
                ? "Popular searches"
                : "Popular"}
            </Text>
          </View>

          <View style={styles.chips}>
            {filteredPopular.map((item) => (
              <Pressable
                key={item}
                style={styles.chip}
                onPress={() =>
                  handleSearchSelect(item)
                }
              >
                <Ionicons
                  name="trending-up-outline"
                  size={15}
                  color={colors.primary}
                />

                <Text style={styles.chipText}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recently viewed */}
        {!query &&
          recentlyViewed.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Recently viewed
                </Text>

                <Pressable
                  onPress={clearRecentlyViewed}
                >
                  <Text style={styles.clearText}>
                    Clear
                  </Text>
                </Pressable>
              </View>

              {recentlyViewed.map((product) =>
                product ? (
                  <Pressable
                    key={product.id}
                    style={styles.productRow}
                    onPress={() =>
                      handleProductSelect(
                        product.id
                      )
                    }
                  >
                    <View style={styles.iconBox}>
                      <Ionicons
                        name="time-outline"
                        size={18}
                        color={colors.primary}
                      />
                    </View>

                    <View
                      style={styles.textContainer}
                    >
                      <Text
                        style={styles.productTitle}
                        numberOfLines={1}
                      >
                        {product.title}
                      </Text>

                      <Text
                        style={styles.productDescription}
                      >
                        €{product.price.toFixed(2)}
                      </Text>
                    </View>
                  </Pressable>
                ) : null
              )}
            </View>
          )}

        {/* Empty state */}
        {query &&
          productSuggestions.length === 0 &&
          categorySuggestions.length === 0 &&
          filteredPopular.length === 0 && (
            <View style={styles.empty}>
              <Ionicons
                name="search-outline"
                size={30}
                color={colors.muted}
              />

              <Text style={styles.emptyTitle}>
                Nothing found
              </Text>

              <Text style={styles.emptyText}>
                Try another search term.
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
});