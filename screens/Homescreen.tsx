import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, FlatList, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedProductCard from "../components/AnimatedProductCard";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import SectionHeader from "../components/SectionHeader";

import { categories, products } from "../data/products";
import { useSeasonalTheme } from "../store/useSeasonalThemeStore";
import { useShopStore } from "../store/useShopStore";

type Props = {
  navigation: any;
};

type ThemeColors = ReturnType<typeof useSeasonalTheme>["colors"];

const WHITE = "#FFFFFF";

const getBanners = (theme: ThemeColors) => [
  {
    id: "deals",
    label: "SPECIAL OFFERS",
    title: "Little things.\nBig discoveries.",
    subtitle: "Explore your favourites at special prices.",
    button: "Explore deals",
    productId: "p1",
    colors: [theme.primary, "#48209B"] as const,
    icon: "sparkles-outline" as const,
  },
  {
    id: "electronics",
    label: "TECH COLLECTION",
    title: "Upgrade your\neveryday.",
    subtitle: "Discover gadgets made for your routine.",
    button: "Explore tech",
    productId: "p1",
    colors: ["#9255F5", "#5420B8"] as const,
    icon: "headset-outline" as const,
  },
  {
    id: "fashion",
    label: "NEW ARRIVALS",
    title: "A fresh look\nstarts here.",
    subtitle: "Find something that feels like you.",
    button: "Discover more",
    productId: "p5",
    colors: ["#B28AFB", "#7928E8"] as const,
    icon: "shirt-outline" as const,
  },
];

const seasonText: Record<string, string> = {
  autumn: "Autumn edit",
  winter: "Winter collection",
  spring: "Spring refresh",
  summer: "Summer collection",
};

const seasonIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  autumn: "leaf-outline",
  winter: "snow-outline",
  spring: "flower-outline",
  summer: "sunny-outline",
};

