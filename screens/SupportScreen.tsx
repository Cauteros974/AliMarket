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
                <View>
                    <Text>{item.question}</Text>
                </View>
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})