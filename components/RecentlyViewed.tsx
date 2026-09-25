import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

type Props = {
    onProductPress: (productId: string) => void;
}

export default function addRecentlyViewed({onProductPress} : Props) {
    const recentlyViewedIds = useShopStore(
        (state) => state.recentlyViewedIds
    );

    const recentlyViewedProducts = recentlyViewedIds
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);

    if(recentlyViewedProducts) {
        return null;
    }
}