export default function HomeScreen({ navigation }: Props) {
  // Global seasonal theme: keep the existing theme engine connected.
  const { colors, season } = useSeasonalTheme();

  const styles = useMemo(() => createStyles(colors), [colors]);
  const banners = useMemo(() => getBanners(colors), [colors]);

  // Global shop state.
  const searchQuery = useShopStore((state) => state.searchQuery);
  const favoriteIds = useShopStore((state) => state.favoriteIds);
  const recentlyViewedIds = useShopStore((state) => state.recentlyViewedIds);

  const setSearchQuery = useShopStore((state) => state.setSearchQuery);
  const setSelectedCategoryId = useShopStore(
    (state) => state.setSelectedCategoryId
  );
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  // Banner state and animations.
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  const bannerOpacity = useRef(new Animated.Value(1)).current;
  const bannerTranslateX = useRef(new Animated.Value(0)).current;

  const currentBanner = banners[bannerIndex] ?? banners[0];

  const changeBanner = useCallback(
    (nextIndex: number) => {
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
      ]).start(({ finished }) => {
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
  );

  // Automatically rotate promotional banners.
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
        ]).start(({ finished }) => {
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
        });

        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length, bannerOpacity, bannerTranslateX]);

  // Discounted products for the home screen.
  const flashDeals = useMemo(
    () => products.filter((product) => product.oldPrice).slice(0, 4),
    []
  );

  // Resolve viewed IDs to products and skip products that no longer exist.
  const recentlyViewed = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is (typeof products)[number] => Boolean(product))
        .slice(0, 4),
    [recentlyViewedIds]
  );

  const openCategory = useCallback(
    (categoryId: string) => {
      setSelectedCategoryId(categoryId);
      navigation.navigate("CategoryDetails", { categoryId });
    },
    [navigation, setSelectedCategoryId]
  );

  const openBanner = useCallback(() => {
    navigation.navigate("ProductDetails", {
      productId: currentBanner.productId,
    });
  }, [currentBanner.productId, navigation]);

  const selectBanner = useCallback(
    (index: number) => {
      changeBanner(index);
    },
    [changeBanner]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <LinearGradient
              colors={[colors.primary, "#5420B8"]}
              style={styles.logo}
            >
              <Ionicons name="bag-handle" size={22} color={WHITE} />
            </LinearGradient>

            <View style={styles.brandText}>
              <Text style={styles.brandName}>AliMarket</Text>
              <Text style={styles.brandCaption}>Discover something new</Text>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={styles.notificationButton}
            accessibilityRole="button"
            accessibilityLabel="Open notifications"
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color={colors.text}
            />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>YOUR DAILY DISCOVERY</Text>
          <Text style={styles.title}>
            Find your{"\n"}
            <Text style={styles.titleAccent}>next favourite.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Great finds, fresh styles and little things you'll love.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products, brands..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onSubmitEditing={() => {
              setSearchFocused(false);
              navigation.navigate("Catalog");
            }}
          />

          <SearchSuggestions
            visible={searchFocused}
            onSelectProduct={(productId) => {
              setSearchFocused(false);
              navigation.navigate("ProductDetails", { productId });
            }}
            onSelectCategory={(categoryId) => {
              setSearchFocused(false);
              openCategory(categoryId);
            }}
          />
        </View>

        {/* Seasonal collection */}
        <Pressable
          onPress={() => navigation.navigate("Catalog")}
          style={styles.seasonBadge}
        >
          <View style={styles.seasonIcon}>
            <Ionicons
              name={seasonIcons[season] ?? "sparkles-outline"}
              size={17}
              color={colors.primary}
            />
          </View>

          <View style={styles.seasonCopy}>
            <Text style={styles.seasonTitle}>
              {seasonText[season] ?? "Seasonal picks"}
            </Text>
            <Text style={styles.seasonSubtitle}>
              A collection picked for the season
            </Text>
          </View>

          <Ionicons
            name="arrow-forward"
            size={18}
            color={colors.primary}
          />
        </Pressable>

        {/* Promotional banner */}
        <View style={styles.bannerSection}>
          <View style={styles.bannerHeading}>
            <Text style={styles.sectionEyebrow}>MADE FOR YOU</Text>
            <Text style={styles.bannerSectionTitle}>Discover more</Text>
          </View>

          <Animated.View
            style={[
              styles.bannerAnimated,
              {
                opacity: bannerOpacity,
                transform: [{ translateX: bannerTranslateX }],
              },
            ]}
          >
            <LinearGradient
              colors={currentBanner.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              {/* Decorative circles */}
              <View style={styles.bannerCircleLarge} />
              <View style={styles.bannerCircleSmall} />

              <View style={styles.bannerTopRow}>
                <View style={styles.bannerLabelPill}>
                  <Ionicons
                    name={currentBanner.icon}
                    size={13}
                    color={WHITE}
                  />
                  <Text style={styles.bannerLabel}>
                    {currentBanner.label}
                  </Text>
                </View>

                <Ionicons
                  name="sparkles"
                  size={24}
                  color="rgba(255,255,255,0.8)"
                />
              </View>

              <Text style={styles.bannerTitle}>
                {currentBanner.title}
              </Text>

              <Text style={styles.bannerSubtitle}>
                {currentBanner.subtitle}
              </Text>

              <Pressable
                onPress={openBanner}
                style={({ pressed }) => [
                  styles.bannerButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.bannerButtonText}>
                  {currentBanner.button}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={colors.primary}
                />
              </Pressable>

              <View style={styles.bannerIndex}>
                <Text style={styles.bannerIndexText}>
                  0{bannerIndex + 1}
                </Text>
                <View style={styles.bannerIndexDivider} />
                <Text style={styles.bannerIndexTotal}>
                  0{banners.length}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          <View style={styles.dots}>
            {banners.map((banner, index) => (
              <Pressable
                key={banner.id}
                onPress={() => selectBanner(index)}
                accessibilityRole="button"
                accessibilityLabel={`Show promotion ${index + 1}`}
                style={[
                  styles.dot,
                  index === bannerIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <SectionHeader
            title="Shop by category"
            action="View all"
            onActionPress={() => navigation.navigate("Catalog")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                category={category}
                onPress={() => openCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Flash deals */}
        <View style={styles.section}>
          <View style={styles.dealsHeading}>
            <View style={styles.dealsIcon}>
              <Ionicons
                name="flash"
                size={19}
                color={colors.primary}
              />
            </View>

            <View style={styles.dealsHeadingText}>
              <Text style={styles.dealsTitle}>Flash deals</Text>
              <Text style={styles.dealsSubtitle}>
                Finds worth a closer look
              </Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate("Catalog")}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>See all</Text>
              <Ionicons
                name="chevron-forward"
                size={15}
                color={colors.primary}
              />
            </Pressable>
          </View>

          {flashDeals.length > 0 ? (
            <FlatList
              data={flashDeals}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.grid}
              renderItem={({ item, index }) => (
                <AnimatedProductCard index={index} staggerDelay={70}>
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
          ) : (
            <View style={styles.emptySection}>
              <Ionicons
                name="pricetag-outline"
                size={24}
                color={colors.muted}
              />
              <Text style={styles.emptySectionText}>
                New deals will appear here soon.
              </Text>
            </View>
          )}
        </View>

        {/* Recently viewed */}
        {recentlyViewed.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Recently viewed"
              action="Explore catalog"
              onActionPress={() => navigation.navigate("Catalog")}
            />

            <FlatList
              data={recentlyViewed}
              numColumns={2}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.grid}
              renderItem={({ item, index }) => (
                <AnimatedProductCard index={index} staggerDelay={50}>
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
          </View>
        )}

        {/* Bottom note */}
        <View style={styles.bottomNote}>
          <Ionicons
            name="heart-outline"
            size={17}
            color={colors.primary}
          />
          <Text style={styles.bottomNoteText}>
            Your next great find is just around the corner.
          </Text>
        </View>
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
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 34,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 28,
    },

    brandRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
    },

    logo: {
      width: 46,
      height: 46,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },

    brandText: {
      gap: 3,
    },

    brandName: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: -0.4,
    },

    brandCaption: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: "600",
    },

    notificationButton: {
      width: 46,
      height: 46,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },

    notificationDot: {
      position: "absolute",
      top: 10,
      right: 11,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      borderWidth: 1.5,
      borderColor: colors.surface,
    },

    // Intro
    intro: {
      marginBottom: 21,
    },

    eyebrow: {
      color: colors.primary,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.8,
    },

    title: {
      color: colors.text,
      fontSize: 34,
      lineHeight: 39,
      fontWeight: "900",
      letterSpacing: -1.2,
      marginTop: 8,
    },

    titleAccent: {
      color: colors.primary,
    },

    subtitle: {
      color: colors.muted,
      fontSize: 13,
      lineHeight: 20,
      fontWeight: "500",
      marginTop: 9,
      maxWidth: 290,
    },

    // Search
    searchContainer: {
      zIndex: 5,
    },

    // Seasonal collection
    seasonBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      marginTop: 17,
      paddingHorizontal: 13,
      paddingVertical: 12,
      borderRadius: 19,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },

    seasonIcon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      backgroundColor: colors.surfaceSoft,
      alignItems: "center",
      justifyContent: "center",
    },

    seasonCopy: {
      flex: 1,
      gap: 3,
    },

    seasonTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "900",
    },

    seasonSubtitle: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: "500",
    },

    // Banner
    bannerSection: {
      marginTop: 29,
    },

    bannerHeading: {
      marginBottom: 13,
    },

    sectionEyebrow: {
      color: colors.primary,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.8,
    },

    bannerSectionTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: -0.6,
      marginTop: 4,
    },

    bannerAnimated: {
      width: "100%",
    },

    banner: {
      minHeight: 258,
      borderRadius: 28,
      paddingHorizontal: 21,
      paddingTop: 20,
      paddingBottom: 22,
      overflow: "hidden",
    },

    bannerCircleLarge: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      right: -65,
      top: 35,
      backgroundColor: "rgba(255,255,255,0.07)",
    },

    bannerCircleSmall: {
      position: "absolute",
      width: 112,
      height: 112,
      borderRadius: 56,
      right: 20,
      top: -45,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.15)",
    },

    bannerTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    bannerLabelPill: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "rgba(255,255,255,0.15)",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 999,
    },

    bannerLabel: {
      color: WHITE,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.1,
    },

    bannerTitle: {
      color: WHITE,
      fontSize: 29,
      lineHeight: 34,
      fontWeight: "900",
      letterSpacing: -0.7,
      marginTop: 21,
      maxWidth: "92%",
    },

    bannerSubtitle: {
      color: "rgba(255,255,255,0.85)",
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "500",
      marginTop: 9,
      maxWidth: "88%",
    },

    bannerButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      backgroundColor: WHITE,
      paddingHorizontal: 15,
      minHeight: 42,
      borderRadius: 14,
      marginTop: 18,
    },

    bannerButtonText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "900",
    },

    bannerIndex: {
      position: "absolute",
      right: 19,
      bottom: 22,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },

    bannerIndexText: {
      color: WHITE,
      fontSize: 11,
      fontWeight: "900",
    },

    bannerIndexDivider: {
      height: 1,
      width: 15,
      backgroundColor: "rgba(255,255,255,0.6)",
    },

    bannerIndexTotal: {
      color: "rgba(255,255,255,0.65)",
      fontSize: 11,
      fontWeight: "700",
    },

    dots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      marginTop: 14,
    },

    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.border,
    },

    activeDot: {
      width: 23,
      backgroundColor: colors.primary,
    },

    // Sections
    section: {
      marginTop: 29,
    },

    categoriesList: {
      paddingTop: 3,
      paddingBottom: 4,
    },

    // Flash deals
    dealsHeading: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      gap: 11,
    },

    dealsIcon: {
      width: 42,
      height: 42,
      borderRadius: 15,
      backgroundColor: colors.surfaceSoft,
      alignItems: "center",
      justifyContent: "center",
    },

    dealsHeadingText: {
      flex: 1,
      gap: 3,
    },

    dealsTitle: {
      color: colors.text,
      fontSize: 19,
      fontWeight: "900",
      letterSpacing: -0.4,
    },

    dealsSubtitle: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: "500",
    },

    viewAllButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      paddingVertical: 8,
      paddingLeft: 8,
    },

    viewAllText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "900",
    },

    grid: {
      gap: 12,
    },

    gridRow: {
      gap: 12,
      marginBottom: 12,
      alignItems: "flex-start",
    },

    emptySection: {
      minHeight: 100,
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: 18,
    },

    emptySectionText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "600",
      textAlign: "center",
    },

    // Bottom note
    bottomNote: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 30,
      paddingVertical: 15,
      paddingHorizontal: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },

    bottomNoteText: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: "600",
      textAlign: "center",
    },

    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
  });