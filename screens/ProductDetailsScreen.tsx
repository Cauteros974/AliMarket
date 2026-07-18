import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { products } from "../data/products";
import { useShopStore } from "../store/useShopStore";

type ProductDetailsProps = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({route}: ProductDetailsProps) {
    const product = products.find((item) => item.id === route.params.productId);

    const addToCard = useShopStore((state) => state.addToCart) 
}