import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Text } from '../components/ui/Text';
import { useStore } from '../store';
import { theme } from '../theme/colors';
import type { InventoryAlert } from '../types';

export const InventoryScreen: React.FC = () => {
    const { parts, inventoryAlerts, addInventoryAlert, resolveInventoryAlert, addNotification } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lowStockParts, setLowStockParts] = useState<any[]>([]);

    // Mock inventory data
    const mockParts = [
        {
            id: '1',
            name: 'Oli Mesin 10W-40',
            partNumber: 'OIL-10W40-1L',
            category: 'Fluids',
            brand: 'Castrol',
            price: 85000,
            stock: 15,
            minStock: 20,
            location: 'Rak A-1',
            supplier: 'PT. Otomotif Sejahtera',
            image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=Oli',
        },
        {
            id: '2',
            name: 'Filter Udara',
            partNumber: 'AIR-FILTER-001',
            category: 'Filters',
            brand: 'Bosch',
            price: 120000,
            stock: 8,
            minStock: 10,
            location: 'Rak B-2',
            supplier: 'PT. Filter Indonesia',
            image: 'https://via.placeholder.com/100x100/2196F3/FFFFFF?text=Filter',
        },
        {
            id: '3',
            name: 'Kampas Rem Depan',
            partNumber: 'BRAKE-PAD-FRONT',
            category: 'Brakes',
            brand: 'Akebono',
            price: 350000,
            stock: 25,
            minStock: 15,
            location: 'Rak C-3',
            supplier: 'PT. Rem Sehat',
            image: 'https://via.placeholder.com/100x100/FF9800/FFFFFF?text=Rem',
        },
        {
            id: '4',
            name: 'Busi Iridium',
            partNumber: 'SPARK-PLUG-IRI',
            category: 'Ignition',
            brand: 'NGK',
            price: 95000,
            stock: 5,
            minStock: 12,
            location: 'Rak D-1',
            supplier: 'PT. Busi Nusantara',
            image: 'https://via.placeholder.com/100x100/9C27B0/FFFFFF?text=Busi',
        },
        {
            id: '5',
            name: 'Thermostat',
            partNumber: 'THERMO-001',
            category: 'Cooling',
            brand: 'Gates',
            price: 180000,
            stock: 3,
            minStock: 8,
            location: 'Rak E-2',
            supplier: 'PT. Pendingin Mobil',
            image: 'https://via.placeholder.com/100x100/F44336/FFFFFF?text=Thermo',
        },
    ];

    const categories = ['all', 'Fluids', 'Filters', 'Brakes', 'Ignition', 'Cooling', 'Electrical', 'Suspension'];

    useEffect(() => {
        // Check for low stock parts
        const lowStock = mockParts.filter(part => part.stock <= part.minStock);
        setLowStockParts(lowStock);

        // Generate alerts for low stock
        lowStock.forEach(part => {
            if (!inventoryAlerts.find((alert: InventoryAlert) => alert.partId === part.id && !alert.resolved)) {
                addInventoryAlert({
                    id: Date.now().toString(),
                    partId: part.id,
                    type: 'low-stock',
                    message: `Stok ${part.name} hampir habis (${part.stock} tersedia)`,
                    severity: part.stock === 0 ? 'high' : part.stock <= part.minStock / 2 ? 'medium' : 'low',
                    createdAt: new Date(),
                    resolved: false,
                });

                addNotification({
                    id: Date.now().toString() + '-alert',
                    userId: 'current-user',
                    title: 'Alert Inventory',
                    message: `Stok ${part.name} hampir habis (${part.stock} tersedia)`,
                    type: 'warning',
                    read: false,
                    createdAt: new Date(),
                    data: { partId: part.id, currentStock: part.stock, minStock: part.minStock }
                });
            }
        });
    }, [mockParts, inventoryAlerts]);

    const filteredParts = mockParts.filter(part => {
        const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStockStatus = (stock: number, minStock: number) => {
        if (stock === 0) return { status: 'Habis', color: 'error' };
        if (stock <= minStock / 2) return { status: 'Kritis', color: 'error' };
        if (stock <= minStock) return { status: 'Rendah', color: 'warning' };
        return { status: 'Normal', color: 'success' };
    };

    const getStockColor = (stock: number, minStock: number) => {
        const status = getStockStatus(stock, minStock);
        switch (status.color) {
            case 'error':
                return theme.colors.error[500];
            case 'warning':
                return theme.colors.warning[500];
            case 'success':
                return theme.colors.success[500];
            default:
                return theme.colors.neutral[60];
        }
    };

    const handleOrderPart = (partId: string) => {
        const part = mockParts.find(p => p.id === partId);
        if (part) {
            window.alert(
                `Pesan ${part.name} dari ${part.supplier}?`
            );
            addNotification({
                id: Date.now().toString(),
                userId: 'current-user',
                title: 'Pemesanan Dikirim',
                message: `Pemesanan ${part.name} telah dikirim ke ${part.supplier}`,
                type: 'success',
                read: false,
                createdAt: new Date(),
                data: { partId, supplier: part.supplier }
            });
        }
    };

    const handleUpdateStock = (partId: string, newStock: number) => {
        addNotification({
            id: Date.now().toString(),
            userId: 'current-user',
            title: 'Stok Diperbarui',
            message: `Stok telah diperbarui menjadi ${newStock} unit`,
            type: 'info',
            read: false,
            createdAt: new Date(),
            data: { partId, newStock }
        });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="h4" color="primary" weight="semibold">
                    Manajemen Inventory
                </Text>
                <Text variant="body2" color="secondary">
                    Kelola stok suku cadang dan monitoring inventory
                </Text>
            </View>

            {/* Alerts Section */}
            {inventoryAlerts.filter((alert: InventoryAlert) => !alert.resolved).length > 0 && (
                <View style={styles.alertsSection}>
                    <Text variant="h6" color="error" weight="medium" style={styles.alertTitle}>
                        ⚠️ Alert Inventory ({inventoryAlerts.filter((alert: InventoryAlert) => !alert.resolved).length})
                    </Text>

                    {inventoryAlerts.filter((alert: InventoryAlert) => !alert.resolved).map((alert: InventoryAlert) => (
                        <Card key={alert.id} style={styles.alertCard} variant="outlined">
                            <View style={styles.alertHeader}>
                                <Text variant="body2" weight="medium" color="primary">
                                    {alert.message}
                                </Text>
                                <TouchableOpacity onPress={() => resolveInventoryAlert(alert.id)}>
                                    <Text variant="caption" color="primary">
                                        ✓ Tandai Selesai
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.alertDetails}>
                                <Text variant="caption" color="secondary">
                                    Severity: {alert.severity}
                                </Text>
                                <Text variant="caption" color="tertiary">
                                    {new Date(alert.createdAt).toLocaleTimeString('id-ID')}
                                </Text>
                            </View>
                        </Card>
                    ))}
                </View>
            )}

            {/* Search and Filter */}
            <Card style={styles.searchCard}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Cari suku cadang..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={theme.colors.text.tertiary}
                />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.categoryButtonActive
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                variant="caption"
                                color={selectedCategory === category ? 'inverse' : 'secondary'}
                            >
                                {category === 'all' ? 'Semua' : category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Card>

            {/* Low Stock Warning */}
            {lowStockParts.length > 0 && (
                <Card style={styles.warningCard} variant="outlined">
                    <Text variant="h6" color="warning" weight="medium" style={styles.warningTitle}>
                        ⚠️ Stok Rendah ({lowStockParts.length} item)
                    </Text>
                    <Text variant="body2" color="secondary">
                        Beberapa suku cadang memerlukan perhatian segera
                    </Text>
                </Card>
            )}

            {/* Parts List */}
            <View style={styles.partsSection}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Daftar Suku Cadang ({filteredParts.length})
                </Text>

                {filteredParts.map((part) => {
                    const stockStatus = getStockStatus(part.stock, part.minStock);

                    return (
                        <Card key={part.id} style={styles.partCard}>
                            <View style={styles.partHeader}>
                                <View style={styles.partImageContainer}>
                                    <Text variant="h4" color="secondary">
                                        📦
                                    </Text>
                                </View>

                                <View style={styles.partInfo}>
                                    <Text variant="body1" weight="medium" color="primary">
                                        {part.name}
                                    </Text>
                                    <Text variant="caption" color="secondary">
                                        {part.partNumber} • {part.brand}
                                    </Text>
                                    <Text variant="caption" color="tertiary">
                                        Lokasi: {part.location}
                                    </Text>
                                </View>

                                <View style={styles.stockInfo}>
                                    <Text variant="h6" color={stockStatus.color as any} weight="bold">
                                        {part.stock}
                                    </Text>
                                    <Text variant="caption" color="secondary">
                                        Unit Tersedia
                                    </Text>
                                    <View style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStockColor(part.stock, part.minStock) }
                                    ]}>
                                        <Text variant="caption" color="inverse">
                                            {stockStatus.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.partDetails}>
                                <View style={styles.detailRow}>
                                    <Text variant="caption" color="tertiary">Kategori:</Text>
                                    <Text variant="caption" color="secondary">{part.category}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text variant="caption" color="tertiary">Harga:</Text>
                                    <Text variant="caption" color="secondary">Rp {part.price.toLocaleString('id-ID')}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text variant="caption" color="tertiary">Min. Stok:</Text>
                                    <Text variant="caption" color="secondary">{part.minStock} unit</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text variant="caption" color="tertiary">Supplier:</Text>
                                    <Text variant="caption" color="secondary">{part.supplier}</Text>
                                </View>
                            </View>

                            <View style={styles.partActions}>
                                <Button
                                    title="Update Stok"
                                    variant="outline"
                                    size="sm"
                                    onPress={() => handleUpdateStock(part.id, part.stock + 10)}
                                />

                                {part.stock <= part.minStock && (
                                    <Button
                                        title="Pesan"
                                        variant="primary"
                                        size="sm"
                                        onPress={() => handleOrderPart(part.id)}
                                    />
                                )}
                            </View>
                        </Card>
                    );
                })}
            </View>

            {/* Inventory Summary */}
            <Card style={styles.summaryCard}>
                <Text variant="h6" weight="medium" color="primary" style={styles.summaryTitle}>
                    Ringkasan Inventory
                </Text>

                <View style={styles.summaryGrid}>
                    <View style={styles.summaryItem}>
                        <Text variant="h5" color="primary" weight="bold">
                            {mockParts.length}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Total Item
                        </Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text variant="h5" color="success" weight="bold">
                            {mockParts.filter(p => p.stock > p.minStock).length}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Stok Normal
                        </Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text variant="h5" color="warning" weight="bold">
                            {lowStockParts.length}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Stok Rendah
                        </Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text variant="h5" color="error" weight="bold">
                            {mockParts.filter(p => p.stock === 0).length}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Stok Habis
                        </Text>
                    </View>
                </View>
            </Card>
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
    alertsSection: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    alertTitle: {
        marginBottom: theme.spacing.md,
    },
    alertCard: {
        marginBottom: theme.spacing.sm,
        borderColor: theme.colors.error[500],
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    alertDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchCard: {
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
    },
    searchInput: {
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text.primary,
    },
    categoryScroll: {
        maxHeight: 40,
    },
    categoryButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.background.tertiary,
        marginRight: theme.spacing.sm,
    },
    categoryButtonActive: {
        backgroundColor: theme.colors.primary[500],
    },
    warningCard: {
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        borderColor: theme.colors.warning[500],
    },
    warningTitle: {
        marginBottom: theme.spacing.xs,
    },
    partsSection: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    sectionTitle: {
        marginBottom: theme.spacing.md,
    },
    partCard: {
        marginBottom: theme.spacing.md,
    },
    partHeader: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    partImageContainer: {
        width: 60,
        height: 60,
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: theme.borderRadius.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    partInfo: {
        flex: 1,
    },
    stockInfo: {
        alignItems: 'center',
        minWidth: 80,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        marginTop: theme.spacing.xs,
    },
    partDetails: {
        marginBottom: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xs,
    },
    partActions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    summaryCard: {
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
    },
    summaryTitle: {
        marginBottom: theme.spacing.md,
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
    },
});