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

  const cartProducts = cart
    .map((item) => ({
      item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((entry) => entry.product);

  const subtotal = cartProducts.reduce(
    (sum, entry) => sum + (entry.product?.price ?? 0) * entry.item.quantity,
    0
  );

  const shipping = appliedCoupon === "FREESHIP" || subtotal === 0 ? 0 : 4.99;

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Cart</Text>

        <FlatList
          data={cartProducts}
          keyExtractor={(entry) => entry.item.productId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="bag-handle-outline" size={46} color={colors.primary} />
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptyText}>Add something from the catalog to start.</Text>
            </View>
          }
          renderItem={({ item }) => {
            if (!item.product) return null;

            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("ProductDetails", { productId: item.product!.id })
                }
                style={styles.cartItem}
              >
                <Image source={item.product.image} style={styles.image} />

                <View style={styles.itemInfo}>
                  <Text numberOfLines={2} style={styles.itemTitle}>
                    {item.product.title}
                  </Text>

                  <Text style={styles.itemPrice}>{formatPrice(item.product.price)}</Text>

                  <View style={styles.itemFooter}>
                    <QuantityStepper
                      quantity={item.item.quantity}
                      onMinus={() => decreaseQuantity(item.product!.id)}
                      onPlus={() => increaseQuantity(item.product!.id)}
                    />

                    <Pressable onPress={() => removeFromCart(item.product!.id)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>

      {cartProducts.length > 0 ? (
        <View style={styles.summary}>
          <View style={styles.couponRow}>
            <TextInput
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="WELCOME10"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              style={styles.couponInput}
            />

            <Pressable onPress={handleApplyCoupon} style={styles.applyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </Pressable>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>{formatPrice(shipping)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.summaryValue}>-{formatPrice(discount)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Checkout")} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Go to checkout</Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 8 },
  title: { color: colors.text, fontSize: 28, fontWeight: "900", marginBottom: 16 },
  list: { paddingBottom: 330, gap: 12 },
  cartItem: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    flexDirection: "row",
    gap: 12,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
  },
  itemInfo: { flex: 1 },
  itemTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  itemPrice: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 6,
  },
  itemFooter: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeText: { color: colors.danger, fontWeight: "800" },
  summary: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  couponRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  couponInput: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    color: colors.text,
    fontWeight: "800",
  },
  applyButton: {
    minHeight: 46,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: { color: colors.white, fontWeight: "900" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  summaryLabel: { color: colors.muted, fontWeight: "700" },
  summaryValue: { color: colors.text, fontWeight: "900" },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  totalLabel: { color: colors.text, fontSize: 18, fontWeight: "900" },
  totalValue: { color: colors.primary, fontSize: 20, fontWeight: "900" },
  checkoutButton: {
    height: 54,
    maxWidth: 200,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  checkoutText: { color: colors.white, fontSize: 16, fontWeight: "900" },
  emptyState: {
    minHeight: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 12,
  },
  emptyText: { color: colors.muted, marginTop: 6 },
});