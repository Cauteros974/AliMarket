import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function AuthScreen({ navigation }: Props) {
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const setUser = useShopStore((state) => state.setUser);

  const title = useMemo(
    () => (isLogin ? "Welcome back" : "Create account"),
    [isLogin]
  );

  const validate = () => {
    if (!email.trim()) {
      Alert.alert("Validation", "Please enter your email.");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Validation", "Please enter a valid email.");
      return false;
    }

    if (!password) {
      Alert.alert("Validation", "Please enter your password.");
      return false;
    }

    if (!isLogin) {
      if (!name.trim()) {
        Alert.alert("Validation", "Please enter your name.");
        return false;
      }

      if (password.length < 10) {
        Alert.alert(
          "Validation",
          "Password must contain at least 10 characters."
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // Demo authentication.
      // There is intentionally no real backend.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser({
        id: "demo-user",
        name: isLogin ? "User" : name.trim(),
        email: email.trim().toLowerCase(),
      });

      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>

          <Text style={styles.headerTitle}>Account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>
            {isLogin
              ? "Sign in to continue shopping"
              : "Create your AliMarket account"}
          </Text>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#8B93A7"
                style={styles.inputIcon}
              />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8B93A7"
              style={styles.inputIcon}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8B93A7"
              style={styles.inputIcon}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.passwordButton}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={21}
                color="#8B93A7"
              />
            </Pressable>
          </View>

          {!isLogin && (
            <Text style={styles.passwordHint}>
              At least 10 characters
            </Text>
          )}

          {/* Main button */}
          <Pressable
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign in"
                : "Create account"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>OR</Text>

            <View style={styles.divider} />
          </View>

          {/* Demo account */}
          <Pressable
            style={styles.demoButton}
            onPress={() => {
              setName("Demo User");
              setEmail("user@example.com");
              setPassword("DemoPassword123");
            }}
          >
            <Ionicons
              name="flash-outline"
              size={20}
              color="#FF5A1F"
            />

            <Text style={styles.demoButtonText}>
              Fill demo account
            </Text>
          </Pressable>

          {/* Login/Register switch */}
          <Pressable
            style={styles.switchButton}
            onPress={switchMode}
          >
            <Text style={styles.switchText}>
              {isLogin
                ? "Don't have an account? "
                : "I already have an account"}
            </Text>

            <Text style={styles.switchTextAccent}>
              {isLogin ? "Create one" : "Sign in"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  formContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#7C8497",
    marginBottom: 24,
  },

  inputContainer: {
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E6EE",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#111827",
  },

  passwordButton: {
    padding: 6,
  },

  passwordHint: {
    fontSize: 13,
    color: "#8B93A7",
    marginTop: -5,
    marginBottom: 18,
    marginLeft: 4,
  },

  submitButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FF5A1F",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1E5EC",
  },

  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: "700",
    color: "#9AA2B2",
  },

  demoButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFD5C6",
    backgroundColor: "#FFF6F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  demoButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#FF5A1F",
  },

  switchButton: {
    alignSelf: "center",
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },

  switchText: {
    fontSize: 15,
    color: "#7C8497",
  },

  switchTextAccent: {
    fontSize: 15,
    color: "#FF5A1F",
    fontWeight: "800",
  },
});