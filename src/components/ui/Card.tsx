import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Card({ padding = 'md', children, style }: CardProps) {
  const theme = useTheme();

  const getPadding = () => {
    if (padding === 'sm') return theme.spacing.sm;
    if (padding === 'lg') return theme.spacing.lg;
    return theme.spacing.md;
  };

  return (
    <View
      style={[
        theme.elevation.level1,
        {
          borderRadius: theme.borderRadius.lg,
          padding: getPadding(),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
