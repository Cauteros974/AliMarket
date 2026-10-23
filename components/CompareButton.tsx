import { Pressable, Text, StyleSheet } from "react-native";
import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

type Props = {
    productId: string;
}

export default function CompareButton({productId}: Props) {
    const isCompared = useCompareStore((state) =>
        state.compareIds.includes(productId)
    );

    const toggleCompare = useCompareStore(
        (state) => state.toggleCompare
    )

    const {colors} = useSeasonalThemeContext();

    const compareCount = useCompareStore(
        (state) => state.compareIds.length
    );

     const isLimitReached = compareCount >= 3 && !isCompared;

    return(
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={
                isCompared ? "Remove from comparison": "Add to comparison"
            }
            accessibilityState={{ selected: isCompared, disabled: isLimitReached }}
            disabled={isLimitReached}
            onPress={() => toggleCompare(productId)}
        >
            <Text
                style={[
                    styles.label,
                    { color: isCompared ? colors.onPrimary : colors.primary },
                ]}
            >
                {isCompared}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        fontWeight: "600",
    }
})