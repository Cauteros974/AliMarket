import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useShopStore } from "../store/useShopStore";

type Props = {
    productId: string;
}

export default function AnimatedAddToCartButton({
    productId,
}: Props)