import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme/colors';

interface TextProps {
    children: React.ReactNode;
    style?: TextStyle;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'disabled' | 'error' | 'warning' | 'success';
    align?: 'left' | 'center' | 'right' | 'justify';
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export const Text: React.FC<TextProps> = ({
    children,
    style,
    variant = 'body1',
    color = 'primary',
    align = 'left',
    weight = 'regular',
    numberOfLines,
    ellipsizeMode,
}) => {
    const getVariantStyle = (): TextStyle => {
        switch (variant) {
            case 'h1':
                return {
                    fontSize: theme.typography.fontSize.xxxl,
                    lineHeight: theme.typography.fontSize.xxxl * 1.2,
                };
            case 'h2':
                return {
                    fontSize: theme.typography.fontSize.xxl,
                    lineHeight: theme.typography.fontSize.xxl * 1.3,
                };
            case 'h3':
                return {
                    fontSize: theme.typography.fontSize.xl,
                    lineHeight: theme.typography.fontSize.xl * 1.4,
                };
            case 'h4':
                return {
                    fontSize: theme.typography.fontSize.lg,
                    lineHeight: theme.typography.fontSize.lg * 1.4,
                };
            case 'h5':
                return {
                    fontSize: theme.typography.fontSize.md,
                    lineHeight: theme.typography.fontSize.md * 1.5,
                };
            case 'h6':
                return {
                    fontSize: theme.typography.fontSize.sm,
                    lineHeight: theme.typography.fontSize.sm * 1.5,
                };
            case 'body1':
                return {
                    fontSize: theme.typography.fontSize.md,
                    lineHeight: theme.typography.fontSize.md * 1.5,
                };
            case 'body2':
                return {
                    fontSize: theme.typography.fontSize.sm,
                    lineHeight: theme.typography.fontSize.sm * 1.5,
                };
            case 'caption':
                return {
                    fontSize: theme.typography.fontSize.xs,
                    lineHeight: theme.typography.fontSize.xs * 1.4,
                };
            case 'button':
                return {
                    fontSize: theme.typography.fontSize.md,
                    lineHeight: theme.typography.fontSize.md * 1.4,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                };
            default:
                return {};
        }
    };

    const getColor = (): string => {
        switch (color) {
            case 'primary':
                return theme.colors.text.primary;
            case 'secondary':
                return theme.colors.text.secondary;
            case 'tertiary':
                return theme.colors.text.tertiary;
            case 'inverse':
                return theme.colors.text.inverse;
            case 'disabled':
                return theme.colors.text.disabled;
            case 'error':
                return theme.colors.error[500];
            case 'warning':
                return theme.colors.warning[500];
            case 'success':
                return theme.colors.success[500];
            default:
                return theme.colors.text.primary;
        }
    };

    const getFontWeight = (): TextStyle['fontWeight'] => {
        const weightMap = {
            light: '300',
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        };
        return weightMap[weight] as TextStyle['fontWeight'];
    };

    const textStyle = StyleSheet.create({
        text: {
            ...getVariantStyle(),
            color: getColor(),
            textAlign: align,
            fontWeight: getFontWeight(),
        },
    });

    return (
        <RNText
            style={[textStyle.text, style]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
        >
            {children}
        </RNText>
    );
};