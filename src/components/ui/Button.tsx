import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/colors';
import { Text } from './Text';

interface ButtonProps extends PressableProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    onPress,
    style,
    ...props
}) => {
    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: theme.colors.primary[500],
                    borderColor: theme.colors.primary[500],
                };
            case 'secondary':
                return {
                    backgroundColor: theme.colors.secondary[500],
                    borderColor: theme.colors.secondary[500],
                };
            case 'success':
                return {
                    backgroundColor: theme.colors.success[500],
                    borderColor: theme.colors.success[500],
                };
            case 'warning':
                return {
                    backgroundColor: theme.colors.warning[500],
                    borderColor: theme.colors.warning[500],
                };
            case 'error':
                return {
                    backgroundColor: theme.colors.error[500],
                    borderColor: theme.colors.error[500],
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderColor: theme.colors.primary[500],
                    borderWidth: 1,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                };
            default:
                return {};
        }
    };

    const getSizeStyle = (): ViewStyle => {
        const sizes = {
            sm: {
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.md,
                minHeight: 32,
            },
            md: {
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.lg,
                minHeight: 48,
            },
            lg: {
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.xl,
                minHeight: 56,
            },
        };
        return sizes[size];
    };

    const getTextColor = (): 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'disabled' | 'error' | 'warning' | 'success' => {
        if (variant === 'outline' || variant === 'ghost') {
            return disabled ? 'disabled' : 'primary';
        }
        return 'inverse';
    };

    const buttonStyle = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.borderRadius.md,
            ...getVariantStyle(),
            ...getSizeStyle(),
            ...(fullWidth && { width: '100%' }),
            ...(disabled && {
                opacity: 0.6,
            }),
        },
        iconLeft: {
            marginRight: theme.spacing.sm,
        },
        iconRight: {
            marginLeft: theme.spacing.sm,
        },
    });

    const handlePress = (event: any) => {
        if (!disabled && !loading && onPress) {
            onPress(event);
        }
    };

    return (
        <Pressable
            style={buttonStyle.container as ViewStyle}
            onPress={handlePress}
            disabled={disabled || loading}
            android_ripple={{ color: theme.colors.overlay.light }}
            {...props}
        >
            {loading && (
                <ActivityIndicator
                    size="small"
                    color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary[500] : theme.colors.text.inverse}
                    style={{ marginRight: theme.spacing.sm }}
                />
            )}

            {!loading && icon && iconPosition === 'left' && (
                <View style={buttonStyle.iconLeft}>{icon}</View>
            )}

            <Text
                variant={size === 'sm' ? 'caption' : 'button'}
                color={getTextColor()}
                weight="medium"
            >
                {title}
            </Text>

            {!loading && icon && iconPosition === 'right' && (
                <View style={buttonStyle.iconRight}>{icon}</View>
            )}
        </Pressable>
    );
};

// Add View import for icon wrapper
const View = ({ children, style }: { children: React.ReactNode; style?: any }) => (
    <View style={style}>{children}</View>
);