import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

type PaymentCard = {
    id: string,
    holder: string,
    last4: string,
}

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
                    <View key={card.id} style={styles.card}>
                        <View>
                            <Text style={styles.cardBrand}>{card.brand}</Text>
                            <Text style={styles.cardNumber}>**** **** **** {card.last4}</Text>
                            <Text style={styles.cardHolder}>{card.holder}</Text>
                        </View>

                        <Pressable onPress={() => removeCard(card.id)}>
                            <Text style={styles.removeText}>Remove</Text>
                        </Pressable>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Add new card</Text>

                <TextInput 

                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})