import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function WishlistCollectionsScreen() {
  const [title, setTitle] = useState("");

  const collections = useShopStore((state) => state.wishlistCollections);
  const createWishlistCollection = useShopStore(
    (state) => state.createWishlistCollection
  );

  function submit() {
    createWishlistCollection(title);
    setTitle("");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Wishlist collections</Text>

            <View style={styles.createRow}>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="New collection"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />

              <Pressable onPress={submit} style={styles.addButton}>
                <Text style={styles.addText}>Add</Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No collections yet</Text>
            <Text style={styles.emptyText}>Create your first wishlist collection.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const collectionProducts = products.filter((product) =>
            item.productIds.includes(product.id)
          );

          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.count}>{item.productIds.length} products</Text>

              {collectionProducts.length === 0 ? (
                <Text style={styles.emptyCollectionText}>
                  Products added from product details will appear here.
                </Text>
              ) : (
                collectionProducts.slice(0, 3).map((product) => (
                  <Text key={product.id} numberOfLines={1} style={styles.productLine}>
                    {product.title}
                  </Text>
                ))
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        padding: 18,
        paddingBottom: 28,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginBottom: 16,
    },
    createRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        minHeight: 50,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 14,
        color: colors.text,
        fontWeight: "800",
    },
})