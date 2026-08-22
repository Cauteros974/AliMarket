import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

export default function SkeletonProductGrid() {
    return(
        <View>
            <View>
                <View style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 132,
        borderRadius: 14,
        backgroundColor: colors.border,
    }
})