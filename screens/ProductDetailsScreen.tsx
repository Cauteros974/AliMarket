import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductShareSheet from "../components/ProductShareSheet";
import { products } from "../data/products";
import type { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({
  route,
  navigation,
}: Props) {
  const product = products.find(
    (item) => item.id === route.params.productId
  );

  const addToCart = useShopStore((state) => state.addToCart);
  const favoriteIds = useShopStore((state) => state.favoriteIds);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);
  const addRecentlyViewed = useShopStore((state) => state.addRecentlyViewed);
  const showToast = useShopStore((state) => state.showToast);
  const [shareVisible, setShareVisible] = useState(false);

  // Hooks must be called before any conditional return.
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
    }
  }, [product?.id, addRecentlyViewed]);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="search-outline"
              size={30}
              color={colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>Product not found</Text>
          <Text style={styles.emptyDescription}>
            This product may no longer be available.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
            style={styles.backToCatalogButton}
          >
            <Text style={styles.backToCatalogText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favoriteIds.includes(product.id);

  function handleAddToCart() {
    addToCart(product.id);
    showToast("Added to cart", "success");
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>

        <Text style={styles.topBarTitle}>Product details</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share product"
          onPress={() => setShareVisible(true)}
          style={styles.roundButton}
          hitSlop={8}
        >
          <Ionicons
            name="share-social-outline"
            size={21}
            color={colors.text}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageWrap}>
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel={product.title}
          />

          {product.discountLabel ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {product.discountLabel}
              </Text>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            onPress={() => toggleFavorite(product.id)}
            style={styles.imageFavoriteButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={21}
              color={isFavorite ? colors.danger : colors.text}
            />
          </Pressable>
        </View>

        <View style={styles.info}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>

            {product.oldPrice ? (
              <Text style={styles.oldPrice}>
                {formatPrice(product.oldPrice)}
              </Text>
            ) : null}
          </View>

          <Text style={styles.productTitle}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.mutedText}>
              {product.reviews.toLocaleString("en-US")} reviews
            </Text>
            <View style={styles.ratingDot} />
            <Text style={styles.mutedText}>
              {product.sold.toLocaleString("en-US")} sold
            </Text>
          </View>

          <View style={styles.deliveryBox}>
            <View style={styles.deliveryIcon}>
              <Ionicons
                name="airplane-outline"
                size={21}
                color={colors.primary}
              />
            </View>

            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryTitle}>Delivery</Text>
              <Text style={styles.deliveryText}>{product.delivery}</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.muted}
            />
          </View>

          {product.colors.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Available colors</Text>

              <View style={styles.colorRow}>
                {product.colors.map((color, index) => (
                  <View
                    key={`${color}-${index}`}
                    style={[
                      styles.colorDot,
                      { backgroundColor: color },
                    ]}
                  />
                ))}
              </View>
            </>
          )}

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Customer reviews</Text>
            <View style={styles.reviewCountBadge}>
              <Text style={styles.reviewCountText}>
                {product.reviews.toLocaleString("en-US")}
              </Text>
            </View>
          </View>

          <Text style={styles.reviewsHint}>
            Ratings and reviews for this product.
          </Text>

          <View style={styles.shareActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShareVisible(true)}
              style={styles.shareButton}
            >
              <Ionicons
                name="qr-code-outline"
                size={19}
                color={colors.primary}
              />
              <Text style={styles.shareButtonText}>QR code / Share</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceLabel}>Total price</Text>
          <Text style={styles.footerPriceValue}>
            {formatPrice(product.price)}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add product to cart"
          onPress={handleAddToCart}
          style={styles.primaryButton}
        >
          <Ionicons name="cart-outline" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>Add to cart</Text>
        </Pressable>
      </View>

      <ProductShareSheet
        visible={shareVisible}
        product={product}
        onClose={() => setShareVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    minHeight: 58,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBarTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  roundButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingBottom: 125,
  },
  imageWrap: {
    width: "auto",
    height: 320,
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 25,
    backgroundColor: colors.surfaceSoft,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  discountText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900",
  },
  imageFavoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    paddingHorizontal: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  price: {
    color: colors.primary,
    fontSize: 29,
    fontWeight: "900",
  },
  oldPrice: {
    color: colors.muted,
    fontSize: 15,
    textDecorationLine: "line-through",
  },
  productTitle: {
    color: colors.text,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "900",
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 12,
  },
  ratingText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 13,
  },
  mutedText: {
    color: colors.muted,
    fontSize: 12,
  },
  ratingDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.muted,
  },
  deliveryBox: {
    marginTop: 22,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  deliveryIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryContent: {
    flex: 1,
  },
  deliveryTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 13,
  },
  deliveryText: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 24,
    marginBottom: 10,
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  colorDot: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.white,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewCountBadge: {
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  reviewCountText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
  },
  reviewsHint: {
    color: colors.muted,
    fontSize: 12,
  },
  shareActions: {
    marginTop: 18,
  },
  shareButton: {
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  shareButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  footerPrice: {
    flexShrink: 1,
  },
  footerPriceLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "600",
  },
  footerPriceValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 3,
  },
  primaryButton: {
    flex: 1,
    minHeight: 51,
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 23,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyDescription: {
    color: colors.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
  backToCatalogButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  backToCatalogText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
});