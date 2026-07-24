import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function ProfileScreen() {
    const cartCount = useShopStore((state) => 
        state.cart.reduce((sum,item) => sum + item.quantity, 0)
    );

    const favoriteCount = useShopStore((state) => state.favoriteIds.length);

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Profile</Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={34} color={colors.primary} />
                    </View>

                    <View>
                        <Text style={styles.name}>User</Text>
                        <Text style={styles.email}>user@example.com</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text>{cartCount}</Text>
                        <Text style={styles.statLabel}>Cart items</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}