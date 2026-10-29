import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef,useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format";
import CompareButton from "./CompareButton";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    onPress: () => void;
    onToggleFavorite: () => void;
};

export default function ProductCard({
    product,
    isFavorite,
    onPress,
    onToggleFavorite,
}: ProductCardProps) {

    const addToCart = useShopStore((state) => state.addToCart);

    const cardOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslateY = useRef(new Animated.Value(14)).current;

    useEffect(() => {
      const animation = Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(cardTranslateY, {
          toValue: 0,
          tension: 65,
          friction: 9,
          useNativeDriver: true,
        }),
      ]);
      
      animation.start();
      
      return () => animation.stop();
    }, [cardOpacity, cardTranslateY]);


    const favoriteScale = useRef(new Animated.Value(1)).current;    

    function handleFavorite() {
      Animated.sequence([
        Animated.spring(favoriteScale, {
          toValue: 1.25,
          tension: 180,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(favoriteScale, {
          toValue: 1,
          tension: 120,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
      
      onToggleFavorite();
    }
    
    const cartScale = useRef(new Animated.Value(1)).current;
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    function handleAddToCart() {
        if(adding) return;

        setAdding(true);
        setAdded(false);

        Animated.sequence([
          Animated.spring(cartScale, {
            toValue: 0.96,
            useNativeDriver: true,
          }),

          Animated.spring(cartScale, {
            toValue: 1.03,
            useNativeDriver: true,
          }),

          Animated.spring(cartScale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();

        addToCart(product.id);

        // Save the current add confirmation logic
        setTimeout(() => {
            setAdding(false);
            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 1200);
        }, 350);
    }

    const discount =
      product.oldPrice && product.oldPrice > product.price
        ? Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
          )
        : null;

    return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: cardOpacity,
          transform: [{ translateY: cardTranslateY }],
        },
      ]}
    >
      {/* Product image */}
      <View style={styles.imageContainer}>
        <Pressable
          onPress={onPress}
          style={styles.imagePressable}
          accessibilityRole="button"
          accessibilityLabel={`Open product ${product.title}`}
        >
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="cover"
          />
        </Pressable>

        {/* Favorites */}
        <Pressable
          onPress={handleFavorite}
          style={styles.favoriteButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Animated.View
            style={{ transform: [{ scale: favoriteScale }] }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={19}
              color={isFavorite ? colors.primary : colors.text}
            />
          </Animated.View>
        </Pressable>

        {/* Discount */}
        {discount !== null && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>−{discount}%</Text>
          </View>
        )}
      </View>

      {/* Name, rating, and price */}
      <Pressable
        onPress={onPress}
        style={styles.info}
        accessibilityRole="button"
      >
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color={colors.warning} />

            <Text style={styles.rating}>
              {product.rating.toFixed(1)}
            </Text>

            <Text style={styles.reviews}>
              ({product.reviews.toLocaleString("en-US")}) reviews
            </Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price} numberOfLines={1}>
            {formatPrice(product.price)}
          </Text>

          {product.oldPrice !== undefined &&
            product.oldPrice > product.price && (
              <Text style={styles.oldPrice} numberOfLines={1}>
                {formatPrice(product.oldPrice)}
              </Text>
            )}
        </View>
      </Pressable>

      {/* Product comparison */}
      <View style={styles.compareRow}>
        <CompareButton productId={product.id} />
      </View>

      {/* Adding to cart */}
      <Animated.View
        style={[
          styles.cartAnimation,
          { transform: [{ scale: cartScale }] },
        ]}
      >
        <Pressable
          onPress={handleAddToCart}
          disabled={adding}
          style={({ pressed }) => [
            styles.cartButton,
            added && styles.cartButtonAdded,
            pressed && !adding && styles.cartButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.title} to cart`}
        >
          <Ionicons
            name={
              added
                ? "checkmark-circle-outline"
                : "bag-add-outline"
            }
            size={17}
            color={colors.white}
          />

          <Text style={styles.cartButtonText}>
            {adding
              ? "Adding..."
              : added
                ? "Added"
                : "Add to cart"}
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Card
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",

    shadowColor: "#35205F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.045,
    shadowRadius: 10,
    elevation: 2,
  },

  // Image
  imageContainer: {
    position: "relative",
    height: 165,
    backgroundColor: colors.surfaceSoft,
  },

  imagePressable: {
    width: "100%",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  // Favorite button
  favoriteButton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(237,232,245,0.9)",
  },

  // Discount badge
  discountBadge: {
    position: "absolute",
    left: 9,
    bottom: 9,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  discountText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
  },

  // Product information
  info: {
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 4,
  },

  title: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    minHeight: 36,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 7,
  },

  rating: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },

  reviews: {
    color: colors.muted,
    fontSize: 10,
  },

  // Price
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 6,
    rowGap: 2,
    marginTop: 8,
  },

  price: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "800",
  },

  oldPrice: {
    color: colors.muted,
    fontSize: 11,
    textDecorationLine: "line-through",
  },

  // Comparison
  compareRow: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 8,
    alignItems: "flex-start",
  },

  // Cart
  cartAnimation: {
    paddingHorizontal: 9,
    paddingBottom: 10,
  },

  cartButton: {
    minHeight: 39,
    paddingHorizontal: 8,
    borderRadius: 13,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  cartButtonPressed: {
    backgroundColor: colors.primaryDark,
  },

  cartButtonAdded: {
    backgroundColor: colors.success,
  },

  cartButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
});