import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

type PaymentCard = {
    id: string;
    holder: string;
    last4: string;
    brand: string;
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

    const [holder, setHolder] = useState("Test");

    const [cardNumber, setCardNumber] = useState("4242424242424242");

    function addCard() {
        const cleanNumber = cardNumber;

        if (holder.trim().length < 2 || cleanNumber.length < 12) {
            Alert.alert("Invalid card", "Enter card holder and valid card number.");
            return;
        }

        const newCard: PaymentCard = {
            id: `card-${Date.now()}`,
            holder: holder.trim(),
            last4: cleanNumber.slice(-4),
            brand: cleanNumber.startsWith("4") ? "Visa" : "Mastercard",
        };

        setCards((current) => [newCard, ...current]);
        setCardNumber("");
        Alert.alert("Card added", "Demo payment card was saved.");

    }

    function removeCard(cardId: string) {
        setCards((current) => current.filter((card) => card.id !== cardId));
    }

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
                    value={holder}
                    onChangeText={setHolder}
                    placeholder="Card holder"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                />

                <TextInput
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="Card number"
                    placeholderTextColor={colors.muted}
                    keyboardType="numeric"
                    style={styles.input}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, 
        backgroundColor: colors.background
    },
    content: { 
        padding: 18, 
        paddingBottom: 28 
    },
    title: { 
        color: colors.text, 
        fontSize: 28, 
        fontWeight: "900", 
        marginBottom: 16 
    },
    card: {
        backgroundColor: colors.text,
        borderRadius: 22,
        padding: 18,
        marginBottom: 12,
        minHeight: 132,
        justifyContent: "space-between",
    },
    cardBrand: { 
        color: colors.white, 
        fontSize: 18, 
        fontWeight: "900" 
    },
    cardNumber: {
        color: colors.white,
        fontSize: 21,
        fontWeight: "900",
    },
})