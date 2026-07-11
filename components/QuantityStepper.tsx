import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type QuantityStepperProps = {
    quantity: number;
    onMinus: () => void;
    onPlus: () => void;
};

export default function QuantityStepper({quantity, onMinus, onPlus}: QuantityStepperProps) {
    return(
        <View>
            <Pressable onPress={onMinus} style={styles.button}>
                <Text style={styles.symbol}>-</Text>
            </Pressable>

            <Text style={styles.quantity}>{quantity}</Text>

            <Pressable onPress={onPlus} style={styles.button}>
                <Text style={styles.symbol}>+</Text>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: 4,
    }
})