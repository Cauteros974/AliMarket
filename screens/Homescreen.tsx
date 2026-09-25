import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, FlatList, Pressable, ScrollView, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import SectionHeader from "../components/SectionHeader";
import { categories, products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = {
  navigation: any;
};

// Advertising banners
const banners = [
  {
    id: "summer",
    label: "Summer sale",
    title: "Up to 60% off gadgets and home goods",
    subtitle: "Use coupon WELCOME10 on checkout",
    button: "Shop now",
    productId: "p1",
    colors: [colors.primary, "#FF8A3D"] as const,
  },
  {
    id: "electronics",
    label: "Tech deals",
    title: "New electronics from €19.99",
    subtitle: "Headphones, gadgets and accessories",
    button: "Explore",
    productId: "p1",
    colors: ["#FF5A1F", "#FF9A5A"] as const,
  },
  {
    id: "fashion",
    label: "Fashion week",
    title: "Fresh styles for your everyday look",
    subtitle: "Discover new arrivals and special offers",
    button: "Discover",
    productId: "p5",
    colors: ["#FF6B35", "#FFB067"] as const,
  },
];

export default function HomeScreen({ navigation }: Props) {
  const searchQuery = useShopStore((state) => state.searchQuery);
  const favoriteIds = useShopStore((state) => state.favoriteIds);
  const recentlyViewedIds = useShopStore(
    (state) => state.recentlyViewedIds
  );

  const setSearchQuery = useShopStore((state) => state.setSearchQuery);
  const setSelectedCategoryId = useShopStore(
    (state) => state.setSelectedCategoryId
  );
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  
  // Benner
  const [bannerIndex, setBannerIndex] = useState(0);

  const bannerOpacity = useRef(new Animated.Value(1)).current;
  const bannerTranslateX = useRef(new Animated.Value(0)).current;

  const currentBanner = banners[bannerIndex];

  function changeBanner(nextIndex: number) {
    // First, hide the current banner
    Animated.parallel([
      Animated.timing(bannerOpacity, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(bannerTranslateX, {
        toValue: -20,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Changing the banner
      setBannerIndex(nextIndex);

      // Return it slightly to the right
      bannerTranslateX.setValue(20);

      // Show the new one
      Animated.parallel([
        Animated.timing(bannerOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(bannerTranslateX, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }

  // Automatic banner change
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (bannerIndex + 1) % banners.length;
      changeBanner(nextIndex);
    }, 4500);

    return () => clearInterval(interval);
  }, [bannerIndex]);
  
  // Products
  const flashDeals = useMemo(
    () => products.filter((item) => item.oldPrice).slice(0, 4),
    []
  );

  const recentlyViewed = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean)
        .slice(0, 4),
    [recentlyViewedIds]
  );

  function openCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);

    navigation.navigate("CategoryDetails", {
      categoryId,
    });
  }

  function openBanner() {
    navigation.navigate("ProductDetails", {
      productId: currentBanner.productId,
    });
  }

  function selectBanner(index: number) {
    if (index === bannerIndex) {
      return;
    }

    changeBanner(index);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>AliMarket</Text>

            <Text style={styles.title}>
              Find anything you need
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={styles.iconButton}
          >
            <Text style={styles.iconText}>!</Text>
          </Pressable>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <SearchSuggestions
          query={searchQuery}
          onPick={setSearchQuery}
        />

        {/* --------------------------------------------------
            ANIMATED BANNER
        -------------------------------------------------- */}

        <View style={styles.bannerContainer}>
          <Animated.View
            style={[
              styles.bannerAnimated,
              {
                opacity: bannerOpacity,
                transform: [
                  {
                    translateX: bannerTranslateX,
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={currentBanner.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <Text style={styles.bannerLabel}>
                {currentBanner.label}
              </Text>

              <Text style={styles.bannerTitle}>
                {currentBanner.title}
              </Text>

              <Text style={styles.bannerSubtitle}>
                {currentBanner.subtitle}
              </Text>

              <Pressable
                onPress={openBanner}
                style={styles.bannerButton}
              >
                <Text style={styles.bannerButtonText}>
                  {currentBanner.button}
                </Text>
              </Pressable>
            </LinearGradient>
          </Animated.View>

          {/* Indicators */}
          <View style={styles.dots}>
            {banners.map((banner, index) => (
              <Pressable
                key={banner.id}
                onPress={() => selectBanner(index)}
                style={[
                  styles.dot,
                  index === bannerIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <SectionHeader
          title="Categories"
          action="Open catalog"
          onActionPress={() => navigation.navigate("Catalog")}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              category={category}
              onPress={() => openCategory(category.id)}
            />
          ))}
        </ScrollView>

        {/* Flash Deals */}
        <SectionHeader
          title="Flash deals"
          action="Today"
        />

        <FlatList
          data={flashDeals}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              isFavorite={favoriteIds.includes(item.id)}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  productId: item.id,
                })
              }
              onToggleFavorite={() =>
                toggleFavorite(item.id)
              }
            />
          )}
        />

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 ? (
          <>
            <SectionHeader
              title="Recently viewed"
              action="Based on your views"
            />

            <FlatList
              data={recentlyViewed}
              keyExtractor={(item) => item!.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.grid}
              renderItem={({ item }) => (
                <ProductCard
                  product={item!}
                  isFavorite={favoriteIds.includes(item!.id)}
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      productId: item!.id,
                    })
                  }
                  onToggleFavorite={() =>
                    toggleFavorite(item!.id)
                  }
                />
              )}
            />
          </>
        ) : null}
      </ScrollView>
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
    paddingBottom: 28,
  },

  header: {
    marginTop: 8,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 4,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "900",
  },

  bannerContainer: {
    marginTop: 18,
    position: "relative",
  },

  bannerAnimated: {
    width: "100%",
  },

  banner: {
    minHeight: 170,
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
  },

  bannerLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  bannerTitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    marginTop: 8,
    maxWidth: "86%",
  },

  bannerSubtitle: {
    color: "rgba(255,255,255,0.86)",
    marginTop: 8,
    fontWeight: "700",
  },

  bannerButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 16,
  },

  bannerButtonText: {
    color: colors.primary,
    fontWeight: "900",
  },

  dots: {
    position: "absolute",
    right: 18,
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  activeDot: {
    width: 20,
    backgroundColor: colors.white,
  },

  grid: {
    gap: 12,
  },

  gridRow: {
    gap: 12,
    marginBottom: 12,
  },
});