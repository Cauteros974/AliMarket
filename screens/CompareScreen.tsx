import React, {useMemo} from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { products } from "../data/products";
import { useCompareStore } from "../store/useCompareStore";
import { useSeasonalThemeContext } from "../theme/SeasonalThemeProvider";
import { getComparisonRows, toComparisonProduct } from "../utils/compareProducts";

export default function CompareScreen() {
    const navigation = useNavigation<any>();

    const {colors} = useSeasonalThemeContext();

    const compareIds = useCompareStore((state) => state.compareIds);
    const removeFromCompare = useCompareStore(
        (state) => state.removeFromCompare
    )

    const clearCompare = useCompareStore((state) => state.clearCompare);

    const selectedProducts = useMemo(() => {
        return compareIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is (typeof products)[number] => Boolean(product))
        .map(toComparisonProduct);
    },[compareIds] )

    const rows = useMemo(
        () => getComparisonRows(selectedProducts),
        [selectedProducts]
    );

    const recommendation = useMemo(() => {
        if (selectedProducts.length < 2) return null;
        
        const pricedProducts = selectedProducts.filter(
            (product) => product.price !== null
        );

        if (pricedProducts.length === 0) {
            return {
                title: "Insufficient data",
                description:
                    "The products do not have prices listed. Add specifications to make the comparison more useful.",
            };
            const cheapest = pricedProducts.reduce((best, current) =>
                current.price! < best.price! ? current : best
            );

            return{
                title: `The most affordable option - ${cheapest.title}`,
                description:
                    pricedProducts.length === selectedProducts.length
                        ? "Only products with a listed price were taken into account. Compare other specifications before making your choice."
                        : "This product has the lowest listed price. This does not mean it is better in terms of all specifications.",
            };
        }
    }, [selectedProducts]);

    return(
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
        >
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Product comparison
                    </Text>

                    <Text style={{ color: colors.textSecondary }}>
                        Selected: {selectedProducts.length} из 3
                    </Text>
                </View>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={[styles.smallButton, { borderColor: colors.border }]}
                >
                    <Text style={{ color: colors.text }}>Back</Text>
                </Pressable>
            </View>

            {selectedProducts.length === 0 ? (
                    <View
                        style={[
                            styles.empty,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        <Text style={styles.emptyEmoji}>⇄</Text>

                        <Text style={[styles.emptyTitle, { color: colors.text }]}>
                            There is nothing to compare yet
                        </Text>

                        <Text
                            style={[
                                styles.emptyDescription,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Open the catalog and click “Compare” on the product cards.
                        </Text>

                        <Pressable
                            onPress={() => navigation.navigate("Catalog")}
                            style={[
                                styles.primaryButton,
                                { backgroundColor: colors.primary },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.primaryButtonText,
                                    { color: colors.onPrimary },
                                ]}
                            >
                                Go to the catalog
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.productsRow}
                        >
                            {selectedProducts.map((product) => (
                                <View
                                    key={product.id}
                                    style={[
                                        styles.productCard,
                                        {
                                            backgroundColor: colors.surface,
                                            borderColor: colors.border,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[styles.productName, { color: colors.text }]}
                                        numberOfLines={3}
                                    >
                                        {product.title}
                                    </Text>

                                    <Text>
                                        {product.price === null
                                            ? "Price not specified"
                                            : `${product.currency}${product.price.toFixed(2)}`}
                                    </Text>

                                    <Pressable>
                                        <Text style={{ color: colors.danger, fontSize: 12 }}>
                                            Put away
                                        </Text>
                                    </Pressable>
                                </View>
                            ))}
                        </ScrollView>

                        <View>
                            <Text>
                                Characteristics
                            </Text>

                            {rows.map((row) => (
                                <View
                                    key={row.key}
                                    style={[
                                        styles.tableRow,
                                        {
                                            borderBottomColor: colors.border,
                                            backgroundColor: row.hasDifference
                                                ? colors.surfaceElevated
                                                : colors.surface,
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.attributeName,
                                            { color: colors.text },
                                        ]}
                                    >
                                        {row.key}
                                    </Text>

                                    <View style={styles.valuesRow}>
                                        {row.values.map((value,index) => (
                                            <View key={`${row.key}-${index}`}>
                                                <Text>
                                                    {value}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
            )}
        </ScrollView>
    )   
}

const styles = StyleSheet.create({

})