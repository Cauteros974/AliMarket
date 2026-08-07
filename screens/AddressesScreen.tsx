import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function AddressesScreen() {
    const addresses = useShopStore((state) => state.addresses);
    const selectedAddressId = useShopStore((state) => state.selectedAddressId);


    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Addresses</Text>

                {addresses.map((address) => (
                    <Pressable>
                        <View>
                            <Text>{address.title}</Text>
                            <Text style={styles.badge}>
                                {selectedAddressId === address.id ? "Selected" : "Choose"}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})