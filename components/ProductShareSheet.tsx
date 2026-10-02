import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { Pressable,Text, View, StyleSheet, Modal, Share} from "react-native";
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
    

    const productLink = `alimarket://product/${product.id}`;

    /**
    * Default Share system.
    */
    async function handleShare() {
        try{
            await Share.share({
                title: product.title,
                message: `Check out this product in AliMarket:\n${product.title}\n${productLink}`,
            })
        } catch(error) {
            console.log("Share error:", error);
        }
    }

    return(
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                        {/* Header */}
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

                        {/* QR */}
                        <View style={styles.qrContainer}>
                            <QRCode 
                                value={productLink}
                                size={28}
                                backgroundColor="white"
                                color="black"
                            />
                        </View>

                        {/* Product information */}
                        <Text style={styles.productName} numberOfLines={2}>
                            {product.title}
                        </Text>

                        <Text style={styles.link} numberOfLines={1}>
                            {productLink}
                        </Text>

                         <View>
                            <Pressable
                                style={styles.actionButton}
                                onPress={handleShare}
                            >
                                <Ionicons 
                                    name="share-outline"
                                    size={21}
                                    color={colors.white}
                                />
                            </Pressable>
                         </View>
                </View>
            </View>
        </Modal>    
    )   
}

const styles = StyleSheet.create({
    overlay: {
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
        paddingBottom: 34,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900"
    },
    subtitle: {
        fontSize: 15,
        marginTop: 4,
        color: colors.background
    },
    closeButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    qrContainer: {
        alignSelf: "center",
        padding: 16,
        borderRadius: 22,
        backgroundColor: colors.white,
        
        shadowOpacity: 0.8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        }
    }
})