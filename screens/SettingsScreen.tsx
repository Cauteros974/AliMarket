import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { AppTheme, Locale } from "../types/shop";

export default function SettingsScreen() {
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