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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Payment methods</Text>

                {cards.map((card) => (
                    <View>
                        <View>
                            <Text>{card.brand}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})