import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = {
    navigation = any;
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

                <View>
                    <View>
                        <Ionicons name="person" size={34} color={colors.primary} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 28,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginBottom: 16,
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
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center"
    },
    name: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900"
    },
    email: {
        color: colors.muted,
        marginTop: 4,
    },
    statRow: {
        flexDirection: "column",
        gap: 12,
        marginTop: 12,
    },
    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
    },
    statValue: {
        color: colors.primary,
        fontSize: 24,
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
        marginBottom: 12
    },
    orderCard: {
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between"
    },
    orderId: {
        color: colors.text,
        fontWeight: "900",
    },
    orderStatus: {
        color: colors.muted,
        marginTop: 4,
    },
    orderAmount: {
        color: colors.primary,
        fontWeight: "900",
    },
    menuItem: {
        minHeight: 52,
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
    menuText: {
        color: colors.text,
        fontWeight: "800",
    }
})