import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    style?: ViewStyle;
    icon?: string;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    style,
    icon
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    color: '#fff'
                };
            case 'secondary':
                return {
                    backgroundColor: '#6c757d',
                    borderColor: '#6c757d',
                    color: '#fff'
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderColor: '#007bff',
                    color: '#007bff'
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    color: '#007bff'
                };
            case 'error':
                return {
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545',
                    color: '#fff'
                };
            default:
                return {
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    color: '#fff'
                };
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case 'sm':
                return {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    fontSize: 14
                };
            case 'lg':
                return {
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    fontSize: 18
                };
            default:
                return {
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    fontSize: 16
                };
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                {
                    backgroundColor: variantStyle.backgroundColor,
                    borderColor: variantStyle.borderColor,
                    paddingVertical: sizeStyle.paddingVertical,
                    paddingHorizontal: sizeStyle.paddingHorizontal,
                    opacity: disabled ? 0.6 : 1
                },
                style
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: variantStyle.color,
                        fontSize: sizeStyle.fontSize
                    }
                ]}
            >
                {icon ? `${icon} ${title}` : title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80
    },
    text: {
        fontWeight: '600',
        textAlign: 'center'
    }
});