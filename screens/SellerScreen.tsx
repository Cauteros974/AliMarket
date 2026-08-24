import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { products, sellers } from "../data/products";
import { RootStackParamList } from "../navigation/types";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

return(
    <SafeAreaView>
        <FlatList 
            data={sellerProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.content}
            ListHeaderComponent={
                <View style={styles.sellerCard}>
                    <Image source={{ uri: seller.avatar }} style={styles.avatar} />
                </View>
            }
        />
    </SafeAreaView>
)