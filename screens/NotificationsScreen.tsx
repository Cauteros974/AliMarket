import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { formatDate } from "../utils/format";

export default function NotificationsScreen() {
    const notifications = useShopStore((state) => state.notifications);
    const markNotificationRead = useShopStore((state) => state.markNotificationRead);

    return(
        <SafeAreaView>
            <FlatList 
                data={notifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                ListHeaderComponent={<Text style={styles.title}>Notifications</Text>}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-outline" size={48} color={colors.primary} />
                        <Text style={styles.emptyTitle}>No notifications</Text>
                        <Text style={styles.emptyText}>Sales and order updates will appear here.</Text>
                    </View>
                }
                renderItem={({item}) => (
                    <Pressable 
                        onPress={() => markNotificationRead(item.id)}
                        style={[styles.card, !item.read && styles.unreadCard]}
                    >
                        <View style={styles.rowBetween}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            {!item.read ? <View style={style.date}/> : null}
                        </View>

                        <Text style={styles.message}>{item.message}</Text>
                        <Text style={styles.date}>{formatDate(item.date)}</Text>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 18,
        paddingBottom: 28
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
        marginBottom: 16,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 12,
    },
    unreadCard: { 
        borderColor: colors.primary 
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    cardTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
        flex: 1,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    message: {
        color: colors.primary,
        lineHeight: 21,
        fontWeight: "700",
        marginTop: 8
    },
    date: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "900",
        marginTop: 10,
    },
    emptyState: {
        minHeight: 420,
        alignItems: "center",
        justifyContent: "center"
    }
})