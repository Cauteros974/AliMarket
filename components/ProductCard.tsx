import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef,useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { Product } from "../types/product";
import { formatPrice } from "../utils/format";

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
    const cardTranslateY = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(cardOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),

            Animated.spring(cardTranslateY, {
                toValue: 0,
                tension: 70,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const favoriteScale = useRef(new Animated.Value(1)).current;

    function handleFavorite() {
        Animated.sequence([
            Animated.spring(favoriteScale, {
                toValue: 1.35,
                tension: 180,
                friction: 5,
                useNativeDriver: true,
            }),

            Animated.spring(favoriteScale, {
                toValue: 1,
                tension: 100,
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
        if(adding) {
            return;
        }

        setAdding(true);

        Animated.sequence([
            Animated.spring(cartScale, {
                toValue: 0.92,
                tension: 180,
                friction: 6,
                useNativeDriver: true,
            }),

            Animated.spring(cartScale, {
                toValue: 1.06,
                tension: 180,
                friction: 5,
                useNativeDriver: true,
            }),

            Animated.spring(cartScale, {
                toValue: 1,
                tension: 160,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();

        addToCart(product.id);

        setTimeout(() => {
            setAdding(false);
            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 1200);
        }, 350);
    }

    return(
        <Animated.View
            style={[
                styles.card,
                {
                    opacity: cardOpacity,
                    transform: [
                        {
                            translateY: cardTranslateY,
                        },
                    ],
                },
            ]}
        >
            <Pressable onPress={onPress} style={styles.imageButton}>
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Favorite button */}

        <Pressable
          onPress={handleFavorite}
          style={styles.favoriteButton}
          hitSlop={8}
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: favoriteScale,
                },
              ],
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? colors.primary : colors.text}
            />
          </Animated.View>
        </Pressable>

        {/* Discount badge */}

        {product.oldPrice ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -
              {Math.round(
                ((product.oldPrice - product.price) /
                  product.oldPrice) *
                  100
              )}
              %
            </Text>
          </View>
        ) : null}
      </Pressable>

      {/* --------------------------------------------------
          PRODUCT INFO
      -------------------------------------------------- */}

      <Pressable onPress={onPress} style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {product.title}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons
            name="star"
            size={13}
            color={colors.warning}
          />

          <Text style={styles.rating}>
            {product.rating}
          </Text>

          <Text style={styles.reviews}>
            ({product.reviews.toLocaleString("en-US")})
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {formatPrice(product.price)}
          </Text>

          {product.oldPrice ? (
            <Text style={styles.oldPrice}>
              {formatPrice(product.oldPrice)}
            </Text>
          ) : null}
        </View>
      </Pressable>

      {/* --------------------------------------------------
          ADD TO CART
      -------------------------------------------------- */}

      <Animated.View
        style={{
          transform: [
            {
              scale: cartScale,
            },
          ],
        }}
      >
        <Pressable
          onPress={handleAddToCart}
          disabled={adding}
          style={[
            styles.cartButton,
            added && styles.cartButtonAdded,
          ]}
        >
          <Ionicons
            name={
              added
                ? "checkmark-circle-outline"
                : "bag-add-outline"
            }
            size={18}
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
    )
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 18,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    imageWrap: {
        height: 110,
        borderRadius: 14,
        backgroundColor: colors.surfaceSoft,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    discountBadge: {
        position: "absolute",
        left: 8,
        top: 8,
        backgroundColor: colors.primary,
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    discountText: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "900"
    },
    favoriteButton: {
        position: "absolute",
        right: 8,
        top: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.92)",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "400",
        marginTop: 10,
        minHeight: 38,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
    },
    metaText: {
         color: colors.text,
        fontSize: 12,
        fontWeight: "800",
    },
    soldText: {
        color: colors.muted,
        fontSize: 12,
        marginLeft: 4,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 7,
        marginTop: 8
    },
    price: {
        color: colors.primary,
        fontSize: 17,
        fontWeight: "900"
    },
    oldPrice: {
        color: colors.muted,
        fontSize: 12,
        textDecorationLine: "line-through"
    }

});