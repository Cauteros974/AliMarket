import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SEASON_EMOJIS,
  SEASON_LABELS,
  type SeasonMode,
} from "../theme/seasonalTheme";

import { useSeasonalTheme } from "../store/useSeasonalThemeStore";

export default function SeasonalThemeSettings() {
    const {mode, setMode, colors} = useSeasonalTheme();

    return(
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>
                Application design
            </Text>

            <Text>
                Choose your favorite palette or let AliMarket 
                change the design automatically with the seasons.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

})