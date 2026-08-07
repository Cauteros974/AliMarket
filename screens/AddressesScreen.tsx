import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function AddressesScreen() {
    const addresses = useShopStore((state) => state.addresses);
    const selectedAddressId = useShopStore((state) => state.selectedAddressId);
    const addAddress = useShopStore((state) => state.addAddress);
    const selectAddress = useShopStore((state) => state.selectAddress);
    const removeAddress = useShopStore((state) => state.removeAddress);

    const [city, setCity] = useState("Lviv");
    const [street, setStreet] = useState("Rynok Square 1");
    const [phone, setPhone] = useState("+380 00 000 00 00");

    function submit() {
        if(!city.trim() || !street.trim() || !phone.trim()) return;

        addresses({
            title: "New address",
            city,
            street,
            phone,
            postalCode: "79000",
        });

        setCity("");
        setStreet("");
    }

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

                        <Text style={styles.muted}>
                            {address.city}, {address.street}
                        </Text>

                        <Text style={styles.muted}>{address.phone}</Text>

                        {addAddress.length > 1 ? (
                            <Pressable onPress={() => removeAddress(address.id)}>
                                <Text style={styles.remove}>Remove</Text>
                            </Pressable>
                        ): null}
                    </Pressable>
                ))}

                <Text style={styles.sectionTitle}>Add address</Text>

                <TextInput 
                    value={city}
                    onChangeText={setCity}
                    placeholder="City"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                />

                <TextInput 
                    value={street}
                    onChangeText={setStreet}
                    placeholder="Street"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                />

                <TextInput 
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                />

                <Pressable onPress={submit} style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Save address</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})