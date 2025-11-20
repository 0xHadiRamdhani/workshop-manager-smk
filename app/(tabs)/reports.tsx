import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useStore } from '@/src/store';
import { Report } from '@/src/types';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ReportsScreen() {
    const { reports, addReport, currentUser } = useStore();
    const [selectedReportType, setSelectedReportType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('daily');

    const handleGenerateReport = () => {
        const newReport = {
            id: Date.now().toString(),
            type: selectedReportType,
            title: `Laporan ${selectedReportType} - ${new Date().toLocaleDateString('id-ID')}`,
            date: new Date().toISOString(),
            status: 'draft' as Report['status'],
            data: {
                totalStudents: 45,
                activeProjects: 12,
                completedServices: 28,
                inventoryAlerts: 3,
                mentorSessions: 15,
            },
            summary: {
                performance: 'Baik',
                issues: ['Kurangnya suku cadang untuk proyek mesin'],
                recommendations: ['Tambah stok bearing dan seal kit'],
            },
        };
        addReport(newReport);
    };

    const getReportIcon = (type: string) => {
        switch (type) {
            case 'daily': return '📊';
            case 'weekly': return '📈';
            case 'monthly': return '📉';
            default: return '📋';
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Sistem Pelaporan Real-time</Text>
                <Text style={styles.subtitle}>
                    Untuk Guru dan Pembimbing
                </Text>

                {/* Report Type Selection */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Jenis Laporan</Text>
                    <View style={styles.reportTypeContainer}>
                        {[
                            { type: 'daily', label: 'Harian' },
                            { type: 'weekly', label: 'Mingguan' },
                            { type: 'monthly', label: 'Bulanan' },
                            { type: 'custom', label: 'Kustom' },
                        ].map(({ type, label }) => (
                            <Button
                                key={type}
                                title={label}
                                variant={selectedReportType === type ? 'primary' : 'outline'}
                                size="sm"
                                onPress={() => setSelectedReportType(type as any)}
                                style={styles.reportTypeButton}
                            />
                        ))}
                    </View>
                </Card>

                {/* Generate Report */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Buat Laporan Baru</Text>
                    <Text style={styles.cardDescription}>
                        Laporan akan mencakup data siswa, proyek, layanan, dan analitik performa
                    </Text>
                    <Button
                        title="Generate Laporan"
                        variant="primary"
                        onPress={handleGenerateReport}
                        style={styles.generateButton}
                    />
                </Card>

                {/* Recent Reports */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Laporan Terbaru</Text>
                    {reports.length === 0 ? (
                        <Text style={styles.emptyText}>Belum ada laporan yang dibuat</Text>
                    ) : (
                        <View style={styles.reportsList}>
                            {reports.slice(0, 5).map((report: any) => (
                                <View key={report.id} style={styles.reportItem}>
                                    <View style={styles.reportHeader}>
                                        <Text style={styles.reportTitle}>
                                            {getReportIcon(report.type)} {report.title}
                                        </Text>
                                        <Text style={styles.reportDate}>
                                            {new Date(report.date).toLocaleDateString('id-ID')}
                                        </Text>
                                    </View>
                                    <Text style={styles.reportStatus}>
                                        Status: {report.status === 'draft' ? 'Draft' : 'Disetujui'}
                                    </Text>
                                    <View style={styles.reportStats}>
                                        <Text style={styles.statText}>
                                            📚 {report.data.totalStudents} Siswa
                                        </Text>
                                        <Text style={styles.statText}>
                                            🔧 {report.data.activeProjects} Proyek
                                        </Text>
                                        <Text style={styles.statText}>
                                            ⚠️ {report.data.inventoryAlerts} Alert
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </Card>

                {/* Quick Stats */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Statistik Cepat</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>45</Text>
                            <Text style={styles.statLabel}>Total Siswa</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Proyek Aktif</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>28</Text>
                            <Text style={styles.statLabel}>Servis Selesai</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Alert Inventory</Text>
                        </View>
                    </View>
                </Card>

                {/* Export Options */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Export Laporan</Text>
                    <View style={styles.exportButtons}>
                        <Button title="📄 PDF" variant="outline" size="sm" />
                        <Button title="📊 Excel" variant="outline" size="sm" />
                        <Button title="📋 Print" variant="outline" size="sm" />
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    card: {
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    reportTypeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    reportTypeButton: {
        marginRight: 8,
        marginBottom: 8,
    },
    generateButton: {
        marginTop: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    reportsList: {
        gap: 12,
    },
    reportItem: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    reportTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    reportDate: {
        fontSize: 12,
        color: '#666',
    },
    reportStatus: {
        fontSize: 12,
        color: '#007bff',
        marginBottom: 8,
    },
    reportStats: {
        flexDirection: 'row',
        gap: 12,
    },
    statText: {
        fontSize: 12,
        color: '#666',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007bff',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    exportButtons: {
        flexDirection: 'row',
        gap: 8,
    },
});