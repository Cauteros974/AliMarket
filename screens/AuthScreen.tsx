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

    const register = useShopStore((state) => state.register);
    const login = useShopStore((state) => state.login);

    function submit() {
        if(!email.includes("@")) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return;
        }

        if(mode === "register" && name.trim().length < 2) {
            Alert.alert("Invalid name", "Name should contain at least 2 characters.");
            return;
        }

        if(mode === "register") {
            register(name.trim(), email.trim());
        } else{
            login(email.trim());
        }

        navigation.goBack();
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {mode === "register" ? "Create account" : "Welcome back"}
                </Text>

                <Text style={styles.subtitle}>Demo auth is saved locally with AsyncStorage.</Text>

                {mode === "register" ? (
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                        placeholderTextColor={colors.muted}
                        style={styles.input}
                    />
                ): null}

                <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={colors.muted}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                />

                <Pressable
                    onPress={() => setMode(mode === "register" ? "login" : "register")}
                    style={styles.switchButton}
                >
                    <Text style={styles.switchText}>
                        {mode === "register" ? "I already have an account" : "Create new account"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
        padding: 18,
        justifyContent: "center"
    },
    title:{
        color: colors.text,
        fontSize: 18,
        fontWeight: "800"
    }


    subtitle: {
        color: colors.muted,
        marginTop: 8,
        marginBottom: 22,
        fontWeight: "700"
    }
})