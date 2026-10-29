import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedProductCard from "../components/AnimatedProductCard";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import SectionHeader from "../components/SectionHeader";
import { colors } from "../theme/colors";
import { categories, products } from "../data/products";
import { useSeasonalTheme } from "../store/useSeasonalThemeStore";
import { useShopStore } from "../store/useShopStore";

type Props = {
  navigation: any;
};

type ThemeColors = ReturnType<typeof useSeasonalTheme>["colors"];

const WHITE = "#FFFFFF";

// Advertising banners (purple gradients, the first one follows the theme)
const getBanners = (colors: ThemeColors) => [
  {
    id: "summer",
    label: "SPECIAL OFFER",
    title: "Find your favourites for less",
    subtitle: "Discover deals across the store",
    button: "Shop now",
    productId: "p1",
    colors: [colors.primary, "#48209B"] as const,
  },
  {
    id: "electronics",
    label: "TECH COLLECTION",
    title: "Upgrade your everyday essentials",
    subtitle: "Discover gadgets and accessories",
    button: "Explore",
    productId: "p1",
    colors: ["#9255F5", "#5420B8"] as const,
  },
  {
    id: "fashion",
    label: "NEW ARRIVALS",
    title: "A fresh look starts here",
    subtitle: "Explore new styles and special finds",
    button: "Discover",
    productId: "p5",
    colors: ["#B28AFB", "#7928E8"] as const,
  },
];

const seasonText: Record<string, string> = {
  autumn: "Autumn edit",
  winter: "Winter collection",
  spring: "Spring refresh",
  summer: "Summer collection",
};

const seasonIcons: Record <string, keyof typeof Ionicons.glyphMap> = {
  autumn: "leaf-outline",
  winter: "snow-outline",
  spring: "flower-outline",
  summer: "sunny-outline",
}

