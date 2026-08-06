import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

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

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={style.title}>Profile</Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={34} color={colors.primary} />
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{user?.name ?? "Guest customer"}</Text>
                        <Text style={styles.email}>{user?.email ?? "Login to save your orders"}</Text>
                    </View>

                    <Pressable 
                        onPress={user ? logout : () => navigation.navigate("Auth")}
                        style={styles.smallButton}
                    >
                        <Text style={styles.smallButtonText}>{user ? "Logout" : "Login"}</Text>
                    </Pressable>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{cartCount}</Text>
                        <Text style={styles.statLabel}>Cart</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{favoriteCount}</Text>
                        <Text style={styles.statLabel}>Saved</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{orderCount}</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Account</Text>

                <MenuItem
                    label="Order history"
                    icon="receipt-outline"
                    onPress={() => navigation.navigate("Orders")}
                />

                <MenuItem
                    label="Order history"
                    icon="receipt-outline"
                    onPress={() => navigation.navigate("Orders")}
                />

                <MenuItem
                    label={`Notifications ${unreadCount ? `(${unreadCount})` : ""}`}
                    icon="notifications-outline"
                    onPress={() => navigation.navigate("Notifications")}
                />
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
        fontWeight: "900"
    }
})