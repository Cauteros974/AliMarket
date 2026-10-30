import { Ionicons } from "@expo/vector-icons";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QuantityStepper from "../components/QuantityStepper";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
  navigation: any;
};

export default function CartScreen({ navigation }: Props) {
  const cart = useShopStore((state) => state.cart);
  const couponCode = useShopStore((state) => state.couponCode);
  const appliedCoupon = useShopStore((state) => state.appliedCoupon);
  const setCouponCode = useShopStore((state) => state.setCouponCode);
  const applyCoupon = useShopStore((state) => state.applyCoupon);
  const increaseQuantity = useShopStore((state) => state.increaseQuantity);
  const decreaseQuantity = useShopStore((state) => state.decreaseQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);

  // Find products from the catalog that correspond to the items in the cart.
  const cartProducts = cart
    .map((item) => ({
      item,
      product: products.find(
        (product) => product.id === item.productId
      ),
    }))
    .filter((entry) => entry.product != null);

  const itemCount = cartProducts.reduce(
    (sum, entry) => sum + entry.item.quantity,
    0
  );

  const subtotal = cartProducts.reduce(
    (sum, entry) =>
      sum + (entry.product?.price ?? 0) * entry.item.quantity,
    0
  );

  const shipping =
    appliedCoupon === "FREESHIP" || subtotal === 0 ? 0 : 4.99;

  const discount =
    appliedCoupon === "WELCOME10"
      ? subtotal * 0.1
      : appliedCoupon === "SALE15"
        ? subtotal * 0.15
        : 0;

  const total = Math.max(subtotal + shipping - discount, 0);

  function handleApplyCoupon() {
    const ok = applyCoupon();

    Alert.alert(
      ok ? "Coupon applied" : "Invalid coupon",
      ok
        ? "Discount added to your cart."
        : "Try WELCOME10, SALE15 or FREESHIP."
    );
  }

  function handleCheckout() {
    if (cartProducts.length === 0) {
      Alert.alert("Your cart is empty", "Add a product before checkout.");
      return;
    }

    navigation.navigate("Checkout");
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.content}>
        {/* Heading and number of items */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR SELECTION</Text>
            <Text style={styles.title}>My cart</Text>
          </View>

          <View style={styles.countBadge}>
            <Ionicons
              name="bag-handle-outline"
              size={17}
              color={colors.primary}
            />
            <Text style={styles.countText}>{itemCount}</Text>
          </View>
        </View>

        {cartProducts.length > 0 ? (
          <Text style={styles.subtitle}>
            {itemCount === 1
              ? "1 item waiting for you"
              : `${itemCount} items waiting for you`}
          </Text>
        ) : null}

        {/* The list of products occupies the available screen space */}
        <FlatList
          data={cartProducts}
          keyExtractor={(entry) => entry.item.productId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            cartProducts.length === 0 && styles.emptyList,
          ]}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="bag-handle-outline"
                  size={42}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.emptyTitle}>Your cart is taking a break</Text>

              <Text style={styles.emptyText}>
                Discover something you love and it will appear here.
              </Text>

              <Pressable
                onPress={() => navigation.navigate("MainTabs", { screen: "Catalog" })}
                style={({ pressed }) => [
                  styles.shopButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.shopButtonText}>Explore products</Text>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={colors.white}
                />
              </Pressable>
            </View>
          }
          renderItem={({ item }) => {
            const product = item.product;

            if (!product) return null;

            return (
              <View style={styles.cartItem}>
                {/* Clicking on the image or the name opens the product */}
                <Pressable
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      productId: product.id,
                    })
                  }
                  style={styles.imageButton}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${product.title}`}
                >
                  <Image source={product.image} style={styles.image} />

                  {product.discountLabel ? (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>
                        {product.discountLabel}
                      </Text>
                    </View>
                  ) : null}
                </Pressable>

                <View style={styles.itemInfo}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("ProductDetails", {
                        productId: product.id,
                      })
                    }
                  >
                    <Text numberOfLines={2} style={styles.itemTitle}>
                      {product.title}
                    </Text>
                  </Pressable>

                  <Text style={styles.itemPrice}>
                    {formatPrice(product.price)}
                  </Text>

                  <View style={styles.itemBottom}>
                    <QuantityStepper
                      quantity={item.item.quantity}
                      onMinus={() => decreaseQuantity(product.id)}
                      onPlus={() => increaseQuantity(product.id)}
                    />

                    <Pressable
                      onPress={() => removeFromCart(product.id)}
                      hitSlop={8}
                      style={styles.removeButton}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${product.title} from cart`}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={17}
                        color={colors.danger}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* The summary has been moved into the standard layout rather than an absolute-positioned panel.
            As a result, the list does not get obscured on small screens. */}
        {cartProducts.length > 0 ? (
          <View style={styles.summary}>
            <View style={styles.summaryHeading}>
              <Text style={styles.summaryTitle}>Order summary</Text>

              {appliedCoupon ? (
                <View style={styles.appliedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color={colors.success}
                  />
                  <Text style={styles.appliedBadgeText}>
                    {appliedCoupon}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Promo code */}
            <View style={styles.couponRow}>
              <View style={styles.couponInputWrapper}>
                <Ionicons
                  name="ticket-outline"
                  size={19}
                  color={colors.muted}
                />

                <TextInput
                  value={couponCode}
                  onChangeText={setCouponCode}
                  placeholder="Enter promo code"
                  placeholderTextColor={colors.muted}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleApplyCoupon}
                  style={styles.couponInput}
                  accessibilityLabel="Promo code"
                />
              </View>

              <Pressable
                onPress={handleApplyCoupon}
                style={({ pressed }) => [
                  styles.applyButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>

            {/* Quick access to scanning */}
            <Pressable
              onPress={() => navigation.navigate("QRScanner")}
              style={({ pressed }) => [
                styles.scanButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="scan-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.scanText}>
                Scan coupon QR / barcode
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.primary}
              />
            </Pressable>

            <View style={styles.priceRows}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(subtotal)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text
                  style={[
                    styles.summaryValue,
                    shipping === 0 && styles.freeShipping,
                  ]}
                >
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </Text>
              </View>

              {discount > 0 ? (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount</Text>
                  <Text style={styles.discountValue}>
                    -{formatPrice(discount)}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalCaption}>
                  Taxes included if applicable
                </Text>
              </View>

              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>

            <Pressable
              onPress={handleCheckout}
              style={({ pressed }) => [
                styles.checkoutButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.checkoutText}>Continue to checkout</Text>
              <Ionicons
                name="arrow-forward"
                size={19}
                color={colors.white}
              />
            </Pressable>

            <View style={styles.secureNote}>
              <Ionicons
                name="shield-checkmark-outline"
                size={15}
                color={colors.muted}
              />
              <Text style={styles.secureText}>
                Secure checkout
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 5,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  countBadge: {
    minWidth: 48,
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: colors.surfaceSoft,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  countText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 3,
    marginBottom: 14,
  },

  // Product list
  list: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  itemSeparator: {
    height: 12,
  },
  cartItem: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 11,
    flexDirection: "row",
    gap: 13,
  },
  imageButton: {
    width: 108,
    height: 118,
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: colors.surfaceSoft,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 7,
    left: 7,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  discountBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "900",
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 3,
    minWidth: 0,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
  },
  itemPrice: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 7,
  },
  itemBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 10,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 36,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 280,
  },
  shopButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: colors.primary,
    marginTop: 22,
  },
  shopButtonText: {
    color: colors.white,
    fontWeight: "900",
  },

  // Order summary
  summary: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  summaryHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  appliedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.surfaceSoft,
  },
  appliedBadgeText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "900",
  },
  couponRow: {
    flexDirection: "row",
    gap: 9,
  },
  couponInputWrapper: {
    flex: 1,
    minWidth: 0,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  couponInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  applyButton: {
    minWidth: 72,
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
  },
  scanButton: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 13,
    backgroundColor: colors.surfaceSoft,
    marginTop: 9,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  scanText: {
    color: colors.primary,
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
  },
  priceRows: {
    gap: 9,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  summaryValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },
  freeShipping: {
    color: colors.success,
  },
  discountValue: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "900",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  totalCaption: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 3,
  },
  totalValue: {
    color: colors.primary,
    fontSize: 23,
    fontWeight: "900",
  },
  checkoutButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: 17,
    backgroundColor: colors.primary,
    marginTop: 13,
    paddingHorizontal: 16,
  },
  checkoutText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  secureNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 9,
  },
  secureText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.82,
  },
});