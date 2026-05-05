import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../theme';

export interface TextProps extends RNTextProps {
  variant?: 'displayLg' | 'displayMd' | 'h1' | 'h2' | 'h3' | 'bodyLg' | 'body' | 'caption' | 'label' | 'stat';
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export default function Text({ 
  variant = 'body', 
  color, 
  align = 'left', 
  style, 
  children, 
  ...rest 
}: TextProps) {
  const theme = useTheme();
  const variantStyle = theme.typography.styles[variant];
  const textColor = color || theme.colors.textPrimary;

  return (
    <RNText 
      style={[
        variantStyle,
        { color: textColor, textAlign: align },
        style
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
