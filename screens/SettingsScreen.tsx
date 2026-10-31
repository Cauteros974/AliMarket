import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { AppTheme, Locale } from "../types/shop";
import SeasonalThemeSettings from "../components/SeasonalThemeSettings";

const locales: {label: string, value: Locale, flag: string}[] = [
    { label: "English", value: "en", flag: "EN" },
    { label: "Українська", value: "uk", flag: "UA" },
    { label: "Deutsch", value: "de", flag: "DE" },
    { label: "Français", value: "fr", flag: "FR" },
]

export default function SettingsScreen() {

    const theme = useShopStore((state) => state.theme);
    const locale = useShopStore((state) => state.locale);

    const setTheme = useShopStore((state) => state.setTheme);
    const setLocale = useShopStore((state) => state.setLocale);
    const showToast = useShopStore((state) => state.showToast);

    const isDark = theme === "dark";

    const palette = {
        background: isDark ? "#111827" : colors.background,
        surface: isDark ? "#1F2937" : colors.surface,
        text: isDark ? "#F9FAFB" : colors.text,
        muted: isDark ? "#CBD5E1" : colors.muted,
        border: isDark ? "#374151" : colors.border,
        selected: isDark ? "#38265A" : colors.surfaceSoft,
    };

    function changeTheme(value: AppTheme) {
        if (value === theme) return;

        setTheme(value);
        showToast(
            `${value === "dark" ? "Dark" : "Light"} theme selected`,
            "info"
        );
    }

    function changeLocale(value: Locale) {
        if (value === locale) return;
        
        setLocale(value);
        showToast("Language preference saved", "info");
    }

    return(
        <SafeAreaView style={[styles.safeArea, isDark && styles.darkSafeArea]} edges={["top"]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.eyebrow, { color: colors.primary }]}>
                            PERSONALIZE
                        </Text>
                        <Text style={[styles.title, { color: palette.text }]}>
                            Settings
                        </Text>
                        <Text style={[styles.description, { color: palette.muted }]}></Text><Text>
                            Make AliMarket feel like yours.
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.headerIcon,
                            { backgroundColor: palette.selected },
                        ]}
                    >
                        <Ionicons 
                            name="settings-outline"
                            size={20}
                            color={colors.primary}
                        />
                    </View>
                </View>

                <View>
                    <Text style={[styles.sectionTitle, { color: palette.text }]}>
                        Appearance
                    </Text>
                    <Text style={[styles.sectionHint, { color: palette.muted }]}>
                        Theme
                    </Text>
                </View>

                <View style={[styles.themewRow]}>
                    {(["light", "dark"] as AppTheme[]).map((item) => {
                        const selected = theme === item;
                        const darkOption = item === "dark";
                        
                        return (
                            <Pressable>
                                <View>
                                    <Ionicons 
                                        name={darkOption ? "moon" : "sunny"}
                                        size={22}
                                        color={darkOption ? "#C4B5FD" : "#D97706"}
                                    />
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },
    darkSafeArea: {
        backgroundColor: "#111827",
    },
    content: {
        padding: 18,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        paddingLeft: 4
    },
    subtitle: {
        color: colors.muted,
        marginTop: 8,
        fontWeight: "700",
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900",
        marginTop: 24,
        marginBottom: 12,
    },
    darkText: {
        color: colors.white,
    },
    darkMuted: {
        color: "#CBD5E1",
    },
    row: {
        flexDirection: "row",
        gap: 10,
    },
    option: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },
    activeOption: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    optionText: {
        color: colors.text,
        fontWeight: "900",
        textTransform: "capitalize",
    },
    activeOptionText: {
        color: colors.white,
    },
    localeItem: {
        minHeight: 52,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 14,
        justifyContent: "center",
        marginBottom: 10,
    },
    activeLocale: {
        backgroundColor: colors.surfaceSoft,
        borderColor: colors.primary,
    },
    localeText: {
        color: colors.text,
        fontWeight: "900",
    },
    activeLocaleText: {
        color: colors.primary,
    },
    text: {
        fontWeight: "600",
        padding: 10,
        paddingLeft: 1,
    }
})