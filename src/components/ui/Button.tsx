import React from 'react';
import { Pressable, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import Text from './Text';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  icon,
  children,
  style,
}: ButtonProps) {
  const theme = useTheme();

  const getBackgroundColor = (pressed: boolean) => {
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.surface;
    if (variant === 'ghost') return 'transparent';
    if (variant === 'danger') return theme.colors.error;
    if (variant === 'success') return theme.colors.success;
    return theme.colors.primary;
  };

  const getTextColor = () => {
    if (variant === 'primary') return theme.colors.background;
    if (variant === 'secondary') return theme.colors.textPrimary;
    if (variant === 'ghost') return theme.colors.primary;
    if (variant === 'danger' || variant === 'success') return '#FFFFFF';
    return theme.colors.background;
  };

  const getBorder = () => {
    if (variant === 'secondary') {
      return { borderWidth: 1, borderColor: theme.colors.border };
    }
    return {};
  };

  const getSizeStyles = () => {
    if (size === 'sm') return { paddingVertical: 8, paddingHorizontal: 16 };
    if (size === 'lg') return { paddingVertical: 16, paddingHorizontal: 24 };
    return { paddingVertical: 12, paddingHorizontal: 20 };
  };

  const getTextVariant = () => {
    if (size === 'sm') return 'label';
    if (size === 'lg') return 'bodyLg';
    return 'body';
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: getBackgroundColor(pressed),
          borderRadius: theme.borderRadius.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.4 : pressed ? 0.9 : 1,
          transform: pressed && !disabled && !loading ? [{ scale: 0.97 }] : [{ scale: 1 }],
        },
        getBorder(),
        getSizeStyles(),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            variant={getTextVariant()}
            color={getTextColor()}
            style={{ 
              marginLeft: icon ? theme.spacing.xs : 0,
              fontFamily: theme.typography.fonts.inter.semiBold 
            }}
            align="center"
          >
            {children}
          </Text>
        </>
      )}
    </Pressable>
  );
}
