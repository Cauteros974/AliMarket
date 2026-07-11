import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type SectionHeaderProps = {
  title: string;
  action?: string;
};

export default function SectionHeader({title, action}: SectionHeaderProps) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {action ? <Text style={styles.action}>{action}</Text> : null}
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
})