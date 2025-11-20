import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useStore } from '@/src/store';
import { Task } from '@/src/types';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function ScrumScreen() {
    const {
        projects,
        currentUser,
        students,
        mentors,
        addProject,
        updateProject
    } = useStore();

    const [selectedProject, setSelectedProject] = useState<string>('');
    const [activeSprint, setActiveSprint] = useState<number>(0);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');

    const currentProject = projects.find((p: any) => p.id === selectedProject);

    const getTaskStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return '#9E9E9E';
            case 'in-progress': return '#2196F3';
            case 'review': return '#FF9800';
            case 'done': return '#4CAF50';
            default: return '#9E9E9E';
        }
    };

    const getTaskStatusText = (status: string) => {
        switch (status) {
            case 'todo': return 'Belum Mulai';
            case 'in-progress': return 'Sedang Dikerjakan';
            case 'review': return 'Review';
            case 'done': return 'Selesai';
            default: return status;
        }
    };

    const handleCreateTask = () => {
        if (!newTaskTitle.trim() || !selectedProject || !newTaskAssignee) {
            Alert.alert('Error', 'Isi semua field yang diperlukan');
            return;
        }

        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            description: newTaskDescription,
            status: 'todo',
            assignee: newTaskAssignee,
            priority: 'medium',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            estimatedHours: 4,
        };

        if (currentProject) {
            const updatedProject = {
                ...currentProject,
                tasks: [...currentProject.tasks, newTask],
            };
            updateProject(selectedProject, updatedProject);
        }

        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskAssignee('');
        setShowTaskForm(false);
        Alert.alert('Sukses', 'Task berhasil dibuat!');
    };

    const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
        if (!currentProject) return;

        const updatedTasks = currentProject.tasks.map((task: Task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );

        updateProject(selectedProject, { tasks: updatedTasks });
    };

    const getSprintProgress = (sprint: any) => {
        if (!sprint.tasks.length) return 0;
        const completedTasks = sprint.tasks.filter((t: any) => t.status === 'done').length;
        return Math.round((completedTasks / sprint.tasks.length) * 100);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Manajemen Proyek Scrum</Text>
                <Text style={styles.subtitle}>
                    Kelola proyek dengan metodologi Scrum
                </Text>

                {/* Project Selection */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Pilih Proyek</Text>
                    <View style={styles.projectList}>
                        {projects.map((project: any) => (
                            <Button
                                key={project.id}
                                title={project.title}
                                variant={selectedProject === project.id ? 'primary' : 'outline'}
                                size="sm"
                                onPress={() => setSelectedProject(project.id)}
                                style={styles.projectButton}
                            />
                        ))}
                    </View>
                </Card>

                {/* Sprint Overview */}
                {currentProject && (
                    <>
                        <Card style={styles.card}>
                            <Text style={styles.cardTitle}>Sprint Aktif</Text>
                            <View style={styles.sprintHeader}>
                                <Text style={styles.sprintName}>
                                    {currentProject.scrumBoard.sprints[activeSprint]?.name || 'Tidak ada sprint aktif'}
                                </Text>
                                <Text style={styles.sprintProgress}>
                                    Progress: {getSprintProgress(currentProject.scrumBoard.sprints[activeSprint])}%
                                </Text>
                            </View>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${getSprintProgress(currentProject.scrumBoard.sprints[activeSprint])}%` }
                                    ]}
                                />
                            </View>
                        </Card>

                        {/* Scrum Board */}
                        <Card style={styles.card}>
                            <Text style={styles.cardTitle}>Scrum Board</Text>
                            <View style={styles.boardColumns}>
                                {(['todo', 'in-progress', 'review', 'done'] as Task['status'][]).map((status) => (
                                    <View key={status} style={styles.column}>
                                        <Text style={styles.columnTitle}>{getTaskStatusText(status)}</Text>
                                        <View style={styles.taskList}>
                                            {currentProject.tasks
                                                .filter((task: Task) => task.status === status)
                                                .map((task: Task) => (
                                                    <View key={task.id} style={styles.taskCard}>
                                                        <Text style={styles.taskTitle}>{task.title}</Text>
                                                        <Text style={styles.taskAssignee}>
                                                            {students.find((s: any) => s.id === task.assignee)?.name || task.assignee}
                                                        </Text>
                                                        <View style={styles.taskActions}>
                                                            {status !== 'done' && (
                                                                <Button
                                                                    title="→"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onPress={() => handleUpdateTaskStatus(task.id, getNextStatus(status))}
                                                                />
                                                            )}
                                                        </View>
                                                    </View>
                                                ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </Card>

                        {/* Create Task */}
                        <Card style={styles.card}>
                            <Text style={styles.cardTitle}>Buat Task Baru</Text>
                            {!showTaskForm ? (
                                <Button
                                    title="+ Tambah Task"
                                    variant="primary"
                                    onPress={() => setShowTaskForm(true)}
                                />
                            ) : (
                                <View style={styles.taskForm}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Judul Task"
                                        value={newTaskTitle}
                                        onChangeText={setNewTaskTitle}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Deskripsi Task"
                                        value={newTaskDescription}
                                        onChangeText={setNewTaskDescription}
                                        multiline
                                    />
                                    <View style={styles.assigneeSelect}>
                                        <Text style={styles.label}>Assignee:</Text>
                                        <View style={styles.studentList}>
                                            {students.map((student: any) => (
                                                <Button
                                                    key={student.id}
                                                    title={student.name}
                                                    variant={newTaskAssignee === student.id ? 'primary' : 'outline'}
                                                    size="sm"
                                                    onPress={() => setNewTaskAssignee(student.id)}
                                                    style={styles.studentButton}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <View style={styles.formActions}>
                                        <Button
                                            title="Batal"
                                            variant="outline"
                                            onPress={() => setShowTaskForm(false)}
                                            style={styles.cancelButton}
                                        />
                                        <Button
                                            title="Buat Task"
                                            variant="primary"
                                            onPress={handleCreateTask}
                                            style={styles.createButton}
                                        />
                                    </View>
                                </View>
                            )}
                        </Card>

                        {/* Sprint Retrospective */}
                        <Card style={styles.card}>
                            <Text style={styles.cardTitle}>Retrospective Sprint</Text>
                            <Text style={styles.retroText}>
                                Apa yang berjalan baik: Tim berkolaborasi dengan baik, komunikasi lancar
                            </Text>
                            <Text style={styles.retroText}>
                                Apa yang perlu diperbaiki: Estimasi waktu task perlu lebih akurat
                            </Text>
                            <Text style={styles.retroText}>
                                Tindakan berikutnya: Gunakan story points untuk estimasi
                            </Text>
                            <Button
                                title="Tambah Catatan"
                                variant="outline"
                                style={styles.retroButton}
                            />
                        </Card>
                    </>
                )}

                {/* Project Stats */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Statistik Proyek</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{projects.length}</Text>
                            <Text style={styles.statLabel}>Total Proyek</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {projects.reduce((acc: number, p: any) => acc + p.tasks.length, 0)}
                            </Text>
                            <Text style={styles.statLabel}>Total Task</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {projects.filter((p: any) => p.status === 'completed').length}
                            </Text>
                            <Text style={styles.statLabel}>Proyek Selesai</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {Math.round(
                                    projects.reduce((acc: number, p: any) => {
                                        const completed = p.tasks.filter((t: any) => t.status === 'done').length;
                                        return acc + (p.tasks.length > 0 ? (completed / p.tasks.length) * 100 : 0);
                                    }, 0) / projects.length
                                )}%
                            </Text>
                            <Text style={styles.statLabel}>Progress Rata-rata</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
}

// Helper function
const getNextStatus = (currentStatus: Task['status']): Task['status'] => {
    switch (currentStatus) {
        case 'todo': return 'in-progress';
        case 'in-progress': return 'review';
        case 'review': return 'done';
        default: return currentStatus;
    }
};

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
    projectList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    projectButton: {
        marginRight: 8,
        marginBottom: 8,
    },
    sprintHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sprintName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    sprintProgress: {
        fontSize: 14,
        color: '#666',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    boardColumns: {
        flexDirection: 'row',
        gap: 12,
    },
    column: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
    },
    columnTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    taskList: {
        gap: 8,
    },
    taskCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    taskAssignee: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    taskForm: {
        gap: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
    },
    assigneeSelect: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    studentList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    studentButton: {
        marginRight: 8,
        marginBottom: 8,
    },
    formActions: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
    },
    createButton: {
        flex: 1,
    },
    retroText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    retroButton: {
        marginTop: 12,
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