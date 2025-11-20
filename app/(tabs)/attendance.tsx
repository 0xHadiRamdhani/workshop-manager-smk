import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useStore } from '@/src/store';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function AttendanceScreen() {
    const { attendance, addAttendance, currentUser } = useStore();
    const [isScanning, setIsScanning] = useState(false);
    const [todayAttendance, setTodayAttendance] = useState<any>(null);

    useEffect(() => {
        // Check today's attendance
        const today = new Date().toISOString().split('T')[0];
        const todayRecord = attendance.find(
            (record: any) => record.studentId === currentUser?.id && record.date.startsWith(today)
        );
        setTodayAttendance(todayRecord);
    }, [attendance, currentUser]);

    const handleScanQR = () => {
        setIsScanning(true);
        // Simulate QR scanning
        setTimeout(() => {
            setIsScanning(false);
            const newAttendance = {
                id: Date.now().toString(),
                studentId: currentUser?.id || 'student-1',
                date: new Date().toISOString(),
                status: 'present',
                checkInTime: new Date().toISOString(),
                qrCode: 'QR-' + Date.now(),
            };
            addAttendance(newAttendance);
            Alert.alert('Sukses', 'Absensi berhasil dicatat!');
        }, 2000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return '#4CAF50';
            case 'late': return '#FF9800';
            case 'absent': return '#F44336';
            default: return '#9E9E9E';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'present': return 'Hadir';
            case 'late': return 'Terlambat';
            case 'absent': return 'Tidak Hadir';
            default: return 'Status Tidak Diketahui';
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Absensi Digital</Text>
                <Text style={styles.subtitle}>
                    Scan QR Code untuk absensi harian
                </Text>

                {/* Today's Attendance Status */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Status Absensi Hari Ini</Text>
                    {todayAttendance ? (
                        <View style={styles.attendanceStatus}>
                            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(todayAttendance.status) }]} />
                            <View style={styles.statusInfo}>
                                <Text style={styles.statusText}>{getStatusText(todayAttendance.status)}</Text>
                                <Text style={styles.timeText}>
                                    Check-in: {new Date(todayAttendance.checkInTime).toLocaleTimeString('id-ID')}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.noAttendanceText}>Belum absen hari ini</Text>
                    )}
                </Card>

                {/* QR Scanner */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Scan QR Code</Text>
                    <View style={styles.qrContainer}>
                        <View style={styles.qrPlaceholder}>
                            <Text style={styles.qrText}>📷</Text>
                            <Text style={styles.qrSubtext}>
                                {isScanning ? 'Memindai...' : 'Arahkan kamera ke QR Code'}
                            </Text>
                        </View>
                    </View>
                    <Button
                        title={isScanning ? "Memindai..." : "Scan QR Code"}
                        variant="primary"
                        onPress={handleScanQR}
                        disabled={isScanning || !!todayAttendance}
                        style={styles.scanButton}
                    />
                </Card>

                {/* Attendance History */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Riwayat Absensi</Text>
                    {attendance.length === 0 ? (
                        <Text style={styles.emptyText}>Belum ada riwayat absensi</Text>
                    ) : (
                        <View style={styles.historyList}>
                            {attendance.slice(0, 7).map((record: any) => (
                                <View key={record.id} style={styles.historyItem}>
                                    <View style={styles.historyLeft}>
                                        <Text style={styles.dateText}>
                                            {new Date(record.date).toLocaleDateString('id-ID')}
                                        </Text>
                                        <Text style={styles.timeText}>
                                            {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString('id-ID') : '-'}
                                        </Text>
                                    </View>
                                    <View style={styles.historyRight}>
                                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(record.status) }]}>
                                            <Text style={styles.statusBadgeText}>{getStatusText(record.status)}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </Card>

                {/* Attendance Stats */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Statistik Absensi</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {attendance.filter((r: any) => r.status === 'present').length}
                            </Text>
                            <Text style={styles.statLabel}>Hadir</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {attendance.filter((r: any) => r.status === 'late').length}
                            </Text>
                            <Text style={styles.statLabel}>Terlambat</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {attendance.filter((r: any) => r.status === 'absent').length}
                            </Text>
                            <Text style={styles.statLabel}>Tidak Hadir</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{attendance.length}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    card: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    attendanceStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    statusInfo: {
        flex: 1,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    noAttendanceText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    qrContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    qrPlaceholder: {
        width: 200,
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    qrText: {
        fontSize: 48,
        marginBottom: 8,
    },
    qrSubtext: {
        fontSize: 14,
        color: '#666',
    },
    scanButton: {
        marginTop: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    historyList: {
        gap: 12,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    historyLeft: {
        flex: 1,
    },
    historyRight: {
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusBadgeText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
});