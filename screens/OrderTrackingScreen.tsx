import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";

export default function OrderTrackingScreen(){
    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Tracking</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
