import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface DividerProps {
  spacing?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ spacing = 'md', style }: DividerProps) {
  const theme = useTheme();

  const getMargin = () => {
    if (spacing === 'sm') return theme.spacing.sm;
    if (spacing === 'lg') return theme.spacing.lg;
    return theme.spacing.md;
  };

  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: theme.colors.border,
          marginVertical: getMargin(),
        },
        style,
      ]}
    />
  );
}
