import React from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text } from '../../components/ui';
import { useTheme } from '../../theme';

export default function ProgressScreen() {
  const theme = useTheme();
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="h1">Progreso</Text>
        <Text variant="body" color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          Próximamente...
        </Text>
      </View>
    </ScreenContainer>
  );
}
