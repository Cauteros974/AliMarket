import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type AllFiltersModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AllFiltersModal({visible, onClose}: AllFiltersModalProps) {
    const filters = useShopStore((state) => state.filters);
    const updateFilters = useShopStore((state) => state.updateFilters);
    const resetFilters = useShopStore((state) => state.resetFilters);

    return(
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <View style={styles.sheet}>
                    <View style={styles.header}>
                        <Text style={styles.title}>All filters</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.close}>Close</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.label}>Price range</Text>
                    
                    <View>
                        <TextInput
                            value={filters.minPrice}
                            onChangeText={(value) => updateFilters({ minPrice: value })}
                            keyboardType="numeric"
                            placeholder="Min €"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <TextInput
                            value={filters.maxPrice}
                            onChangeText={(value) => updateFilters({ maxPrice: value })}
                            keyboardType="numeric"
                            placeholder="Max €"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />
                    </View>

                    <Pressable
                        onPress={() => updateFilters({ freeDeliveryOnly: !filters.freeDeliveryOnly })}
                        style={[styles.option, filters.freeDeliveryOnly && styles.activeOption]}
                    >
                        <Text style={[styles.optionText, filters.freeDeliveryOnly && styles.activeOptionText]}>
                            Free delivery only
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => updateFilters({ discountsOnly: !filters.discountsOnly })}
                        style={[styles.option, filters.discountsOnly && styles.activeOption]}
                    >
                        <Text style={[styles.optionText, filters.discountsOnly && styles.activeOptionText]}>
                            Products with discounts
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => updateFilters({ minRating: filters.minRating === 4.5 ? 0 : 4.5 })}
                        style={[styles.option, filters.minRating === 4.5 && styles.activeOption]}
                    >
                        <Text style={[styles.optionText, filters.minRating === 4.5 && styles.activeOptionText]}>
                            Rating 4.5+
                        </Text>
                    </Pressable>

                    <View style={styles.actions}>
                        <Pressable onPress={resetFilters} style={styles.secondaryButton}>
                            <Text style={styles.secondaryText}>Reset</Text>
                        </Pressable>

                        <Pressable onPress={onClose} style={styles.primarButton}>
                            <Text style={styles.primaryText}>Show results</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.28)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: 18
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: "900",
    },
    close: {
        color: colors.primary,
        fontWeight: "900",
    },
    label: {
        color: colors.text,
        fontWeight: "900",
        marginBottom: 10,
    },
    priceRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        minHeight: 48,
        borderRadius: 14,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 12,
        color: colors.text,
        fontWeight: "800",
    },
    option: {
        minHeight: 50,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 14,
        justifyContent: "center",
        marginBottom: 10,
    },
    activeOption: {
        borderColor: colors.primary,
        backgroundColor: colors.surfaceSoft
    },
    optionText: {
        color: colors.text,
        fontWeight: "900"
    },
    activeOptionText: {
        color: colors.primary
    },
    actions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 8,
    },
    secondaryButton: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryText: {
        color: colors.text,
        fontWeight: "900"
    }
})