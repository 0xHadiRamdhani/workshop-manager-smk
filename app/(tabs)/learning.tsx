import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Text } from '@/src/components/ui/Text';
import { useStore } from '@/src/store';
import { theme } from '@/src/theme/colors';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LearningModuleScreen() {
    const { currentUser } = useStore();
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [arMode, setArMode] = useState(false);

    // Mock data for learning modules
    const learningModules = [
        {
            id: '1',
            title: 'Mesin & Transmisi',
            description: 'Pelajari sistem mesin dan transmisi kendaraan dengan simulasi interaktif',
            category: 'Mechanical',
            difficulty: 'Intermediate',
            duration: '45 menit',
            image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Mesin',
            arAvailable: true,
            vrAvailable: true,
            progress: 65,
        },
        {
            id: '2',
            title: 'Sistem Kelistrikan',
            description: 'Pemahaman mendalam tentang sistem kelistrikan otomotif',
            category: 'Electrical',
            difficulty: 'Advanced',
            duration: '60 menit',
            image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Kelistrikan',
            arAvailable: true,
            vrAvailable: false,
            progress: 30,
        },
        {
            id: '3',
            title: 'Sistem Rem & Suspensi',
            description: 'Analisis dan perbaikan sistem rem dan suspensi',
            category: 'Safety',
            difficulty: 'Intermediate',
            duration: '40 menit',
            image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Rem+Suspensi',
            arAvailable: false,
            vrAvailable: true,
            progress: 80,
        },
        {
            id: '4',
            title: 'Diagnostik OBD',
            description: 'Penggunaan scanner OBD untuk diagnosa kendaraan modern',
            category: 'Diagnostic',
            difficulty: 'Beginner',
            duration: '30 menit',
            image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=OBD',
            arAvailable: true,
            vrAvailable: true,
            progress: 0,
        },
    ];

    const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'error' | 'primary' => {
        switch (difficulty) {
            case 'Beginner':
                return 'success';
            case 'Intermediate':
                return 'warning';
            case 'Advanced':
                return 'error';
            default:
                return 'primary';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Mechanical':
                return '🔧';
            case 'Electrical':
                return '⚡';
            case 'Safety':
                return '🛡️';
            case 'Diagnostic':
                return '🔍';
            default:
                return '📚';
        }
    };

    const handleStartModule = (moduleId: string) => {
        setSelectedModule(moduleId);
        // Navigate to module detail or start AR/VR experience
    };

    const handleARToggle = () => {
        setArMode(!arMode);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="h4" color="primary" weight="semibold">
                    Modul Pembelajaran
                </Text>
                <Text variant="body2" color="secondary">
                    Pilih modul untuk memulai pembelajaran interaktif
                </Text>
            </View>

            {/* AR/VR Mode Toggle */}
            <Card style={styles.modeToggle}>
                <View style={styles.toggleHeader}>
                    <Text variant="body1" weight="medium" color="primary">
                        Mode Pembelajaran
                    </Text>
                    <TouchableOpacity onPress={handleARToggle} style={styles.toggleButton}>
                        <Text variant="caption" color={arMode ? 'primary' : 'secondary'}>
                            {arMode ? 'AR Mode' : 'Normal Mode'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Card>

            {/* Learning Modules List */}
            <View style={styles.modulesContainer}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Modul Tersedia
                </Text>

                {learningModules.map((module) => (
                    <Card key={module.id} style={styles.moduleCard} onPress={() => handleStartModule(module.id)}>
                        <View style={styles.moduleHeader}>
                            <Image source={{ uri: module.image }} style={styles.moduleImage} />
                            <View style={styles.moduleInfo}>
                                <Text variant="h6" weight="semibold" color="primary">
                                    {module.title}
                                </Text>
                                <Text variant="caption" color="secondary">
                                    {getCategoryIcon(module.category)} {module.category}
                                </Text>
                            </View>
                        </View>

                        <Text variant="body2" color="secondary" style={styles.moduleDescription}>
                            {module.description}
                        </Text>

                        <View style={styles.moduleDetails}>
                            <View style={styles.detailItem}>
                                <Text variant="caption" color="tertiary">
                                    Durasi: {module.duration}
                                </Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text variant="caption" color={getDifficultyColor(module.difficulty)}>
                                    {module.difficulty}
                                </Text>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${module.progress}%`, backgroundColor: getDifficultyColor(module.difficulty) }
                                    ]}
                                />
                            </View>
                            <Text variant="caption" color="secondary">
                                {module.progress}% Selesai
                            </Text>
                        </View>

                        {/* AR/VR Indicators */}
                        <View style={styles.techIndicators}>
                            {module.arAvailable && (
                                <View style={styles.techBadge}>
                                    <Text variant="caption" color="primary">
                                        📱 AR Ready
                                    </Text>
                                </View>
                            )}
                            {module.vrAvailable && (
                                <View style={styles.techBadge}>
                                    <Text variant="caption" color="primary">
                                        🥽 VR Ready
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Button
                            title={module.progress > 0 ? 'Lanjutkan' : 'Mulai'}
                            variant={module.progress > 0 ? 'secondary' : 'primary'}
                            size="sm"
                            fullWidth
                            onPress={() => handleStartModule(module.id)}
                        />
                    </Card>
                ))}
            </View>

            {/* Recommended Modules */}
            <View style={styles.recommendedContainer}>
                <Text variant="h5" color="primary" weight="semibold" style={styles.sectionTitle}>
                    Rekomendasi untuk Anda
                </Text>

                <Card style={styles.recommendedCard}>
                    <Text variant="h6" weight="medium" color="primary">
                        🔧 Sistem Transmisi Manual
                    </Text>
                    <Text variant="body2" color="secondary" style={styles.recommendedDescription}>
                        Lanjutkan pembelajaran Anda tentang sistem transmisi manual dengan simulasi 3D interaktif.
                    </Text>
                    <Button
                        title="Lanjutkan Belajar"
                        variant="primary"
                        size="sm"
                        onPress={() => { }}
                    />
                </Card>
            </View>

            {/* Learning Stats */}
            <Card style={styles.statsCard}>
                <Text variant="h6" weight="medium" color="primary" style={styles.statsTitle}>
                    Progress Belajar Anda
                </Text>

                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text variant="h5" color="success" weight="bold">
                            12
                        </Text>
                        <Text variant="caption" color="secondary">
                            Modul Selesai
                        </Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text variant="h5" color="primary" weight="bold">
                            45
                        </Text>
                        <Text variant="caption" color="secondary">
                            Jam Belajar
                        </Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text variant="h5" color="warning" weight="bold">
                            3
                        </Text>
                        <Text variant="caption" color="secondary">
                            Sedang Berlangsung
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
    modeToggle: {
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
    },
    toggleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleButton: {
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: theme.borderRadius.sm,
    },
    modulesContainer: {
        paddingHorizontal: theme.spacing.lg,
    },
    sectionTitle: {
        marginBottom: theme.spacing.md,
    },
    moduleCard: {
        marginBottom: theme.spacing.md,
    },
    moduleHeader: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    moduleImage: {
        width: 80,
        height: 60,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.md,
    },
    moduleInfo: {
        flex: 1,
    },
    moduleDescription: {
        marginBottom: theme.spacing.md,
    },
    moduleDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    detailItem: {
        flex: 1,
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
    techIndicators: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    techBadge: {
        backgroundColor: theme.colors.background.tertiary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.sm,
    },
    recommendedContainer: {
        paddingHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
    },
    recommendedCard: {
        marginBottom: theme.spacing.md,
    },
    recommendedDescription: {
        marginVertical: theme.spacing.md,
    },
    statsCard: {
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
    },
    statsTitle: {
        marginBottom: theme.spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
});