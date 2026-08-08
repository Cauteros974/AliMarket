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
                    />
                )}
            />
        </SafeAreaView>
    )
}