import React from 'react';
import { ScrollView, View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  refreshControl?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default function ScreenContainer({
  children,
  scrollable = false,
  padding = 'md',
  style,
  refreshControl,
}: ScreenContainerProps) {
  const theme = useTheme();

  const getPadding = () => {
    if (padding === 'none') return 0;
    if (padding === 'sm') return theme.spacing.sm;
    if (padding === 'lg') return theme.spacing.lg;
    return theme.spacing.md;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {scrollable ? (
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={[{ flexGrow: 1, paddingHorizontal: getPadding(), paddingBottom: 32 }, style]} 
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1, paddingHorizontal: getPadding() }, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
