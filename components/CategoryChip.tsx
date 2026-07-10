import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { Category } from "../types/product";

type CategoryChipProps = {
    category: string;
    selected: string;
    onPress: () => void;
}

export default function CategoryChip({category, selected, onPress}: CategoryChipProps) {
    return(
        <Pressable onPress={onPress} style={[styles.container, selected && styles.selected]}>
            <Ionicons 
                name={category.icon as keyof typeof Ionicons.glyphMap}
                size={18}
                color={selected ? colors.white : colors.primary}
            />
            <Text style={[styles.title, selected && styles.selectedTitle]}>
                {category}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({

})