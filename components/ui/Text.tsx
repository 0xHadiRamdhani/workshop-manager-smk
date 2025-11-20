import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'small';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    style?: TextStyle;
    numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
    children,
    variant = 'body1',
    color = 'primary',
    weight = 'normal',
    style,
    numberOfLines
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'h1':
                return { fontSize: 32, lineHeight: 40 };
            case 'h2':
                return { fontSize: 28, lineHeight: 36 };
            case 'h3':
                return { fontSize: 24, lineHeight: 32 };
            case 'h4':
                return { fontSize: 20, lineHeight: 28 };
            case 'h5':
                return { fontSize: 18, lineHeight: 24 };
            case 'h6':
                return { fontSize: 16, lineHeight: 22 };
            case 'body1':
                return { fontSize: 16, lineHeight: 24 };
            case 'body2':
                return { fontSize: 14, lineHeight: 20 };
            case 'caption':
                return { fontSize: 12, lineHeight: 16 };
            case 'small':
                return { fontSize: 10, lineHeight: 14 };
            default:
                return { fontSize: 16, lineHeight: 24 };
        }
    };

    const getColorStyle = () => {
        switch (color) {
            case 'primary':
                return '#333';
            case 'secondary':
                return '#666';
            case 'success':
                return '#28a745';
            case 'warning':
                return '#ffc107';
            case 'error':
                return '#dc3545';
            case 'info':
                return '#17a2b8';
            case 'muted':
                return '#999';
            default:
                return '#333';
        }
    };

    const getWeightStyle = () => {
        switch (weight) {
            case 'light':
                return '300';
            case 'normal':
                return '400';
            case 'medium':
                return '500';
            case 'semibold':
                return '600';
            case 'bold':
                return '700';
            default:
                return '400';
        }
    };

    const variantStyle = getVariantStyle();
    const colorStyle = getColorStyle();
    const weightStyle = getWeightStyle();

    return (
        <RNText
            style={[
                styles.text,
                {
                    fontSize: variantStyle.fontSize,
                    lineHeight: variantStyle.lineHeight,
                    color: colorStyle,
                    fontWeight: weightStyle
                },
                style
            ]}
            numberOfLines={numberOfLines}
        >
            {children}
        </RNText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'System'
    }
});