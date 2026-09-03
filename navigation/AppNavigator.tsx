import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressesScreen from "../screens/AddressesScreen";
import AuthScreen from "../screens/AuthScreen";
import CartScreen from "../screens/CartScreen";
import CatalogScreen from "../screens/CatalogScreen";
import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/Homescreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import OrdersScreen from "../screens/OrdersScreen";
import PaymentMethodsScreen from "../screens/PaymentMethodsScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import SellerScreen from "../screens/SellerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SupportScreen from "../screens/SupportScreen";
import WishlistCollectionsScreen from "../screens/WishlistCollectionsScreen";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";
import { MainTabParamList, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const cartCount = useShopStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const unreadCount = useShopStore(
    (state) => state.notifications.filter((item) => !item.read).length
  );

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
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Saved" }} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarBadge: unreadCount > 0 ? unreadCount : undefined }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product" }}
      />

      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetailsScreen}
        options={{ title: "Category" }}
      />

      <Stack.Screen
        name="Seller"
        component={SellerScreen}
        options={{ title: "Store" }}
      />

      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Order details" }}
      />

      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{ title: "Tracking" }}
      />

      <Stack.Screen name="Auth" component={AuthScreen} options={{ title: "Account" }} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />

      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: "Payment methods" }}
      />

      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Support" }}
      />

      <Stack.Screen
        name="WishlistCollections"
        component={WishlistCollectionsScreen}
        options={{ title: "Wishlist" }}
      />

      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{ title: "Scanner" }}
      />

      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}