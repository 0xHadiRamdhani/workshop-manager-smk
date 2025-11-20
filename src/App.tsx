import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator } from './navigation/TabNavigator';
import { useStore } from './store';
import { theme } from './theme/colors';

export const App: React.FC = () => {
    const { currentUser } = useStore();

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TabNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
});