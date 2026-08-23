import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type AllFiltersModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AllFiltersModal({visible, onClose}: AllFiltersModalProps) {
    return(
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <View style={styles.sheet}>
                    <View style={styles.header}>
                        <Text style={styles.title}>All filters</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.close}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.28)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: 18
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: "900",
    }
})