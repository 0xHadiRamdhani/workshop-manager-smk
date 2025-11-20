import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../../theme/colors';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
    variant?: 'default' | 'outlined' | 'elevated';
    padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    onPress,
    variant = 'default',
    padding = 'md',
    borderRadius = 'md',
}) => {
    const paddingValue = theme.spacing[padding];
    const borderRadiusValue = theme.borderRadius[borderRadius];

    const getVariantStyle = () => {
        switch (variant) {
            case 'outlined':
                return {
                    borderWidth: 1,
                    borderColor: theme.colors.border.light,
                    backgroundColor: theme.colors.background.primary,
                };
            case 'elevated':
                return {
                    backgroundColor: theme.colors.background.primary,
                    ...theme.shadows.md,
                };
            default:
                return {
                    backgroundColor: theme.colors.background.secondary,
                };
        }
    };

    const cardStyle = StyleSheet.create({
        container: {
            padding: paddingValue,
            borderRadius: borderRadiusValue,
            ...getVariantStyle(),
        },
    });

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                style={[cardStyle.container, style]}
                android_ripple={{ color: theme.colors.overlay.light }}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <View style={[cardStyle.container, style]}>
            {children}
        </View>
    );
};