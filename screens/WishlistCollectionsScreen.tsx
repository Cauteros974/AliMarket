import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function WishlistCollectionsScreen() {
    const [title, setTitle] = useState("")

    const collections = useShopStore((state) => state.wishlistCollections);
    

    return(
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={collections}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                ListEmptyComponent={
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
            />
            
        </SafeAreaView>
    )
}