import React from 'react';
import { SafeAreaView, ScrollView, View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export default function ScreenContainer({
  children,
  scrollable = false,
  padding = 'md',
  style,
}: ScreenContainerProps) {
  const theme = useTheme();

  const getPadding = () => {
    if (padding === 'none') return 0;
    if (padding === 'sm') return theme.spacing.sm;
    if (padding === 'lg') return theme.spacing.lg;
    return theme.spacing.md;
  };

  const contentStyle = [
    { flex: 1, paddingHorizontal: getPadding() },
    style,
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {scrollable ? (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={contentStyle} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={contentStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}
