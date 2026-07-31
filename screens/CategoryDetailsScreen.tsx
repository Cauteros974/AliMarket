import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "CategoryDetails">;

export default function CategoryDetailsScreen({ navigation, route }: Props) {
    const category = categories.find((item) => item.id === route.params.categoryId);
}  