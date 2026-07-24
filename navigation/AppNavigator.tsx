import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import CatalogScreen from "../screens/CatalogScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/Homescreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../theme/colors";
import { MainTabParamList, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Catalog: "grid-outline",
            Cart: "bag-handle-outline",
            Favorites: "heart-outline",
            Profile: "person-circle-outline",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Saved" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: "Product",
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack.Navigator>
  );
}