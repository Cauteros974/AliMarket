import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

export default function PaymentMethodsScreen() {
    const [cards, setCards] = useState<PaymentCard[]> ([
        {
            id: "card-1",
            holder: "User_test",
            last4: "4242",
            brand: "Visa",
        },
    ]);

    return(
        <SafeAreaView>
            <ScrollView>
                <Text>
                    Payment methods
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}