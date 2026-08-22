import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function ToastBanner() {
    const insets = useSafeAreaInsets();
    const toast = useShopStore((state) => state.toast);
    const hideToast = useShopStore((state) => state.hideToast);

    useEffect(() => {
        if(!toast) return;

        const timer = setTimeout(hideToast, 2200);
        return () => clearTimeout(timer);
    }, [hideToast, toast]);

    if(!toast) return null;

    const background = 
        toast.type === "success" 
            ? colors.success
            : toast.type === "error"
                ? colors.danger
                : colors.text

    return(
         <View style={[styles.container, { top: insets.top + 10 }]}>
            <Text>{toast.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 18,
        right: 18,
        zIndex: 100,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: colors.black,
        shadowOpacity: 0.16,
        shadowRadius: 16,
    }
})