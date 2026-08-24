import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";

export default function OrderTrackingScreen(){
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Order not found</Text>
            </View>
        </SafeAreaView>
    )
}
