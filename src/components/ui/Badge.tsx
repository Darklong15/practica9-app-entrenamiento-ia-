import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import Text from './Text';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'danger';
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

export default function Badge({ label, variant = 'default', size = 'sm', style }: BadgeProps) {
  const theme = useTheme();

  const getColors = () => {
    if (variant === 'primary') return { bg: theme.colors.primaryMuted, text: theme.colors.primary };
    if (variant === 'success') return { bg: 'rgba(52, 199, 89, 0.2)', text: theme.colors.success };
    if (variant === 'danger') return { bg: 'rgba(255, 69, 58, 0.2)', text: theme.colors.error };
    return { bg: theme.colors.surfaceElevated, text: theme.colors.textSecondary };
  };

  const { bg, text } = getColors();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderRadius: theme.borderRadius.full,
          paddingVertical: isSm ? 4 : 6,
          paddingHorizontal: isSm ? 8 : 12,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text variant={isSm ? 'label' : 'caption'} color={text}>
        {label}
      </Text>
    </View>
  );
}
