import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "CategoryDetails">;

export default function CategoryDetailsScreen({ navigation, route }: Props) {
    const category = categories.find((item) => item.id === route.params.categoryId);

    return(
        <SafeAreaView>
            <FlatList 
                data={categoryProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}

            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gridRow: {
        gap: 12,
        marginBottom: 12
    }
})