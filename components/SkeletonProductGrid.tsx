import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

export default function SkeletonProductGrid() {
    return(
        <View style={styles.grid}>
            {Array.from({ length: 4}).map((_, index) => (
                <View style={styles.card}>
                    <View style={styles.image} />
                </View>
            ))}
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