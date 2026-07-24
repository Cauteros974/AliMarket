import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useShopStore } from "../store/useShopStore";

export default function ProfileScreen() {
    const cartCount = useShopStore((state) => 
        state.cart.reduce((sum,item) => sum + item.quantity, 0)
    )
}