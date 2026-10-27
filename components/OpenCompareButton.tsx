import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

export function OpenCompareButton() {
    const { colors } = useSeasonalThemeContext();
    return(
        <Pressable>
            <Text style={{ color: colors.onPrimary, fontWeight: "700" }}>
                Comparison
            </Text>
        </Pressable>
    )
}
