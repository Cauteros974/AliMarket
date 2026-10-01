import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { Pressable,Text, View, StyleSheet, Modal} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { Product } from "../types/product";

type Props = {
    onClose: () => void;
}

export default function ProductShareSheet() {
    return(
        <Modal>
            <View>
                <Text style={styles.title}>Share product</Text>
                <Text style={styles.subtitle}>
                    Scan or share this product
                </Text>
            </View>

            <Pressable
                onPress={onClose}
                style={styles.closeButtn}
                hitSlop={8}
            >

            </Pressable>
    )   </Modal>
}