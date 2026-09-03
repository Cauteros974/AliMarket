import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

export default function QRScannerScreen(){
    return(
        <SafeAreaView>
            <View>
                <Text>Camera access</Text>
            </View>
        </SafeAreaView>
    )
}