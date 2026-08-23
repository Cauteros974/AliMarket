import { Modal,View, Text, StyleSheet } from "react-native";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function AllFiltersModal() {
    return(
        <Modal>
            <View>
                <View>
                    <Text>All filters</Text>      
                </View>
            </View>
        </Modal>
    )
}