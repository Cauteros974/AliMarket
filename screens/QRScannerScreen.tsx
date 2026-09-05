import { CameraView, useCameraPermissions } from "expo-camera";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "QRScanner">;

export default function QRScannerScreen(navigation) : Props{
    const[permission, requestPermission] = useCameraPermissions();

    const [scanned, setScanned] = useState(false);

    const setCouponCode = useShopStore((state) => state.setCouponCode);
    const applyCoupon = useShopStore((state) => state.applyCoupon);

    if(!permission){
        return <SafeAreaView />
    }

    if(!permission.granted){
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.center}>
                    <Pressable
                        onPress={() => navigation.goBack()} 
                        style={styles.backButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.warning}
                        />
                    </Pressable>
                    <Text style={styles.title}>Camera access</Text>

                    <Text style={styles.subtitle}>
                        Allow camera access to scan demo coupons or product codes.
                    </Text>

                    <Pressable onPress={requestPermission} style={styles.primaryButton}>
                        <Text style={styles.primaryText}>Allow camera</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <Text style={styles.title}>QR / Barcode scanner</Text>

                <Text style={styles.subtitle}>
                    Try scanning a code with WELCOME10, SALE15 or FREESHIP.
                </Text>

                <View style={styles.cameraWrap}>
                    <CameraView
                        style={styles.camera}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr", "ean13", "code128"],
                        }}
                        onBarcodeScanned={({data}) => {
                            if (scanned) return;
                            
                            setScanned(true);
                            setCouponCode(data.toUpperCase());

                            const ok = applyCoupon();
                            
                            Alert.alert(ok ? "Coupon scanned" : "Code scanned", data);
                        }}
                    />
                </View>

                <Pressable onPress={() => setScanned(false)} style={styles.secondaryButton}>
                    <Text style={styles.secondaryText}>Scan again</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: 18,
    },
    center: {
        flex: 1,
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "900",
    },
    subtitle: {
        color: colors.muted,
        marginTop: 8,
        marginBottom: 18,
        fontWeight: "700",
        lineHeight: 21,
    },
    cameraWrap: {
        flex: 1,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: colors.text,
    },
    camera: {
        flex: 1,
    },
    primaryButton: {
        height: 54,
        borderRadius: 18,
        backgroundColor: colors.primary,
        paddingHorizontal: 18,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    primaryText: {
        color: colors.white,
        fontWeight: "900",
    },
    secondaryButton: {
        height: 54,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
    },
    secondaryText: {
        color: colors.text,
        fontWeight: "900",
    },
})