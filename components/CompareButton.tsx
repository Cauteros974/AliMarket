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

    return(
        <Pressable>
            <Text>
                {isCompared}
            </Text>
        </Pressable>
    )
}