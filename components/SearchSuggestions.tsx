import { Pressable, StyleSheet, Text, View } from "react-native";
import { products } from "../data/products";
import { colors } from "../theme/colors";

type SearchSuggestionsProps = {
    query: string;
    onPick: (value: string) => void;
}

export default function SearchSuggestions({query, onPick}: SearchSuggestionsProps){
    const suggestions = Array.from(
        new Set(
            products
            .filter((product) => product.title.toLowerCase().includes(normalized))
            .map((product) => product.title)
        )
    )

    return(
        <View>
            {suggestions.map((suggestion) => (
                <Pressable>
                    <Text>{suggestion}</Text>
                </Pressable>
            ))}
        </View>
    )
}