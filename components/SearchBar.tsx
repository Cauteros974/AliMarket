import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/colors";

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products",
}: SearchBarProps) {
    return(
        <View style={styles.container}>
            <Ionicons name="search-outline" size={20} color={colors.muted} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        minHeight: 48,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    }
})