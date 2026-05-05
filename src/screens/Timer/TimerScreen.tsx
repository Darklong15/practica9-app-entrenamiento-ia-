import React from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text } from '../../components/ui';
import { useTheme } from '../../theme';

export default function TimerScreen() {
  const theme = useTheme();
  return (
    <ScreenContainer scrollable={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="h1">Temporizador</Text>
        <Text variant="body" color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          Próximamente...
        </Text>
      </View>
    </ScreenContainer>
  );
}
