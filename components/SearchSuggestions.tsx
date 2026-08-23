import { Pressable, StyleSheet, Text, View } from "react-native";
import { products } from "../data/products";
import { colors } from "../theme/colors";

export default function SearchSuggestions(){
    const suggestions = Array.from(
        new(
            products
            .filter((product) => product.title.toLowerCase().includes(normalized))
            .map((product) => product.title)
        )
    )

    return(
        <View>

        </View>
    )
}