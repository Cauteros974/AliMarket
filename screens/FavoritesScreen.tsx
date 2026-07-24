import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type FavoritesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function FavoritesScreen({navigation}: FavoritesScreenProps) (
)