import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { useRef } from "react";

type Props = {
    navigation: any;
};

export default function ProfileScreen({ navigation }: Props) {
    const user = useShopStore((state) => state.user);
    const logout = useShopStore((state) => state.logout);

    const cartCount = useShopStore((state) => 
        state.cart.reduce((sum,item) => sum + item.quantity, 0)
    );

    const favoriteCount = useShopStore((state) => state.favoriteIds.length);
    const orderCount = useShopStore((state) => state.orders.length);

    const unreadCount = useShopStore(
        (state) => state.notifications.filter((item) => !item.read).length
    );

    const firstName = user?.name?.trim().split(/\s+/)[0] || "there";

    const initials = 
        user?.name
            ?.trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join("") || "";

    function handleLogout() {
        Alert.alert(
            "Log out",
            "Are you sure you want to log out of your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                }
                {
                    text: "Log out",
                    style: "destructive",
                },
            ]
        );
    }
    
    return(
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                 <View style={styles.header}>
                    <View>
                         <Text style={styles.eyebrow}>YOUR SPACE</Text>
                         <Text style={styles.title}>My profile</Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate("Settings")}
                        style={({ pressed }) => [
                            styles.headerButton,
                            pressed && styles.pressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Open settings"
                    >
                        <Ionicons 
                            name="settings-outline"
                            size={12}
                            color={colors.text}
                        />
                    </Pressable>
                 </View>
                 
                 <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        <View style={styles.avatar}>
                            {initials ? (
                                <Text style={styles.avatarText}>{initials}</Text>
                            ): (
                                <Ionicons
                                    name="person"
                                    size={34}
                                    color={colors.primary}
                                />
                            )}

                            <View style={styles.onlineIndicator} />
                        </View>

                        <View style={styles.profileInfo}>
                            <Text style={styles.greeting}>
                                {user ? `Welcome back, ${firstName}!` : "Welcome to AliMarket"}
                            </Text>

                            <Text numberOfLines={1} style={styles.name}>
                                {user?.name ?? "Guest customer"}
                            </Text>

                            <Text numberOfLines={2} style={styles.email}>
                                {user?.email ?? "Sign in to manage your account"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.profileDivider} />

                    <View style={styles.profileBottom}>
                        <View style={styles.memberInfo}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={17}
                                color={colors.primary}
                            />
                            <Text style={styles.memberText}>
                                {user ? "Your account" : "Personal shopping"}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                user ? handleLogout() : navigation.navigate("Auth")
                            }
                            style={({ pressed }) => [
                                styles.authButton,
                                user && styles.logoutButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.authButtonText,
                                    user && styles.logoutButtonText,
                                ]}
                            >
                                {user ? "Your account" : "Personal shopping"}
                            </Text>

                            <Ionicons
                                name={user ? "log-out-outline" : "arrow-forward"}
                                size={16}
                                color={user ? colors.danger : colors.white}
                            />
                        </Pressable>
                    </View>
                 </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function MenuItem({
    label,
    icon,
    onPress,
}: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}) {
    return(
        <Pressable onPress={onPress} style={styles.menuItem}>
            <View style={styles.menuLeft}>
                <Ionicons name={icon} size={20} color={colors.primary} />
                <Text style={styles.menuText}>{label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 28
    },
    title: { 
        color: colors.text, 
        fontSize: 28, 
        fontWeight: "900", 
        marginBottom: 16 
    },
    profileCard: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },
    profileInfo: {
        flex: 1
    },
    name: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900"
    },
    email: {
        color: colors.muted,
        marginTop: 4
    },
    smallButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 999,
    },
    smallButtonText: {
        color: colors.white,
        fontWeight: "900",
        fontSize: 12,
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
    },
    statValue: {
        color: colors.primary,
        fontSize: 23,
        fontWeight: "900"
    },
    statLabel: {
        color: colors.muted,
        marginTop: 4,
        fontWeight: "700"
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900",
        marginTop: 24,
        marginBottom: 12,
    },
    menuItem: {
        minHeight: 54,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    menuText: {
        color: colors.text,
        fontWeight: "800",
    }
})