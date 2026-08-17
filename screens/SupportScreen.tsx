import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

const faq = [
  {
    question: "How long does delivery take?",
    answer: "Most demo products show delivery in 7-17 days depending on the item.",
  },
  {
    question: "Can I cancel an order?",
    answer: "In this demo, orders are saved locally. A real app would call backend order APIs.",
  },
  {
    question: "Where are my saved products?",
    answer: "Open the Saved tab from the bottom navigation.",
  },
];

export default function SupportScreen() {
    const [message, setMessage] = useState("");

    function sendMessage() {
    if (message.trim().length < 8) {
      Alert.alert("Message is too short", "Please describe your issue in more detail.");
      return;
    }

    Alert.alert("Support request sent", "Your demo support message was created.");
    setMessage("");
  }

  return(
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Support center</Text>
            <Text style={styles.subtitle}>Find answers or send a demo request to support.</Text>

            <Text style={styles.sectionTitle}>FAQ</Text>

            {faq.map((item) => (
                 <View key={item.question} style={styles.faqCard}>
                    <Text style={styles.question}>{item.question}</Text>
                    <Text style={styles.answer}>{item.answer}</Text>
                </View>
            ))}

            <Text style={styles.sectionTitle}>Contact support</Text>

            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Describe your issue"
                placeholderTextColor={colors.muted}
                multiline
                style={styles.textArea}
            />

            <Pressable onPress={sendMessage} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Send message</Text>
            </Pressable>
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
        fontWeight: "900" 
    },
    subtitle: { 
        color: colors.muted, 
        marginTop: 8, 
        fontWeight: "700", 
        lineHeight: 21 
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900",
        marginTop: 24,
        marginBottom: 12,
    },
    faqCard: {
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 10,
    },
    question: { 
        color: colors.text, 
        fontSize: 16, 
        fontWeight: "900" 
    },
    answer: { 
        color: colors.muted, 
        marginTop: 8, 
        lineHeight: 21, 
        fontWeight: "700" 
    },
    textArea: {
        minHeight: 130,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        color: colors.text,
        fontWeight: "700",
        textAlignVertical: "top",
    },
    primaryButton: {
        height: 54,
        borderRadius: 18,
        backgroundColor: colors.primary,
    },
})