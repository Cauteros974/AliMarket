import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type QuantityStepperProps = {
    quantity: number;
    onMinus: () => void;
    onPlus: () => void;
}