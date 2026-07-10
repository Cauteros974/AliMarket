import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { Category } from "../types/product";

type CategoryChipProps = {
    cato
}

export default function CategoryChip({}) {
    return(
        <Pressable>
            <Ionicons 
                name={category.icon as keyof typeof Ionicons.glyphMap}
                size={18}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({

})