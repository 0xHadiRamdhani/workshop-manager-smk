import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { theme } from '../theme/colors';

// Import screens
import { DashboardScreen } from '../screens/DashboardScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { LearningModuleScreen } from '../screens/LearningModuleScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { ServiceTrackingScreen } from '../screens/ServiceTrackingScreen';

// Import components
import { Text } from '../components/ui/Text';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}

const getTabIcon = (routeName: string, focused: boolean, color: string, size: number) => {
    let iconName: any;

    switch (routeName) {
        case 'Dashboard':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'Learning':
            iconName = focused ? 'book' : 'book-outline';
            break;
        case 'Services':
            iconName = focused ? 'construct' : 'construct-outline';
            break;
        case 'Inventory':
            iconName = focused ? 'cube' : 'cube-outline';
            break;
        case 'Schedule':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
        default:
            iconName = 'ellipse';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
};

const getTabLabel = (routeName: string) => {
    switch (routeName) {
        case 'Dashboard':
            return 'Beranda';
        case 'Learning':
            return 'Belajar';
        case 'Services':
            return 'Service';
        case 'Inventory':
            return 'Inventory';
        case 'Schedule':
            return 'Jadwal';
        default:
            return routeName;
    }
};

export const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) =>
                    getTabIcon(route.name, focused, color, size),
                tabBarLabel: ({ focused, color }) => (
                    <Text
                        variant="caption"
                        color={focused ? 'primary' : 'secondary'}
                        style={{ marginTop: -4 }}
                    >
                        {getTabLabel(route.name)}
                    </Text>
                ),
                tabBarActiveTintColor: theme.colors.primary[500],
                tabBarInactiveTintColor: theme.colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.background.primary,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border.light,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
            />
            <Tab.Screen
                name="Learning"
                component={LearningModuleScreen}
            />
            <Tab.Screen
                name="Services"
                component={ServiceTrackingScreen}
            />
            <Tab.Screen
                name="Inventory"
                component={InventoryScreen}
            />
            <Tab.Screen
                name="Schedule"
                component={ScheduleScreen}
            />
        </Tab.Navigator>
    );
};