import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = {
    navigation: any;
};

export default function AuthScreen({ navigation}: Props) {
    const [mode, setMode] = useState<"login" | "register">("register");
    const [name, setName] = useState("User");
    const [email, setEmail] = useState("user@example.com");

    return(
        <SafeAreaView>
            <View>
                <Text>
                    {mode === "register" ? "Create account" : "Welcome back"}
                </Text>
            </View>
        </SafeAreaView>
    )
}