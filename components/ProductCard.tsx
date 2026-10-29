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

          {discount != null && product.oldPrice != undefined && (
            <Text style={styles.oldPrice} numberOfLines={1}>
              {formatPrice(product.oldPrice)}
            </Text>
          )}
        </View>

        <View style={styles.deliveryRow}>
          <Ionicons name="cube-outline" size={13} color={colors.muted}/>
           <Text style={styles.deliveryText} numberOfLines={1}>
            {product.delivery}
          </Text>
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
  // Main card
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    shadowColor: "#392064",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  // Image area
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

  // Favourite button
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
    borderColor: colors.border,
    shadowColor: "#392064",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  // Discount badge
  discountBadge: {
    position: "absolute",
    left: 9,
    top: 9,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  discountText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900",
  },

  // Product details
  info: {
    paddingHorizontal: 11,
    paddingTop: 12,
    paddingBottom: 3,
  },

  title: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    minHeight: 36,
  },

  // Rating
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 7,
  },

  rating: {
    color: colors.text,
    fontSize: 10,
    fontWeight: "800",
  },

  reviews: {
    color: colors.muted,
    fontSize: 10,
    flexShrink: 1,
  },

  // Price
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 6,
    rowGap: 2,
    marginTop: 9,
  },

  price: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "900",
  },

  oldPrice: {
    color: colors.muted,
    fontSize: 11,
    textDecorationLine: "line-through",
  },

  // Delivery
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },

  deliveryText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "600",
    flexShrink: 1,
  },

  // Compare button area
  compareRow: {
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 8,
    alignItems: "flex-start",
  },

  // Add-to-cart button
  cartAnimation: {
    paddingHorizontal: 9,
    paddingBottom: 10,
  },

  cartButton: {
    minHeight: 41,
    paddingHorizontal: 8,
    borderRadius: 14,
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