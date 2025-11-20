// Minimalist Color Palette for Workshop Manager App

export const colors = {
    // Primary Colors
    primary: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#2196F3', // Main primary color
        600: '#1E88E5',
        700: '#1976D2',
        800: '#1565C0',
        900: '#0D47A1',
    },

    // Secondary Colors
    secondary: {
        50: '#F3E5F5',
        100: '#E1BEE7',
        200: '#CE93D8',
        300: '#BA68C8',
        400: '#AB47BC',
        500: '#9C27B0', // Main secondary color
        600: '#8E24AA',
        700: '#7B1FA2',
        800: '#6A1B9A',
        900: '#4A148C',
    },

    // Success Colors
    success: {
        50: '#E8F5E8',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#4CAF50', // Main success color
        600: '#43A047',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
    },

    // Warning Colors
    warning: {
        50: '#FFF8E1',
        100: '#FFECB3',
        200: '#FFE082',
        300: '#FFD54F',
        400: '#FFCA28',
        500: '#FFC107', // Main warning color
        600: '#FFB300',
        700: '#FFA000',
        800: '#FF8F00',
        900: '#FF6F00',
    },

    // Error Colors
    error: {
        50: '#FFEBEE',
        100: '#FFCDD2',
        200: '#EF9A9A',
        300: '#E57373',
        400: '#EF5350',
        500: '#F44336', // Main error color
        600: '#E53935',
        700: '#D32F2F',
        800: '#C62828',
        900: '#B71C1C',
    },

    // Neutral Colors (Grayscale)
    neutral: {
        0: '#FFFFFF',
        10: '#FAFAFA',
        20: '#F5F5F5',
        30: '#EEEEEE',
        40: '#E0E0E0',
        50: '#BDBDBD',
        60: '#9E9E9E',
        70: '#757575',
        80: '#616161',
        90: '#424242',
        100: '#212121',
        110: '#000000',
    },

    // Background Colors
    background: {
        primary: '#FFFFFF',
        secondary: '#FAFAFA',
        tertiary: '#F5F5F5',
        dark: '#121212',
        darkSecondary: '#1E1E1E',
    },

    // Text Colors
    text: {
        primary: '#212121',
        secondary: '#757575',
        tertiary: '#9E9E9E',
        inverse: '#FFFFFF',
        disabled: '#BDBDBD',
    },

    // Border Colors
    border: {
        light: '#E0E0E0',
        medium: '#BDBDBD',
        dark: '#9E9E9E',
    },

    // Overlay Colors
    overlay: {
        light: 'rgba(0, 0, 0, 0.1)',
        medium: 'rgba(0, 0, 0, 0.3)',
        dark: 'rgba(0, 0, 0, 0.5)',
        black: 'rgba(0, 0, 0, 0.8)',
    },

    // Status Colors
    status: {
        online: '#4CAF50',
        offline: '#9E9E9E',
        busy: '#FFC107',
        away: '#FF9800',
    },

    // Priority Colors
    priority: {
        low: '#4CAF50',
        medium: '#FFC107',
        high: '#FF9800',
        critical: '#F44336',
    },
};

export const theme = {
    colors,
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
        round: 50,
    },
    typography: {
        fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32,
        },
        fontWeight: {
            light: '300',
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
        },
    },
};

export default theme;