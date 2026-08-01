import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import { categories, products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  const searchQuery = useShopStore((state) => state.searchQuery);
  const favoriteIds = useShopStore((state) => state.favoriteIds);
  const setSearchQuery = useShopStore((state) => state.setSearchQuery);
  const setSelectedCategoryId = useShopStore((state) => state.setSelectedCategoryId);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  const flashDeals = useMemo(
    () => products.filter((item) => item.oldPrice).slice(0, 4),
    []
  );

  function openCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);
    navigation.navigate("CategoryDetails", { categoryId });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>AliMarket</Text>
            <Text style={styles.title}>Find anything you need</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Notifications")} style={styles.iconButton}>
            <Text style={styles.iconText}>!</Text>
          </Pressable>
        </View>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <LinearGradient
          colors={[colors.primary, "#FF8A3D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Text style={styles.bannerLabel}>Summer sale</Text>
          <Text style={styles.bannerTitle}>Up to 60% off gadgets and home goods</Text>
          <Text style={styles.bannerSubtitle}>Use coupon WELCOME10 on checkout</Text>

          <Pressable
            onPress={() => navigation.navigate("ProductDetails", { productId: "p1" })}
            style={styles.bannerButton}
          >
            <Text style={styles.bannerButtonText}>Shop now</Text>
          </Pressable>
        </LinearGradient>

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

        <SectionHeader title="Flash deals" action="Today" />

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
              onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingBottom: 28 },
  header: {
    marginTop: 8,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: { color: colors.primary, fontSize: 14, fontWeight: "900" },
  title: { color: colors.text, fontSize: 28, fontWeight: "900", marginTop: 4 },
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
  iconText: { color: colors.primary, fontSize: 20, fontWeight: "900" },
  banner: { minHeight: 170, borderRadius: 24, padding: 18, marginTop: 18 },
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
  bannerButtonText: { color: colors.primary, fontWeight: "900" },
  grid: { gap: 12 },
  gridRow: { gap: 12, marginBottom: 12 },
});