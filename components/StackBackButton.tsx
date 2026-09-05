import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp, } from "@react-navigation/native-stack";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StackBackButton() {
    const navigation = useNavigation<NavigationProp>();

    return(
        <Pressable
            onPress={() => navigation.goBack()}
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
        elevation: 5,
    }
})