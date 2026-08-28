import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function WishlistCollectionsScreen() {
    const collections = useShopStore((state) => state.wishlistCollections);

    return(
        <SafeAreaView>
            <FlatList
                data={collections}
            />
            
        </SafeAreaView>
    )
}