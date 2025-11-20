import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Text } from '@/src/components/ui/Text';
import { useStore } from '@/src/store';
import { theme } from '@/src/theme/colors';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function ServicesScreen() {
    const { vehicles, services, addNotification, updateServiceStatus } = useStore();
    const [scanned, setScanned] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [activeServices, setActiveServices] = useState<any[]>([]);

    useEffect(() => {
        // Filter active services
        const active = services.filter((service: any) =>
            service.status === 'pending' || service.status === 'in-progress'
        );
        setActiveServices(active);
    }, [services]);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        setScanning(false);

        // Find vehicle by QR code
        const vehicle = vehicles.find((v: any) => v.qrCode === data);

        if (vehicle) {
            // Find related services
            const vehicleServices = services.filter((s: any) => s.vehicleId === vehicle.id);

            if (vehicleServices.length > 0) {
                setSelectedService(vehicleServices[0]);

                // Add notification
                addNotification({
                    id: Date.now().toString(),
                    userId: 'current-user',
                    title: 'Service Ditemukan',
                    message: `Kendaraan ${vehicle.licensePlate} - ${vehicle.brand} ${vehicle.model}`,
                    type: 'success',
                    read: false,
                    createdAt: new Date(),
                    data: { vehicleId: vehicle.id, serviceId: vehicleServices[0].id }
                });
            } else {
                Alert.alert('Info', 'Tidak ada service aktif untuk kendaraan ini');
            }
        } else {
            Alert.alert('Error', 'QR Code tidak valid atau kendaraan tidak ditemukan');
        }
    };

    const startScanning = () => {
        setScanning(true);
        setScanned(false);
    };

    const stopScanning = () => {
        setScanning(false);
        setScanned(false);
    };

    const updateService = (serviceId: string, newStatus: string) => {
        updateServiceStatus(serviceId, newStatus);

        addNotification({
            id: Date.now().toString(),
            userId: 'current-user',
            title: 'Status Service Diperbarui',
            message: `Service berhasil diperbarui menjadi ${newStatus}`,
            type: 'info',
            read: false,
            createdAt: new Date(),
            data: { serviceId, status: newStatus }
        });
    };

    const getStatusColor = (status: string) => {
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
                return theme.colors.neutral[60];
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Menunggu';
            case 'in-progress':
                return 'Dalam Proses';
            case 'completed':
                return 'Selesai';
            case 'cancelled':
                return 'Dibatalkan';
            default:
                return status;
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="h4" color="primary" weight="semibold">
                    Tracking Service
                </Text>
                <Text variant="body2" color="secondary">
                    Scan QR code untuk tracking service kendaraan
                </Text>
            </View>

            {/* QR Scanner Section */}
            <Card style={styles.scannerCard}>
                <Text variant="h6" weight="medium" color="primary" style={styles.scannerTitle}>
                    Scanner QR Code
                </Text>

                {!scanning ? (
                    <View style={styles.scannerPlaceholder}>
                        <Text variant="body2" color="secondary" style={styles.scannerText}>
                            Tekan tombol untuk memulai scanning
                        </Text>
                        <Button
                            title="Scan QR Code"
                            variant="primary"
                            size="lg"
                            onPress={startScanning}
                        />
                    </View>
                ) : (
                    <View style={styles.scannerActive}>
                        <View style={styles.qrFrame}>
                            <Text variant="caption" color="primary" style={styles.scanInstruction}>
                                Arahkan kamera ke QR Code
                            </Text>
                        </View>
                        <Button
                            title="Stop Scanning"
                            variant="error"
                            size="sm"
                            onPress={stopScanning}
                            style={styles.stopButton}
                        />
                    </View>
                )}
            </Card>

            {/* Active Services */}
            <View style={styles.servicesSection}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Service Aktif ({activeServices.length})
                </Text>

                {activeServices.map((service: any) => (
                    <Card key={service.id} style={styles.serviceCard}>
                        <View style={styles.serviceHeader}>
                            <View style={styles.serviceInfo}>
                                <Text variant="body1" weight="medium" color="primary">
                                    Service #{service.id}
                                </Text>
                                <Text variant="caption" color="secondary">
                                    {service.vehicle?.licensePlate} - {service.vehicle?.brand} {service.vehicle?.model}
                                </Text>
                            </View>

                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(service.status) }
                            ]}>
                                <Text variant="caption" color="inverse">
                                    {getStatusText(service.status)}
                                </Text>
                            </View>
                        </View>

                        <Text variant="body2" color="secondary" style={styles.serviceDescription}>
                            {service.description}
                        </Text>

                        <View style={styles.serviceDetails}>
                            <View style={styles.detailRow}>
                                <Text variant="caption" color="tertiary">Tanggal Masuk:</Text>
                                <Text variant="caption" color="secondary">
                                    {new Date(service.date).toLocaleDateString('id-ID')}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text variant="caption" color="tertiary">Estimasi Selesai:</Text>
                                <Text variant="caption" color="secondary">
                                    {service.estimatedCompletion ?
                                        new Date(service.estimatedCompletion).toLocaleDateString('id-ID') :
                                        'Belum ditentukan'
                                    }
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text variant="caption" color="tertiary">Teknisi:</Text>
                                <Text variant="caption" color="secondary">
                                    {service.assignedStudents?.length || 0} Siswa
                                </Text>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${service.progress || 0}%`, backgroundColor: getStatusColor(service.status) }
                                    ]}
                                />
                            </View>
                            <Text variant="caption" color="secondary">
                                {service.progress || 0}% Selesai
                            </Text>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionButtons}>
                            <Button
                                title="Detail"
                                variant="outline"
                                size="sm"
                                onPress={() => { }}
                            />

                            {service.status === 'pending' && (
                                <Button
                                    title="Mulai"
                                    variant="primary"
                                    size="sm"
                                    onPress={() => updateService(service.id, 'in-progress')}
                                />
                            )}

                            {service.status === 'in-progress' && (
                                <Button
                                    title="Selesai"
                                    variant="success"
                                    size="sm"
                                    onPress={() => updateService(service.id, 'completed')}
                                />
                            )}
                        </View>
                    </Card>
                ))}
            </View>

            {/* Recent Updates */}
            <View style={styles.updatesSection}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Update Terbaru
                </Text>

                <Card style={styles.updateCard}>
                    <View style={styles.updateHeader}>
                        <Text variant="body2" weight="medium" color="primary">
                            Service #SVC-2024-001
                        </Text>
                        <Text variant="caption" color="tertiary">
                            2 jam yang lalu
                        </Text>
                    </View>

                    <Text variant="body2" color="secondary">
                        Status diperbarui: Menunggu → Dalam Proses
                    </Text>
                </Card>

                <Card style={styles.updateCard}>
                    <View style={styles.updateHeader}>
                        <Text variant="body2" weight="medium" color="primary">
                            Service #SVC-2024-002
                        </Text>
                        <Text variant="caption" color="tertiary">
                            5 jam yang lalu
                        </Text>
                    </View>

                    <Text variant="body2" color="secondary">
                        Status diperbarui: Dalam Proses → Selesai
                    </Text>
                </Card>
            </View>
        </ScrollView>
    );
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
    scannerCard: {
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
    },
    scannerTitle: {
        marginBottom: theme.spacing.md,
    },
    scannerPlaceholder: {
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    scannerText: {
        marginBottom: theme.spacing.lg,
        textAlign: 'center',
    },
    scannerActive: {
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    qrFrame: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: theme.colors.primary[500],
        borderRadius: theme.borderRadius.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    scanInstruction: {
        marginTop: theme.spacing.md,
    },
    stopButton: {
        marginTop: theme.spacing.md,
    },
    servicesSection: {
        paddingHorizontal: theme.spacing.lg,
    },
    sectionTitle: {
        marginBottom: theme.spacing.md,
    },
    serviceCard: {
        marginBottom: theme.spacing.md,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    serviceInfo: {
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    serviceDescription: {
        marginBottom: theme.spacing.md,
    },
    serviceDetails: {
        marginBottom: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xs,
    },
    progressContainer: {
        marginBottom: theme.spacing.md,
    },
    progressBar: {
        height: 4,
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.xs,
    },
    progressFill: {
        height: '100%',
        borderRadius: theme.borderRadius.sm,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    updatesSection: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    updateCard: {
        marginBottom: theme.spacing.sm,
    },
    updateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
});