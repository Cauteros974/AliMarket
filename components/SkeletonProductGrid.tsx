import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

export default function SkeletonProductGrid() {
    return(
        <View style={styles.grid}>
            {Array.from({ length: 4}).map((_, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.image} />
                    <View style={styles.line} />
                    <View style={[styles.line, styles.shortLine]} />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 18
    },
    image: {
        height: 132,
        borderRadius: 14,
        backgroundColor: colors.border,
    }
})