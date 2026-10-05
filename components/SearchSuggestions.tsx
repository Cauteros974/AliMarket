import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { products, categories } from "../data/products";
import { colors } from "../theme/colors";
import { useShopStore } from "../store/useShopStore";


type SearchSuggestionsProps = {
    query: string;
    onPick: (value: string) => void;
}

type Props = { 
    visible: boolean;
    onSelectProduct?: (productId: string) => void;
    onSelectCategory?: (categoryId: string) => void;
}

export default function SearchSuggestions({query, onPick}: SearchSuggestionsProps){
    const normalized = query.trim().toLowerCase();

    if (normalized.length < 2) return null;
    
    const suggestions = Array.from(
        new Set(
            products
            .filter((product) => product.title.toLowerCase().includes(normalized))
            .map((product) => product.title)
        )
    )

    return(
        <View style={styles.container}>
            {suggestions.map((suggestion) => (
                <Pressable key={suggestion} onPress={() => onPick(suggestion)} style={styles.item}>
                    <Text numberOfLines={1} style={styles.text}>
                        {suggestion}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        marginTop: 8,
        overflow: "hidden",
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    text: {
        color: colors.text,
        fontWeight: "800"
    }
})