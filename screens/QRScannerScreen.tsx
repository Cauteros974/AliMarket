import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function QRScannerScreen(){
    const[permission, requestPermission] = useCameraPermissions();

    if(!permission){
        return <SafeAreaView />
    }


    if(!permission.granted){
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.center}>
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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})