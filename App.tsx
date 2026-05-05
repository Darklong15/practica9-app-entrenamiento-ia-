import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useAppFonts } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const { fontsLoaded, fontError } = useAppFonts();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
