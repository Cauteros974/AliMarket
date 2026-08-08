import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate, formatPrice } from "../utils/format";

export default function OrdersScreen(){
    const orders = useShopStore((state) => state.orders);

    return(
        <SafeAreaView>
            <FlatList 
                data={orders}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}