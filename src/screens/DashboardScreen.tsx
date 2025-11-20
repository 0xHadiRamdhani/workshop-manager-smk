import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Text } from '../components/ui/Text';
import { useStore } from '../store';
import { theme } from '../theme/colors';

export const DashboardScreen: React.FC = () => {
    const { analytics, currentUser, projects, vehicles, notifications } = useStore();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 18) return 'Selamat Siang';
        return 'Selamat Malam';
    };

    const recentProjects: Project[] = projects.slice(0, 3);
    const pendingServices = vehicles.filter((v: Vehicle) =>
        v.serviceHistory.some((s: any) => s.status === 'pending')
    ).length;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text variant="h4" color="primary" weight="semibold">
                    {getGreeting()}, {currentUser?.name || 'User'}
                </Text>
                <Text variant="body2" color="secondary">
                    Selamat datang di Workshop Manager SMK
                </Text>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="primary" weight="bold">
                        {analytics?.totalStudents || 0}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Total Siswa
                    </Text>
                </Card>

                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="success" weight="bold">
                        {analytics?.activeProjects || 0}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Proyek Aktif
                    </Text>
                </Card>

                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="warning" weight="bold">
                        {pendingServices}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Service Pending
                    </Text>
                </Card>

                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="error" weight="bold">
                        {analytics?.inventoryAlerts || 0}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Alert Inventory
                    </Text>
                </Card>
            </View>

            {/* Recent Projects */}
            <View style={styles.section}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Proyek Terbaru
                </Text>

                {recentProjects.map((project: Project) => (
                    <Card key={project.id} style={styles.projectCard} onPress={() => { }}>
                        <View style={styles.projectHeader}>
                            <Text variant="body1" weight="medium" color="primary">
                                {project.title}
                            </Text>
                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(project.status) }
                            ]}>
                                <Text variant="caption" color="inverse">
                                    {project.status}
                                </Text>
                            </View>
                        </View>

                        <Text variant="body2" color="secondary" numberOfLines={2}>
                            {project.description}
                        </Text>

                        <View style={styles.projectFooter}>
                            <Text variant="caption" color="tertiary">
                                {project.students.length} Siswa
                            </Text>
                            <Text variant="caption" color="tertiary">
                                {new Date(project.startDate).toLocaleDateString('id-ID')}
                            </Text>
                        </View>
                    </Card>
                ))}
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Aksi Cepat
                </Text>

                <View style={styles.actionsContainer}>
                    <Button
                        title="Scan QR"
                        variant="primary"
                        size="sm"
                        style={styles.actionButton}
                        onPress={() => { }}
                    />

                    <Button
                        title="Service Baru"
                        variant="secondary"
                        size="sm"
                        style={styles.actionButton}
                        onPress={() => { }}
                    />

                    <Button
                        title="Inventory"
                        variant="outline"
                        size="sm"
                        style={styles.actionButton}
                        onPress={() => { }}
                    />
                </View>
            </View>

            {/* Recent Notifications */}
            <View style={styles.section}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Notifikasi Terbaru
                </Text>

                {notifications.slice(0, 3).map((notification: Notification) => (
                    <Card key={notification.id.toString()} style={styles.notificationCard}>
                        <View style={styles.notificationHeader}>
                            <Text variant="body2" weight="medium" color="primary">
                                {notification.title}
                            </Text>
                            <Text variant="caption" color="tertiary">
                                {new Date(notification.createdAt || new Date()).toLocaleTimeString('id-ID')}
                            </Text>
                        </View>

                        <Text variant="body2" color="secondary">
                            {notification.message || ''}
                        </Text>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
};

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'pending':
            return theme.colors.warning[500];
        case 'in-progress':
            return theme.colors.primary[500];
        case 'completed':
            return theme.colors.success[500];
        case 'cancelled':
            return theme.colors.error[500];
        default:
            return theme.colors.neutral[50];
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.xl,
        backgroundColor: theme.colors.background.secondary,
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        gap: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    section: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    sectionTitle: {
        marginBottom: theme.spacing.md,
    },
    projectCard: {
        marginBottom: theme.spacing.sm,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.sm,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    actionButton: {
        flex: 1,
    },
    notificationCard: {
        marginBottom: theme.spacing.sm,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
});