export default function HomeScreen({ navigation }: Props) {
  // Theme
  const { colors, season } = useSeasonalTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const banners = useMemo(() => getBanners(colors), [colors]);

  // Store
  const searchQuery = useShopStore((state) => state.searchQuery);
  const favoriteIds = useShopStore((state) => state.favoriteIds);
  const recentlyViewedIds = useShopStore((state) => state.recentlyViewedIds);

  const setSearchQuery = useShopStore((state) => state.setSearchQuery);
  const setSelectedCategoryId = useShopStore(
    (state) => state.setSelectedCategoryId
  );
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  // Banner
  const [bannerIndex, setBannerIndex] = useState(0);

  const bannerOpacity = useRef(new Animated.Value(1)).current;
  const bannerTranslateX = useRef(new Animated.Value(0)).current;

  const currentBanner = banners[bannerIndex];

  const [searchFocused, setSearchFocused] = useState(false);

  const changeBanner = useCallback(
    {nextIndex: number} => {
      if (nextIndex === bannerIndex || nextIndex < 0 || nextIndex >= banners.length) {
        return;
      }

      Animated.parallel([
        Animated.timing(bannerOpacity, {
          toValue: 0,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bannerTranslateX, {
          toValue: -12,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (!finished) return;

        setBannerIndex(nextIndex);
        bannerTranslateX.setValue(12);

        Animated.parallel([
          Animated.timing(bannerOpacity, {
            toValue: 1,
            duration: 280,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bannerTranslateX, {
            toValue: 0,
            duration: 280,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [bannerIndex, banners.length, bannerOpacity, bannerTranslateX]
  )

  // Automatic banner change
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((current) => {
        const next = (current + 1) % banners.length;

        Animated.parallel([
          Animated.timing(bannerOpacity, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(bannerTranslateX, {
            toValue: -12,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start(({finished}) => {
          if (!finished) return;

          bannerTranslateX.setValue(12);

          Animated.parallel([
            Animated.timing(bannerOpacity, {
              toValue: 1,
              duration: 280,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(bannerTranslateX, {
              toValue: 0,
              duration: 280,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]).start();
        })
      })
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
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>AliMarket</Text>
            <Text style={styles.title}>Discover your style</Text>
            <Text style={styles.headerSubtitle}>
              Find something you'll love
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <LinearGradient
              colors={[colors.primary, "#5420B8"]}
              style={styles.notificationGradient}
            >
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#FFFFFF"
              />
            </LinearGradient>
          </Pressable>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setSearchFocused(true)}
        />

        <SearchSuggestions
          visible={searchFocused}
          onSelectProduct={(productId) => {
            setSearchFocused(false);

            navigation.navigate("ProductDetails", {
              productId,
            });
          }}
          onSelectCategory={(categoryId) => {
            setSearchFocused(false);

            setSelectedCategoryId(categoryId);

            navigation.navigate("CategoryDetails", {
              categoryId,
            });
          }}
        />

        {/* Seasonal badge */}
        <View style={styles.seasonBadge}>
          <Text style={styles.seasonText}>{seasonText[season] ?? ""}</Text>
        </View>

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
              <Text style={styles.bannerLabel}>{currentBanner.label}</Text>

              <Text style={styles.bannerTitle}>{currentBanner.title}</Text>

              <Text style={styles.bannerSubtitle}>
                {currentBanner.subtitle}
              </Text>

              <Pressable onPress={openBanner} style={styles.bannerButton}>
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
                style={[styles.dot, index === bannerIndex && styles.activeDot]}
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              category={category}
              onPress={() => openCategory(category.id)}
            />
          ))}
        </ScrollView>

        {/* Flash Deals */}
        <SectionHeader title="Flash deals" action="Today" />

        <FlatList
          data={flashDeals}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.grid}
          renderItem={({ item, index }) => (
            <AnimatedProductCard index={index} staggerDelay={80}>
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
            </AnimatedProductCard>
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
              numColumns={2}
              keyExtractor={(item) => item!.id}
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
                  onToggleFavorite={() => toggleFavorite(item!.id)}
                />
              )}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      paddingHorizontal: 18,
      paddingBottom: 28,
    },

    // Header
    header: {
      marginTop: 10,
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    headerText: {
      flex: 1,
      paddingRight: 12,
    },

    eyebrow: {
      color: colors.primary,
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 1.1,
    },

    title: {
      color: colors.text,
      fontSize: 29,
      lineHeight: 35,
      fontWeight: "900",
      marginTop: 5,
      letterSpacing: -0.7,
    },

    headerSubtitle: {
      color: colors.muted,
      fontSize: 13,
      marginTop: 5,
    },

    iconButton: {
      width: 48,
      height: 48,
      borderRadius: 17,
      overflow: "hidden",
    },

    notificationGradient: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    // Season
    seasonBadge: {
      alignSelf: "flex-start",
      backgroundColor: colors.surfaceElevated,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      marginTop: 14,
    },

    seasonText: {
      color: colors.text,
      fontWeight: "800",
      fontSize: 13,
    },

    // Banner
    bannerContainer: {
      marginTop: 18,
      position: "relative",
    },

    bannerAnimated: {
      width: "100%",
    },

    banner: {
      minHeight: 205,
      borderRadius: 28,
      padding: 21,
      overflow: "hidden",
      justifyContent: "center",
    },

    bannerLabel: {
      color: "rgba(255,255,255,0.82)",
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },

    bannerTitle: {
      color: WHITE,
      fontSize: 25,
      lineHeight: 31,
      fontWeight: "900",
      marginTop: 12,
      maxWidth: "90%",
    },

    bannerSubtitle: {
      color: "rgba(255,255,255,0.86)",
      marginTop: 9,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "600",
      maxWidth: "90%",
    },

    bannerButton: {
      alignSelf: "flex-start",
      backgroundColor: WHITE,
      paddingHorizontal: 19,
      paddingVertical: 12,
      borderRadius: 16,
      marginTop: 17,
    },

    bannerButtonText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "900",
    },

    dots: {
      position: "absolute",
      right: 18,
      bottom: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: "rgba(255,255,255,0.45)",
    },

    activeDot: {
      width: 21,
      backgroundColor: WHITE,
    },

    // Grids
    grid: {
      gap: 12,
    },

    gridRow: {
      gap: 12,
      marginBottom: 12,
    },
  });
