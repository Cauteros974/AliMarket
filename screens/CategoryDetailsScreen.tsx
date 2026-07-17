import { NativeAppEventEmitter } from "react-native";
import { categories } from "../data/products";
import { useShopStore } from "../store/useShopStore";

export default function CategoryDetailsScreen({navigation, route}: Props) {
    const category = categories.find((item) => item.id === route.params.categoryId);
    const favoriteIds = useShopStore((state) => state.favoriteIds);
    const toggleFavorite = useShopStore((state) => state.toggleFavorite);
}