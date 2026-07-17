import { NativeAppEventEmitter } from "react-native";

export default function CategoryDetailsScreen({navigation, route}: Props) {
    const category = categories.find((item) => item.id === route.params.categoryId);
}