import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatPrice } from "../utils/format";

export default function addRecentlyViewed({}) {
    const recentlyViewedIds = useShopStore(
        (state) => state.recentlyViewedIds
    );
}