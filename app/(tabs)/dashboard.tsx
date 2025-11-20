import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useStore } from '@/src/store';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function DashboardScreen() {
    const {
        analytics,
        currentUser,
        projects,
        vehicles,
        notifications,
        students,
        mentors,
        schedules,
        attendance,
        inventoryAlerts
    } = useStore();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 18) return 'Selamat Siang';
        return 'Selamat Malam';
    };

    const recentProjects = projects.slice(0, 3);
    const pendingServices = vehicles.filter((v: any) =>
        v.serviceHistory.some((s: any) => s.status === 'pending')
    ).length;

    const todayAttendance = attendance.filter((a: any) =>
        new Date(a.date).toDateString() === new Date().toDateString()
    ).length;

    const activeSchedules = schedules.filter((s: any) =>
        s.status === 'booked' && new Date(s.date) >= new Date()
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
                        {students.length}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Total Siswa
                    </Text>
                </Card>
                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="success" weight="bold">
                        {projects.filter((p: any) => p.status === 'in-progress').length}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Proyek Aktif
                    </Text>
                </Card>
                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="warning" weight="bold">
                        {inventoryAlerts.length}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Alert Inventory
                    </Text>
                </Card>
                <Card variant="elevated" style={styles.statCard}>
                    <Text variant="h5" color="primary" weight="bold">
                        {activeSchedules}
                    </Text>
                    <Text variant="caption" color="secondary">
                        Jadwal Aktif
                    </Text>
                </Card>
            </View>

            {/* Attendance Overview */}
            <Card style={styles.sectionCard}>
                <Text variant="h6" color="primary" weight="semibold" style={styles.sectionTitle}>
                    📊 Absensi Hari Ini
                </Text>
                <View style={styles.attendanceRow}>
                    <View style={styles.attendanceStat}>
                        <Text variant="h4" color="success" weight="bold">{todayAttendance}</Text>
                        <Text variant="caption" color="secondary">Hadir</Text>
                    </View>
                    <View style={styles.attendanceStat}>
                        <Text variant="h4" color="warning" weight="bold">
                            {attendance.filter((a: any) => a.status === 'late').length}
                        </Text>
                        <Text variant="caption" color="secondary">Terlambat</Text>
                    </View>
                    <View style={styles.attendanceStat}>
                        <Text variant="h4" color="error" weight="bold">
                            {students.length - todayAttendance}
                        </Text>
                        <Text variant="caption" color="secondary">Belum Absen</Text>
                    </View>
                </View>
                <Button
                    title="Lihat Detail Absensi"
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                />
            </Card>

            {/* Project Progress */}
            <Card style={styles.sectionCard}>
                <Text variant="h6" color="primary" weight="semibold" style={styles.sectionTitle}>
                    🔧 Progress Proyek
                </Text>
                <View style={styles.projectList}>
                    {recentProjects.map((project: any) => (
                        <View key={project.id} style={styles.projectItem}>
                            <View style={styles.projectInfo}>
                                <Text variant="body1" weight="medium">{project.title}</Text>
                                <Text variant="caption" color="secondary">
                                    {students.find((s: any) => s.id === project.students[0])?.name || 'Unknown'}
                                </Text>
                            </View>
                            <View style={styles.projectProgress}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${project.progress}%` }
                                        ]}
                                    />
                                </View>
                                <Text variant="caption" color="secondary">{project.progress}%</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Button
                    title="Kelola Semua Proyek"
                    variant="primary"
                    size="sm"
                    style={styles.actionButton}
                />
            </Card>

            {/* Service Status */}
            <Card style={styles.sectionCard}>
                <Text variant="h6" color="primary" weight="semibold" style={styles.sectionTitle}>
                    🚗 Status Service
                </Text>
                <View style={styles.serviceStats}>
                    <View style={styles.serviceStat}>
                        <Text variant="h5" color="warning" weight="bold">{pendingServices}</Text>
                        <Text variant="caption" color="secondary">Menunggu</Text>
                    </View>
                    <View style={styles.serviceStat}>
                        <Text variant="h5" color="primary" weight="bold">
                            {vehicles.filter((v: any) =>
                                v.serviceHistory.some((s: any) => s.status === 'in-progress')
                            ).length}
                        </Text>
                        <Text variant="caption" color="secondary">Dalam Proses</Text>
                    </View>
                    <View style={styles.serviceStat}>
                        <Text variant="h5" color="success" weight="bold">
                            {vehicles.filter((v: any) =>
                                v.serviceHistory.some((s: any) => s.status === 'completed')
                            ).length}
                        </Text>
                        <Text variant="caption" color="secondary">Selesai</Text>
                    </View>
                </View>
                <Button
                    title="Lihat Service Tracking"
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                />
            </Card>

            {/* Inventory Alerts */}
            <Card style={styles.sectionCard}>
                <Text variant="h6" color="primary" weight="semibold" style={styles.sectionTitle}>
                    ⚠️ Alert Inventory
                </Text>
                {inventoryAlerts.slice(0, 3).map((alert: any) => (
                    <View key={alert.id} style={styles.alertItem}>
                        <Text variant="body2" weight="medium">{alert.message}</Text>
                        <Text variant="caption" color="secondary">
                            {new Date(alert.createdAt).toLocaleDateString('id-ID')}
                        </Text>
                    </View>
                ))}
                {inventoryAlerts.length > 3 && (
                    <Text variant="caption" color="secondary" style={styles.moreText}>
                        +{inventoryAlerts.length - 3} alert lainnya
                    </Text>
                )}
                <Button
                    title="Kelola Inventory"
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                />
            </Card>

            {/* Recent Notifications */}
            <Card style={styles.sectionCard}>
                <Text variant="h6" color="primary" weight="semibold" style={styles.sectionTitle}>
                    📢 Notifikasi Terbaru
                </Text>
                {notifications.slice(0, 3).map((notification: any) => (
                    <View key={notification.id} style={styles.notificationItem}>
                        <Text variant="body2" weight="medium">{notification.title}</Text>
                        <Text variant="caption" color="secondary">{notification.message}</Text>
                    </View>
                ))}
                {notifications.length > 3 && (
                    <Button
                        title={`Lihat ${notifications.length - 3} Notifikasi Lainnya`}
                        variant="ghost"
                        size="sm"
                        style={styles.viewMoreButton}
                    />
                )}
            </Card>

            {/* Quick Actions */}
            <Card style={styles.sectionCard}>
                <Text variant="h6" color="primary" weight="semibold" style={styles.sectionTitle}>
                    ⚡ Aksi Cepat
                </Text>
                <View style={styles.quickActions}>
                    <Button
                        title="📋 Buat Laporan"
                        variant="outline"
                        size="sm"
                        style={styles.quickButton}
                    />
                    <Button
                        title="📊 Analitik"
                        variant="outline"
                        size="sm"
                        style={styles.quickButton}
                    />
                    <Button
                        title="📅 Jadwal Baru"
                        variant="outline"
                        size="sm"
                        style={styles.quickButton}
                    />
                    <Button
                        title="🔔 Kirim Notifikasi"
                        variant="outline"
                        size="sm"
                        style={styles.quickButton}
                    />
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    statsContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    sectionCard: {
        margin: 16,
        marginTop: 0,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    attendanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    attendanceStat: {
        alignItems: 'center',
    },
    projectList: {
        marginBottom: 16,
    },
    projectItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    projectInfo: {
        flex: 1,
    },
    projectProgress: {
        alignItems: 'flex-end',
        width: 100,
    },
    progressBar: {
        width: 80,
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007bff',
        borderRadius: 3,
    },
    serviceStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    serviceStat: {
        alignItems: 'center',
    },
    alertItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    notificationItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    moreText: {
        textAlign: 'center',
        marginTop: 8,
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    quickButton: {
        flex: 1,
        minWidth: '45%',
    },
    actionButton: {
        marginTop: 16,
    },
    viewMoreButton: {
        marginTop: 8,
    },
});