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
        gap: 10,
    },
    button: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    symbol: {
        color: colors.text,
        fontSize: 17,
        fontWeight: "900",
    },
})