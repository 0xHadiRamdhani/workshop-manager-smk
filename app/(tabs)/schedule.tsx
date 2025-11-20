import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Text } from '@/src/components/ui/Text';
import { useStore } from '@/src/store';
import { theme } from '@/src/theme/colors';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ScheduleScreen() {
    const { mentors, schedules, currentUser, addNotification } = useStore();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

    // Mock schedule data
    const mockSchedules = [
        {
            id: '1',
            mentorId: '1',
            day: 1, // Monday
            startTime: '08:00',
            endTime: '12:00',
            maxStudents: 5,
            currentStudents: 3,
            subject: 'Mesin & Transmisi',
            location: 'Bengkel A',
        },
        {
            id: '2',
            mentorId: '1',
            day: 1, // Monday
            startTime: '13:00',
            endTime: '17:00',
            maxStudents: 5,
            currentStudents: 2,
            subject: 'Sistem Kelistrikan',
            location: 'Bengkel B',
        },
        {
            id: '3',
            mentorId: '2',
            day: 2, // Tuesday
            startTime: '08:00',
            endTime: '12:00',
            maxStudents: 4,
            currentStudents: 4,
            subject: 'Sistem Rem & Suspensi',
            location: 'Bengkel C',
        },
        {
            id: '4',
            mentorId: '3',
            day: 3, // Wednesday
            startTime: '09:00',
            endTime: '15:00',
            maxStudents: 6,
            currentStudents: 1,
            subject: 'Diagnostik OBD',
            location: 'Lab Komputer',
        },
    ];

    const mockMentors = [
        {
            id: '1',
            name: 'Bpk. Andi Wijaya',
            expertise: ['Mesin', 'Transmisi', 'Kelistrikan'],
            rating: 4.8,
            avatar: '👨‍🏫',
        },
        {
            id: '2',
            name: 'Ibu. Siti Nurhaliza',
            expertise: ['Rem', 'Suspensi', 'Safety'],
            rating: 4.9,
            avatar: '👩‍🏫',
        },
        {
            id: '3',
            name: 'Bpk. Budi Santoso',
            expertise: ['Diagnostik', 'Elektronik', 'OBD'],
            rating: 4.7,
            avatar: '👨‍💻',
        },
    ];

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    const getDayName = (dayIndex: number) => {
        return days[dayIndex] || '';
    };

    const getMentorById = (mentorId: string) => {
        return mockMentors.find(m => m.id === mentorId);
    };

    const getScheduleForDay = (dayIndex: number) => {
        return mockSchedules.filter(schedule => schedule.day === dayIndex);
    };

    const getScheduleForTime = (time: string, dayIndex: number) => {
        return mockSchedules.find(schedule =>
            schedule.day === dayIndex &&
            time >= schedule.startTime &&
            time < schedule.endTime
        );
    };

    const handleBookSchedule = (scheduleId: string) => {
        const schedule = mockSchedules.find(s => s.id === scheduleId);
        if (schedule && schedule.currentStudents < schedule.maxStudents) {
            addNotification({
                id: Date.now().toString(),
                userId: currentUser?.id || 'student',
                title: 'Jadwal Berhasil Dipesan',
                message: `Anda berhasil memesan jadwal ${schedule.subject} dengan ${getMentorById(schedule.mentorId)?.name}`,
                type: 'success',
                read: false,
                createdAt: new Date(),
                data: { scheduleId, mentorId: schedule.mentorId }
            });
        } else {
            addNotification({
                id: Date.now().toString(),
                userId: currentUser?.id || 'student',
                title: 'Jadwal Penuh',
                message: 'Jadwal ini sudah penuh. Silakan pilih jadwal lain.',
                type: 'warning',
                read: false,
                createdAt: new Date(),
                data: { scheduleId }
            });
        }
    };

    const getAvailabilityColor = (current: number, max: number) => {
        const percentage = (current / max) * 100;
        if (percentage >= 90) return theme.colors.error[500];
        if (percentage >= 70) return theme.colors.warning[500];
        return theme.colors.success[500];
    };

    const renderDailyView = () => {
        const today = selectedDate.getDay();
        const todaySchedules = getScheduleForDay(today);

        return (
            <View style={styles.dailyView}>
                <Text variant="h6" color="primary" weight="medium" style={styles.dateHeader}>
                    {getDayName(today)}, {selectedDate.toLocaleDateString('id-ID')}
                </Text>

                {todaySchedules.length === 0 ? (
                    <Card style={styles.emptySchedule}>
                        <Text variant="body2" color="secondary" style={styles.emptyText}>
                            Tidak ada jadwal untuk hari ini
                        </Text>
                    </Card>
                ) : (
                    todaySchedules.map((schedule) => {
                        const mentor = getMentorById(schedule.mentorId);
                        const isFull = schedule.currentStudents >= schedule.maxStudents;

                        return (
                            <Card key={schedule.id} style={styles.scheduleCard}>
                                <View style={styles.scheduleHeader}>
                                    <View style={styles.mentorInfo}>
                                        <Text variant="h6" style={styles.mentorAvatar}>
                                            {mentor?.avatar}
                                        </Text>
                                        <View style={styles.mentorDetails}>
                                            <Text variant="body1" weight="medium" color="primary">
                                                {mentor?.name}
                                            </Text>
                                            <Text variant="caption" color="secondary">
                                                {schedule.subject}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ratingContainer}>
                                        <Text variant="caption" color="warning">
                                            ⭐ {mentor?.rating}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.scheduleDetails}>
                                    <View style={styles.detailRow}>
                                        <Text variant="caption" color="tertiary">Waktu:</Text>
                                        <Text variant="caption" color="secondary">
                                            {schedule.startTime} - {schedule.endTime}
                                        </Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text variant="caption" color="tertiary">Lokasi:</Text>
                                        <Text variant="caption" color="secondary">
                                            {schedule.location}
                                        </Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text variant="caption" color="tertiary">Kapasitas:</Text>
                                        <Text variant="caption" color="secondary">
                                            {schedule.currentStudents}/{schedule.maxStudents} siswa
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.capacityBar}>
                                    <View
                                        style={[
                                            styles.capacityFill,
                                            {
                                                width: `${(schedule.currentStudents / schedule.maxStudents) * 100}%`,
                                                backgroundColor: getAvailabilityColor(schedule.currentStudents, schedule.maxStudents)
                                            }
                                        ]}
                                    />
                                </View>

                                <View style={styles.scheduleActions}>
                                    <Button
                                        title={isFull ? 'Penuh' : 'Pesan'}
                                        variant={isFull ? 'error' : 'primary'}
                                        size="sm"
                                        disabled={isFull}
                                        onPress={() => handleBookSchedule(schedule.id)}
                                    />

                                    <Button
                                        title="Detail"
                                        variant="outline"
                                        size="sm"
                                        onPress={() => setSelectedMentor(schedule.mentorId)}
                                    />
                                </View>
                            </Card>
                        );
                    })
                )}
            </View>
        );
    };

    const renderWeeklyView = () => {
        return (
            <View style={styles.weeklyView}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.timeTable}>
                        {/* Header with days */}
                        <View style={styles.tableHeader}>
                            <View style={styles.timeHeader}>
                                <Text variant="caption" color="secondary">Waktu</Text>
                            </View>
                            {days.slice(1).map((day, index) => (
                                <View key={index} style={styles.dayHeader}>
                                    <Text variant="caption" color="secondary">{day}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Time slots */}
                        {timeSlots.map((time) => (
                            <View key={time} style={styles.timeRow}>
                                <View style={styles.timeCell}>
                                    <Text variant="caption" color="secondary">{time}</Text>
                                </View>

                                {[1, 2, 3, 4, 5, 6].map((dayIndex) => {
                                    const schedule = getScheduleForTime(time, dayIndex);

                                    return (
                                        <View key={`${dayIndex}-${time}`} style={styles.scheduleCell}>
                                            {schedule ? (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.scheduleBlock,
                                                        { backgroundColor: getAvailabilityColor(schedule.currentStudents, schedule.maxStudents) }
                                                    ]}
                                                    onPress={() => setSelectedMentor(schedule.mentorId)}
                                                >
                                                    <Text variant="caption" color="inverse" numberOfLines={1}>
                                                        {getMentorById(schedule.mentorId)?.name?.split(' ')[1] || 'Mentor'}
                                                    </Text>
                                                    <Text variant="caption" color="inverse" numberOfLines={1}>
                                                        {schedule.subject}
                                                    </Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <View style={styles.emptyCell} />
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="h4" color="primary" weight="semibold">
                    Penjadwalan Mentor
                </Text>
                <Text variant="body2" color="secondary">
                    Pilih jadwal belajar dengan mentor terbaik
                </Text>
            </View>

            {/* View Mode Toggle */}
            <Card style={styles.modeToggle}>
                <View style={styles.toggleHeader}>
                    <Text variant="body1" weight="medium" color="primary">
                        Tampilan
                    </Text>
                    <View style={styles.toggleButtons}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                viewMode === 'daily' && styles.toggleButtonActive
                            ]}
                            onPress={() => setViewMode('daily')}
                        >
                            <Text
                                variant="caption"
                                color={viewMode === 'daily' ? 'inverse' : 'secondary'}
                            >
                                Harian
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                viewMode === 'weekly' && styles.toggleButtonActive
                            ]}
                            onPress={() => setViewMode('weekly')}
                        >
                            <Text
                                variant="caption"
                                color={viewMode === 'weekly' ? 'inverse' : 'secondary'}
                            >
                                Mingguan
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>

            {/* Available Mentors */}
            <View style={styles.mentorsSection}>
                <Text variant="h6" color="primary" weight="medium" style={styles.sectionTitle}>
                    Mentor Tersedia ({mockMentors.length})
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mentorsScroll}>
                    {mockMentors.map((mentor) => (
                        <Card
                            key={mentor.id}
                            style={styles.mentorCard}
                            onPress={() => setSelectedMentor(mentor.id)}
                        >
                            <Text variant="h4" style={styles.mentorAvatar}>
                                {mentor.avatar}
                            </Text>
                            <Text variant="body2" weight="medium" color="primary" style={styles.mentorName}>
                                {mentor.name}
                            </Text>
                            <Text variant="caption" color="secondary">
                                ⭐ {mentor.rating}
                            </Text>
                            <View style={styles.expertiseContainer}>
                                {mentor.expertise.slice(0, 2).map((skill) => (
                                    <View key={skill} style={styles.expertiseBadge}>
                                        <Text variant="caption" color="inverse">
                                            {skill}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            </View>

            {/* Schedule View */}
            <View style={styles.scheduleSection}>
                {viewMode === 'daily' ? renderDailyView() : renderWeeklyView()}
            </View>

            {/* Booking Stats */}
            <Card style={styles.statsCard}>
                <Text variant="h6" weight="medium" color="primary" style={styles.statsTitle}>
                    Statistik Pemesanan
                </Text>

                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text variant="h5" color="primary" weight="bold">
                            {mockSchedules.length}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Total Jadwal
                        </Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text variant="h5" color="success" weight="bold">
                            {mockSchedules.reduce((sum, s) => sum + s.currentStudents, 0)}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Siswa Terjadwal
                        </Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text variant="h5" color="warning" weight="bold">
                            {mockSchedules.filter(s => s.currentStudents >= s.maxStudents * 0.8).length}
                        </Text>
                        <Text variant="caption" color="secondary">
                            Hampir Penuh
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
    toggleButtons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    toggleButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.background.tertiary,
    },
    toggleButtonActive: {
        backgroundColor: theme.colors.primary[500],
    },
    mentorsSection: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    sectionTitle: {
        marginBottom: theme.spacing.md,
    },
    mentorsScroll: {
        maxHeight: 120,
    },
    mentorCard: {
        width: 120,
        marginRight: theme.spacing.md,
        alignItems: 'center',
    },
    mentorAvatar: {
        marginBottom: theme.spacing.sm,
    },
    mentorName: {
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    expertiseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: theme.spacing.xs,
    },
    expertiseBadge: {
        backgroundColor: theme.colors.secondary[500],
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        margin: theme.spacing.xs / 2,
    },
    scheduleSection: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    dailyView: {
        marginBottom: theme.spacing.md,
    },
    dateHeader: {
        marginBottom: theme.spacing.md,
    },
    emptySchedule: {
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        textAlign: 'center',
    },
    scheduleCard: {
        marginBottom: theme.spacing.md,
    },
    scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    mentorInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    mentorDetails: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    ratingContainer: {
        alignItems: 'flex-end',
    },
    scheduleDetails: {
        marginBottom: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xs,
    },
    capacityBar: {
        height: 4,
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.xs,
    },
    capacityFill: {
        height: '100%',
        borderRadius: theme.borderRadius.sm,
    },
    scheduleActions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    weeklyView: {
        marginBottom: theme.spacing.md,
    },
    timeTable: {
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    timeHeader: {
        width: 60,
        marginRight: theme.spacing.sm,
    },
    dayHeader: {
        width: 100,
        alignItems: 'center',
        marginRight: theme.spacing.sm,
    },
    timeRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },
    timeCell: {
        width: 60,
        marginRight: theme.spacing.sm,
        justifyContent: 'center',
    },
    scheduleCell: {
        width: 100,
        marginRight: theme.spacing.sm,
    },
    scheduleBlock: {
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
    },
    emptyCell: {
        height: 40,
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