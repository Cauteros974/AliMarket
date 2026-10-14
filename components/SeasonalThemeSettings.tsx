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
                            
                            <Text
                                style={[
                                    styles.optionText,
                                    {
                                        color: selected
                                        ? colors.onPrimary
                                        : colors.text,
                                    },
                                ]}
                            >
                                {option.label}
                            </Text>

                            {selected && (
                                <Text
                                    style={[
                                        styles.checkmark,
                                        { color: colors.onPrimary },
                                    ]}
                                >
                                    ✓
                                </Text>
                            )}
                        </Pressable>
                    );
                })}
            </View>

            <View
                style={[
                    styles.preview,
                    {
                        backgroundColor: colors.surfaceElevated,
                        borderColor: colors.border,
                    }
                ]}
            >
                <View
                    style={[
                        styles.previewDot,
                        { backgroundColor: colors.primary },
                    ]}
                />

                <View style={styles.previewContent}>
                    <Text style={[styles.previewTitle, { color: colors.text }]}>
                        {SEASON_EMOJIS[season]} Current topic:{" "}
                        {SEASON_LABELS[season]}
                    </Text>

                    <Text
                        style={[
                            styles.previewDescription,
                            { color: colors.textSecondary },
                        ]}
                    >
                        {mode === "auto"
                            ? "The season is determined automatically based on the date."
                            : "You selected the season manually. Automatic switching is disabled."
                        }
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 12
    },
    title: {
        fontSize: 20,
        fontWeight: "700"
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
    },
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    option: {
        minWidth: "30%",
        flexGrow: 1,
        borderWidth: 1,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
})