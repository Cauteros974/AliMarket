import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SEASON_EMOJIS,
  SEASON_LABELS,
  type SeasonMode,
} from "../theme/seasonalTheme";

import { useSeasonalTheme } from "../store/useSeasonalThemeStore";

const OPTIONS: {
  value: SeasonMode;
  label: string;
  emoji: string;
}[] = [
  { value: "auto", label: "Авто", emoji: "🗓️" },
  { value: "spring", label: "Весна", emoji: "🌱" },
  { value: "summer", label: "Лето", emoji: "☀️" },
  { value: "autumn", label: "Осень", emoji: "🍂" },
  { value: "winter", label: "Зима", emoji: "❄️" },
];

export default function SeasonalThemeSettings() {
    const { mode, season, colors, setMode } = useSeasonalTheme();

    return(
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>
                Application design
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
                Choose your favorite palette or let AliMarket 
                change the design automatically with the seasons.
            </Text>

            <View style={styles.options}>
                {OPTIONS.map((option) => {
                    const selected = mode === option.value;

                    return(
                        <Pressable>
                            <Text style={styles.emoji}>{option.emoji}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})