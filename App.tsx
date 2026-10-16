import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { colors } from "./theme/colors";
import { enableScreens } from 'react-native-screens';
import { SeasonalThemeProvider } from "./theme/SeasonalThemeProvider";

enableScreens();

export default function App() {
  return (
    <SeasonalThemeProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
    </SeasonalThemeProvider>
  );
}