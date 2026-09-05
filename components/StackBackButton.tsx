import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = {
    onPress: () => void;
}

export default function StackBackButton({onPress}: Props){
    return(
        <Pressable
            style={styles.button}
            hitSlop={10}
        >

        </Pressable>
    )
}