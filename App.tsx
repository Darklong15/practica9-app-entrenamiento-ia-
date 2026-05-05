import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { ThemeProvider, useAppFonts, theme } from './src/theme';

export default function App() {
  const { fontsLoaded, fontError } = useAppFonts();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar style="light" />
        <Text style={{ ...theme.typography.styles.h2, color: theme.colors.primary }}>
          Sistema de diseño cargado ✓
        </Text>
      </View>
    </ThemeProvider>
  );
}
