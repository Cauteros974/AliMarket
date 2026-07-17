import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import { categories, products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "CategoryDetails">;

export default function CategoryDetailsScreen({navigation, route}: Props) {
    const category = categories.find((item) => item.id === route.params.categoryId);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);

    const categoryProducts = products.filter(
        (item) => item.categoryId === route.params.categoryId
    );

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