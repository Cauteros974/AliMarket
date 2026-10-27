import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";

export function OpenCompareButton() {
    const navigation = useNavigation<any>();

    const { colors } = useSeasonalThemeContext();

    const count = useCompareStore((state) => state.compareIds.length);

    return(
        <Pressable
            onPress={() => navigation.navigate("Compare")}
            style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: colors.primary,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
            }}
        >
            <Text style={{ color: colors.onPrimary, fontWeight: "700" }}>
                ⇄ Comparison {count > 0 ? `(${count})` : ""}
            </Text>
        </Pressable>
    );
}
