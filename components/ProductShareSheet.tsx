import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { Pressable,Text, View, StyleSheet, Modal} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { Product } from "../types/product";

type Props = {
    visible: boolean;
    product: Product;
    onClose: () => void;
}

export default function ProductShareSheet({
    visible,
    product,
    onClose
} : Props) {

    return(
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>Share product</Text>
                                <Text style={styles.subtitle}>
                                    Scan or share this product
                                </Text>
                            </View>

                            <Pressable
                                onPress={onClose}
                                style={styles.closeButton}
                                hitSlop={8}
                            >
                                <Ionicons 
                                    name="close"
                                    size={22}
                                    color={colors.text}
                                />
                            </Pressable>
                        </View>
                </View>
            </View>
        </Modal>    
    )   
}

const styles = StyleSheet.create({
    overplay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        justifyContent: "flex-end"
    },
    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    }
})