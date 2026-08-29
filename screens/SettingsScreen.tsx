import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { AppTheme, Locale } from "../types/shop";

const locals: {label: string, value: string}[] = [
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
        
    }

    return(
        <SafeAreaView>
            <View>
                 <Text>Settings</Text>
                 <Text> Theme and language are saved locally.</Text>

                 <Text>Theme</Text>
            </View>
        </SafeAreaView>
    )
}