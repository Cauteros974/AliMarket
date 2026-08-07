import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function AddressesScreen() {
    return(
        <SafeAreaView>
            <ScrollView>
                <Text>Addresses</Text>
            </ScrollView>
        </SafeAreaView>
    )
}