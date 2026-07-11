import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import { categories, products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type HomeScreenProops = {
    navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function HomeScreen({navigation}: HomeScreenProops) {
    const searchQuery = useShopStore((state) => state.searchQuery);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const setSearchQuery = useShopStore((state) => state.setSearchQuery);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    const flashDeals = useMemo(
        () => products.filter((product) => product.oldPrice).slice(0, 4),
        []
    );

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.eyebrow}>AliMarket</Text>
                        <Text style={styles.title}>Find anything you need</Text>
                    </View>

                    <View style={styles.coinsBadge}>
                        <Text style={styles.coinsText}>EU</Text>
                    </View>
                </View>

                <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

                <LinearGradient
                    colors={[colors.primary, "#FF8A3D"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.banner}
                >
                    <View style={styles.bannerTextBlock}>
                        <Text style={styles.bannerLabel}>Summer sale</Text>
                        <Text style={styles.bannerTitle}>Up to 60% off gadgets and home goods</Text>
                        <Text style={styles.bannerSubtitle}>Free delivery on selected items</Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate("ProductDetails", { productId: "p1" })}
                        style={styles.bannerButton}
                    >
                        <Text style={styles.bannerButtonText}>Shop now</Text>
                    </Pressable>
                </LinearGradient>

                <SectionHeader title="Categories" action="See all"/>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                        <CategoryChip
                            key={category.id}
                            category={category}
                            onPress={() => setSearchQuery(category.title)}
                        />
                    ))}
                </ScrollView>

                <SectionHeader title="Flash deals" action="Today"/>

                <FlatList 
                    data={flashDeals}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.gridRow}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            isFavorite={favoriteIds.includes(item.id)}
                            onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
                            onToggleFavorite={() => toggleFavorite(item.id)}
                        />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 18,
        paddingBottom: 28,
    },
    header: {
        marginTop: 8,
        marginBottom: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    eyebrow: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "900",
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginTop: 4,
    },
    coinsBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
    },
    coinText:{
        color: colors.primary,
        fontWeight: "900",
    },
    banner: {
        minHeight: 158,
        borderRadius: 24,
        padding: 18,
        marginTop: 18,
        justifyContent: "space-between"
    },
    bannerTextBlock: {
        maxWidth: "82%",
    },
    bannerLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
        fontWeight: "800",
        textTransform: "uppercase",
    },
})