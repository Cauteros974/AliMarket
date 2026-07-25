import {Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type SectionHeaderProps = {
  title: string;
  action?: string;
  onActionPress?: () => void;
};

export default function SectionHeader({title, action, onActionPress}: SectionHeaderProps) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {action ? (
                <Pressable onPress={onActionPress}>
                    <Text style={styles.action}>{action}</Text>
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "900",
    },
    action: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "800",
    },
});