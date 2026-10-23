import { Pressable, Text } from "react-native";
import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

type Props = {
    productId: string;
}

export default function CompareButton({productId}: Props) {
    const isCompared = useCompareStore((state) =>
        state.compareIds.includes(productId)
    );

    const compareCount = useCompareStore(
        (state) => state.compareIds.length
    );

     const isLimitReached = compareCount >= 3 && !isCompared;

    return(
        <Pressable
            accessibilityLabel="button"
            accessibilityState={{ selected: isCompared, disabled: isLimitReached }}
        >
            <Text>
                {isCompared}
            </Text>
        </Pressable>
    )
}