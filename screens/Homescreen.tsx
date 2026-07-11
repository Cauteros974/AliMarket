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
                    <View>
                        <Text style={styles.bannerLabel}>Summer sale</Text>
                        <Text style={styles.bannerTitle}>Up to 60% off gadgets and home goods</Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})