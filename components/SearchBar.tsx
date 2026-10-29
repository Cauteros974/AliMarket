import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/colors";

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products",
  onFocus, 
  onBlur
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Search products"
      />

      {value.length > 0 &&  (
        <Pressable>
          <Ionicons 
            name="close-circle"
            size={10}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
});
