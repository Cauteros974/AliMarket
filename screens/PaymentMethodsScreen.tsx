import { useState } from "react";
import { Alert } from "react-native";
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
}