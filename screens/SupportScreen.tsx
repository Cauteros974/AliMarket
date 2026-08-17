import { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

const faq = [
  {
    question: "How long does delivery take?",
    answer: "Most demo products show delivery in 7-17 days depending on the item.",
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
}