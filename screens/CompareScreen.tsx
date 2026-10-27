import React, {useMemo} from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { products } from "../data/products";
import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";
import { getComparisonRows, toComparisonProduct } from "../utils/compareProducts";

export default function CompareScreen() {
    return(
        <ScrollView>
            <View>
                <Text>
                    Product comparison
                </Text>
            </View>
        </ScrollView>
    )   
}