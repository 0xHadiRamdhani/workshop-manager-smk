import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    variant?: 'elevated' | 'outlined' | 'filled';
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'elevated',
    style
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'elevated':
                return {
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3
                };
            case 'outlined':
                return {
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    shadowColor: 'transparent'
                };
            case 'filled':
                return {
                    backgroundColor: '#f5f5f5',
                    borderWidth: 0,
                    shadowColor: 'transparent'
                };
            default:
                return {
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3
                };
        }
    };

    const variantStyle = getVariantStyle();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: variantStyle.backgroundColor,
                    borderWidth: variantStyle.borderWidth,
                    borderColor: variantStyle.borderColor,
                    shadowColor: variantStyle.shadowColor,
                    shadowOffset: variantStyle.shadowOffset,
                    shadowOpacity: variantStyle.shadowOpacity,
                    shadowRadius: variantStyle.shadowRadius,
                    elevation: variantStyle.elevation
                },
                style
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginVertical: 8
    }
});