import React, {useMemo} from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { products } from "../data/products";
import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";
import { getComparisonRows, toComparisonProduct } from "../utils/compareProducts";

export default function CompareScreen() {
    const navigation = useNavigation<any>();

    const {colors} = useSeasonalThemeContext();

    const compareIds = useCompareStore((state) => state.compareIds);
    const removeFromCompare = useCompareStore(
        (state) => state.removeFromCompare
    )

    const clearCompare = useCompareStore((state) => state.clearCompare);

    const selectedProducts = useMemo(() => {
        return compareIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is (typeof products)[number] => Boolean(product))
    },[compareIds] )

    return(
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
        >
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Product comparison
                    </Text>

                    <Text style={{ color: colors.textSecondary }}>
                        Selected: {selectedProducts.length} из 3
                    </Text>
                </View>
            </View>
        </ScrollView>
    )   
}

const styles = StyleSheet.create({

})