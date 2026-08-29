import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { AppTheme, Locale } from "../types/shop";

const locales: {label: string, value: string}[] = [
    { label: "English", value: "en" },
    { label: "Українська", value: "uk" },
    { label: "Deutsch", value: "de" },
    { label: "Français", value: "fr" },
]

export default function SettingsScreen() {

    const theme = useShopStore((state) => state.theme);
    const locale = useShopStore((state) => state.locale);

    const setTheme = useShopStore((state) => state.setTheme);
    const setLocale = useShopStore((state) => state.setLocale);
    const showToast = useShopStore((state) => state.showToast);

    const isDark = theme === "dark";

    function changeTheme(value: AppTheme) {
        setTheme(value);
        showToast({
            message: `${value === "dark" ? "Dark" : "Light"} theme selected`,
            type: "info"
        })
    }

    return(
        <SafeAreaView style={[styles.safeArea, isDark && styles.darkSafeArea]}>
            <View style={styles.content}>
                 <Text style={[styles.title, isDark && styles.darkText]}>Settings</Text>
                 <Text> Theme and language are saved locally.</Text>

                <Text style={[styles.subtitle, isDark && styles.darkMuted]}>Theme</Text>

                <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Theme</Text>

                <View>
                    {(["light", "dark"] as AppTheme[]).map((item) => (
                        <Pressable
                            key={item}
                            onPress={() => changeTheme(item)}
                        >
                            <Text style={[styles.optionText, theme === item && styles.activeOptionText]}>
                                {item}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Language</Text>

                {locales.map((item) => (
                    <Pressable
                        key={item.value}
                        onPress={() => setLocale(item.value)}
                        style={[styles.localeItem, locale === item.value && styles.activeLocale]}
                    >
                        <Text style={[styles.localeText, locale === item.value && styles.activeLocaleText]}>
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
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
        fontWeight: "900"
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
    },
})