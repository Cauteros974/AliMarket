import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

export function OpenCompareButton() {
    return(
        <Pressable>
            <Text>
                Comparison
            </Text>
        </Pressable>
    )
}