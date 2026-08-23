import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function AllFiltersModal() {
    return(
        <Modal>
            <View>
                <View>
                    <Text>All filters</Text>
                    <Pressable>
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}