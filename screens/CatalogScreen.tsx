import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AllFiltersModal from "../components/AllFiltersModal";
import CategoryChip from "../components/CategoryChip";
import { OpenCompareButton } from "../components/OpenCompareButton";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import SkeletonProductGrid from "../components/SkeletonProductGrid";
import { categories, products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type CatalogScreenProps = {
  navigation: any;
};

const sortOptions = [
  { value: "popular", label: "Popular", icon: "flame-outline" },
  { value: "priceAsc", label: "Price ↑", icon: "arrow-up-outline" },
  { value: "priceDesc", label: "Price ↓", icon: "arrow-down-outline" },
  { value: "rating", label: "Top rated", icon: "star-outline" },
] as const;

export default function CatalogScreen({
  navigation,
}: CatalogScreenProps) {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Global search and catalog state
  const searchQuery = useShopStore((state) => state.searchQuery);
  const selectedCategoryId = useShopStore(
    (state) => state.selectedCategoryId
  );
  const sortOption = useShopStore((state) => state.sortOption);
  const filters = useShopStore((state) => state.filters);
  const favoriteIds = useShopStore((state) => state.favoriteIds);

  const setSearchQuery = useShopStore((state) => state.setSearchQuery);
  const setSelectedCategoryId = useShopStore(
    (state) => state.setSelectedCategoryId
  );
  const setSortOption = useShopStore((state) => state.setSortOption);
  const updateFilters = useShopStore((state) => state.updateFilters);
  const resetFilters = useShopStore((state) => state.resetFilters);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  // Keep the initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice =
      Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;
    const query = searchQuery.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const matchesCategory =
          !selectedCategoryId ||
          product.categoryId === selectedCategoryId;

        const matchesSearch =
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);

        const matchesPrice =
          product.price >= minPrice &&
          product.price <= maxPrice;

        const matchesRating = product.rating >= filters.minRating;

        const matchesDelivery =
          !filters.freeDeliveryOnly ||
          product.delivery.toLowerCase().includes("free");

        const matchesDiscount =
          !filters.discountsOnly || Boolean(product.oldPrice);

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

  const activeFilterCount = [
    Boolean(filters.minPrice),
    Boolean(filters.maxPrice),
    filters.freeDeliveryOnly,
    filters.discountsOnly,
    filters.minRating > 0,
  ].filter(Boolean).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingHeader}>
            <View style={styles.loadingTitle} />
            <View style={styles.loadingSubtitle} />
          </View>
          <SkeletonProductGrid />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <Text style={styles.eyebrow}>DISCOVER SOMETHING NEW</Text>
                  <Text style={styles.title}>Explore</Text>
                  <Text style={styles.subtitle}>
                    Find your next favourite
                  </Text>
                </View>

                <Pressable
                  onPress={() => navigation.navigate("Notifications")}
                  style={styles.notificationButton}
                  accessibilityRole="button"
                  accessibilityLabel="Notifications"
                >
                  <Ionicons
                    name="notifications-outline"
                    size={22}
                    color={colors.text}
                  />
                </Pressable>
              </View>

              {/* Search */}
              <View style={styles.searchContainer}>
                <SearchBar
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <SearchSuggestions visible={searchQuery.length > 0} />
              </View>

              {/* Categories */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Categories</Text>
                  <Text style={styles.sectionHint}>Explore by interest</Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryRow}
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
                      onPress={() =>
                        setSelectedCategoryId(category.id)
                      }
                    />
                  ))}
                </ScrollView>
              </View>

              {/* Compare products */}
              <View style={styles.compareContainer}>
                <View style={styles.compareIcon}>
                  <Ionicons
                    name="git-compare-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.compareTextContainer}>
                  <Text style={styles.compareTitle}>
                    Compare products
                  </Text>
                  <Text style={styles.compareSubtitle}>
                    Find the best option for you
                  </Text>
                </View>

                <OpenCompareButton />
              </View>

              {/* Sort */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Sort by</Text>
                  <Text style={styles.sectionHint}>
                    {filteredProducts.length} products
                  </Text>
                </View>

                <View style={styles.sortRow}>
                  {sortOptions.map((option) => {
                    const selected = sortOption === option.value;

                    return (
                      <Pressable
                        key={option.value}
                        onPress={() => setSortOption(option.value)}
                        style={[
                          styles.sortButton,
                          selected && styles.sortButtonActive,
                        ]}
                      >
                        <Ionicons
                          name={option.icon}
                          size={15}
                          color={
                            selected ? colors.white : colors.muted
                          }
                        />
                        <Text
                          style={[
                            styles.sortText,
                            selected && styles.sortTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Filters */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Filters</Text>

                  {activeFilterCount > 0 && (
                    <Pressable onPress={resetFilters}>
                      <Text style={styles.resetText}>Reset all</Text>
                    </Pressable>
                  )}
                </View>

                <Pressable
                  onPress={() => setFiltersVisible(true)}
                  style={styles.allFiltersButton}
                >
                  <View style={styles.filterIconContainer}>
                    <Ionicons
                      name="options-outline"
                      size={19}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.filterButtonTextContainer}>
                    <Text style={styles.allFiltersTitle}>
                      All filters
                    </Text>
                    <Text style={styles.allFiltersSubtitle}>
                      Price, delivery, discounts and rating
                    </Text>
                  </View>

                  {activeFilterCount > 0 && (
                    <View style={styles.filterCount}>
                      <Text style={styles.filterCountText}>
                        {activeFilterCount}
                      </Text>
                    </View>
                  )}

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.muted}
                  />
                </Pressable>

                {/* Quick filters */}
                <View style={styles.quickFilters}>
                  <Pressable
                    onPress={() =>
                      updateFilters({
                        freeDeliveryOnly: !filters.freeDeliveryOnly,
                      })
                    }
                    style={[
                      styles.quickFilter,
                      filters.freeDeliveryOnly &&
                        styles.quickFilterActive,
                    ]}
                  >
                    <Ionicons
                      name="car-outline"
                      size={15}
                      color={
                        filters.freeDeliveryOnly
                          ? colors.white
                          : colors.text
                      }
                    />
                    <Text
                      style={[
                        styles.quickFilterText,
                        filters.freeDeliveryOnly &&
                          styles.quickFilterTextActive,
                      ]}
                    >
                      Free delivery
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      updateFilters({
                        discountsOnly: !filters.discountsOnly,
                      })
                    }
                    style={[
                      styles.quickFilter,
                      filters.discountsOnly &&
                        styles.quickFilterActive,
                    ]}
                  >
                    <Ionicons
                      name="pricetag-outline"
                      size={15}
                      color={
                        filters.discountsOnly
                          ? colors.white
                          : colors.text
                      }
                    />
                    <Text
                      style={[
                        styles.quickFilterText,
                        filters.discountsOnly &&
                          styles.quickFilterTextActive,
                      ]}
                    >
                      On sale
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      updateFilters({
                        minRating: filters.minRating === 4.5 ? 0 : 4.5,
                      })
                    }
                    style={[
                      styles.quickFilter,
                      filters.minRating === 4.5 &&
                        styles.quickFilterActive,
                    ]}
                  >
                    <Ionicons
                      name="star-outline"
                      size={15}
                      color={
                        filters.minRating === 4.5
                          ? colors.white
                          : colors.text
                      }
                    />
                    <Text
                      style={[
                        styles.quickFilterText,
                        filters.minRating === 4.5 &&
                          styles.quickFilterTextActive,
                      ]}
                    >
                      4.5+
                    </Text>
                  </Pressable>
                </View>

                {/* Price range */}
                <View style={styles.priceCard}>
                  <Text style={styles.priceLabel}>Price range (€)</Text>

                  <View style={styles.priceRow}>
                    <View style={styles.priceInputWrapper}>
                      <Text style={styles.inputPrefix}>Min</Text>
                      <TextInput
                        value={filters.minPrice}
                        onChangeText={(value) =>
                          updateFilters({ minPrice: value })
                        }
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor={colors.muted}
                        style={styles.input}
                      />
                    </View>

                    <View style={styles.priceDivider} />

                    <View style={styles.priceInputWrapper}>
                      <Text style={styles.inputPrefix}>Max</Text>
                      <TextInput
                        value={filters.maxPrice}
                        onChangeText={(value) =>
                          updateFilters({ maxPrice: value })
                        }
                        keyboardType="numeric"
                        placeholder="Any"
                        placeholderTextColor={colors.muted}
                        style={styles.input}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Product grid header */}
              <View style={styles.productsHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Products</Text>
                  <Text style={styles.productsSubtitle}>
                    Curated picks just for you
                  </Text>
                </View>

                <View style={styles.resultBadge}>
                  <Text style={styles.resultBadgeText}>
                    {filteredProducts.length}
                  </Text>
                </View>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="search-outline"
                  size={32}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.emptyTitle}>Nothing found</Text>
              <Text style={styles.emptyText}>
                Try another search or change your filters.
              </Text>

              <Pressable
                onPress={() => {
                  setSearchQuery("");
                  setSelectedCategoryId(null);
                  resetFilters();
                }}
                style={styles.emptyButton}
              >
                <Text style={styles.emptyButtonText}>
                  Clear search and filters
                </Text>
              </Pressable>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              isFavorite={favoriteIds.includes(item.id)}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  productId: item.id,
                })
              }
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}

      <AllFiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
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
    paddingTop: 10,
    paddingBottom: 32,
  },

  loadingContainer: {
    flex: 1,
    paddingTop: 18,
  },

  loadingHeader: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },

  loadingTitle: {
    width: 150,
    height: 28,
    borderRadius: 10,
    backgroundColor: colors.surfaceSoft,
    marginBottom: 10,
  },

  loadingSubtitle: {
    width: 210,
    height: 13,
    borderRadius: 7,
    backgroundColor: colors.border,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerText: {
    flex: 1,
    paddingRight: 12,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // Search
  searchContainer: {
    marginBottom: 22,
    zIndex: 2,
  },

  // Sections
  section: {
    marginTop: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  sectionHint: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
  },

  categoryRow: {
    paddingRight: 8,
    gap: 8,
  },

  // Compare panel
  compareContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 12,
    marginTop: 23,
    gap: 10,
  },

  compareIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  compareTextContainer: {
    flex: 1,
  },

  compareTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  compareSubtitle: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },

  // Sort
  sortRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    minHeight: 38,
    paddingHorizontal: 11,
    borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sortButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  sortText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },

  sortTextActive: {
    color: colors.white,
  },

  // Filters
  resetText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },

  allFiltersButton: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },

  filterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonTextContainer: {
    flex: 1,
  },

  allFiltersTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  allFiltersSubtitle: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },

  filterCount: {
    minWidth: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  filterCountText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
  },

  quickFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  quickFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 35,
    paddingHorizontal: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  quickFilterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  quickFilterText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },

  quickFilterTextActive: {
    color: colors.white,
  },

  // Price inputs
  priceCard: {
    marginTop: 13,
    padding: 13,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  priceLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 11,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  priceInputWrapper: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
  },

  inputPrefix: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginRight: 8,
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },

  priceDivider: {
    width: 10,
    height: 1,
    backgroundColor: colors.border,
  },

  // Product grid
  productsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 16,
  },

  productsSubtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },

  resultBadge: {
    minWidth: 35,
    height: 35,
    borderRadius: 13,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  resultBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
  },

  gridRow: {
    gap: 12,
    marginBottom: 12,
  },

  // Empty state
  emptyState: {
    minHeight: 280,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: "900",
  },

  emptyText: {
    color: colors.muted,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  emptyButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },

  emptyButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
});
