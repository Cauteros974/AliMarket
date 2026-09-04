import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

type Props = {
  navigation: any;
};

export default function OrdersScreen({ navigation }: Props) {
  const orders = useShopStore((state) => state.orders);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<Text style={styles.title}>Order history</Text>}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={colors.primary} />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>Your checkout orders will appear here.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("OrderDetails", { orderId: item.id })}
            style={styles.card}
          >
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.orderId}>{item.id}</Text>
                <Text style={styles.muted}>{formatDate(item.createdAt)}</Text>
              </View>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.items}>
              {item.items.map((cartItem) => {
                const product = products.find((entry) => entry.id === cartItem.productId);

                return (
                  <Text key={cartItem.productId} numberOfLines={1} style={styles.itemLine}>
                    {cartItem.quantity}x {product?.title ?? "Product"}
                  </Text>
                );
              })}
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.muted}>
                {item.address.city}, {item.address.street}
              </Text>
              <Text style={styles.total}>{formatPrice(item.total)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 28 },
  title: { color: colors.text, fontSize: 28, fontWeight: "900", marginBottom: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  orderId: { color: colors.text, fontSize: 17, fontWeight: "900" },
  muted: { color: colors.muted, fontWeight: "700" },
  statusBadge: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: { color: colors.primary, fontSize: 12, fontWeight: "900" },
  items: { marginTop: 14, gap: 6 },
  itemLine: { color: colors.text, fontWeight: "800" },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  total: { color: colors.primary, fontSize: 18, fontWeight: "900" },
  emptyState: { minHeight: 420, alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: colors.text, fontSize: 20, fontWeight: "900", marginTop: 12 },
  emptyText: { color: colors.muted, marginTop: 6 },
});