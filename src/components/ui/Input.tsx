import React from 'react';
import { View, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import Text from './Text';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  containerStyle,
  ...rest
}: InputProps) {
  const theme = useTheme();

  return (
    <View style={containerStyle}>
      {label && (
        <Text variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xs }}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
          borderColor: error ? theme.colors.error : theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          fontFamily: theme.typography.fonts.inter.regular,
          fontSize: theme.typography.styles.body.fontSize,
        }}
        {...rest}
      />
      {error && (
        <Text variant="caption" color={theme.colors.error} style={{ marginTop: theme.spacing.xs }}>
          {error}
        </Text>
      )}
    </View>
  );
}
