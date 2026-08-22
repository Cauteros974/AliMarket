import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function ToastBanner() {
    const insets = useSafeAreaInsets();
    const toast = useShopStore((state) => state.toast);
}