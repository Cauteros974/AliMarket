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
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})