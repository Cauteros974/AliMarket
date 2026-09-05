import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = {
    onPress: () => void;
}

export default function StackBackButton({onPress}: Props){
    return(
        <Pressable
            onPress={onPress}
            style={styles.button}
            hitSlop={10}
        >
            <Ionicons 
                name="arrow-back"
                size={23}
                color={colors.text}
            />
        </Pressable>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    }
})