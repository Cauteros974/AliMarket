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
                    <Text style={styles.title}>All filters</Text>
                    <Pressable>
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    
})