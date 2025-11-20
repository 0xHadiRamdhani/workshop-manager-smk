import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useStore } from '@/src/store';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function CollaborationScreen() {
    const {
        chatMessages,
        addChatMessage,
        currentUser,
        mentors,
        students,
        notifications
    } = useStore();

    const [selectedUser, setSelectedUser] = useState<string>('');
    const [messageText, setMessageText] = useState('');
    const [isVideoCallActive, setIsVideoCallActive] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'video'>('chat');

    const users = currentUser?.role === 'student'
        ? mentors.map((m: any) => ({ id: m.id, name: m.name, role: 'Mentor' }))
        : students.map((s: any) => ({ id: s.id, name: s.name, role: 'Student' }));

    const handleSendMessage = () => {
        if (!messageText.trim() || !selectedUser) return;

        const newMessage = {
            id: Date.now().toString(),
            senderId: currentUser?.id || 'user-1',
            receiverId: selectedUser,
            message: messageText,
            timestamp: new Date().toISOString(),
            type: 'text',
            read: false,
        };

        addChatMessage(newMessage);
        setMessageText('');
    };

    const handleStartVideoCall = () => {
        if (!selectedUser) {
            Alert.alert('Pilih User', 'Pilih user untuk memulai video call');
            return;
        }

        setIsVideoCallActive(true);
        Alert.alert('Video Call', `Memulai video call dengan ${users.find((u: any) => u.id === selectedUser)?.name}`);
    };

    const handleEndVideoCall = () => {
        setIsVideoCallActive(false);
    };

    const getMessagesForSelectedUser = () => {
        return chatMessages.filter(
            (msg: any) =>
                (msg.senderId === currentUser?.id && msg.receiverId === selectedUser) ||
                (msg.senderId === selectedUser && msg.receiverId === currentUser?.id)
        ).sort((a: any, b: any) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Kolaborasi Siswa-Mentor</Text>
                <Text style={styles.subtitle}>
                    Chat dan Video Call untuk komunikasi
                </Text>

                {/* User Selection */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Pilih User</Text>
                    <View style={styles.userList}>
                        {users.map((user: any) => (
                            <Button
                                key={user.id}
                                title={user.name}
                                variant={selectedUser === user.id ? 'primary' : 'outline'}
                                size="sm"
                                onPress={() => setSelectedUser(user.id)}
                                style={styles.userButton}
                            />
                        ))}
                    </View>
                </Card>

                {/* Tab Selection */}
                <Card style={styles.card}>
                    <View style={styles.tabContainer}>
                        <Button
                            title="💬 Chat"
                            variant={activeTab === 'chat' ? 'primary' : 'outline'}
                            onPress={() => setActiveTab('chat')}
                            style={styles.tabButton}
                        />
                        <Button
                            title="📹 Video"
                            variant={activeTab === 'video' ? 'primary' : 'outline'}
                            onPress={() => setActiveTab('video')}
                            style={styles.tabButton}
                        />
                    </View>
                </Card>

                {/* Chat Interface */}
                {activeTab === 'chat' && (
                    <>
                        <Card style={styles.card}>
                            <Text style={styles.cardTitle}>Chat</Text>
                            <View style={styles.chatContainer}>
                                {getMessagesForSelectedUser().length === 0 ? (
                                    <Text style={styles.emptyText}>Belum ada pesan</Text>
                                ) : (
                                    <View style={styles.messagesList}>
                                        {getMessagesForSelectedUser().map((msg: any) => (
                                            <View
                                                key={msg.id}
                                                style={[
                                                    styles.messageItem,
                                                    msg.senderId === currentUser?.id ? styles.sentMessage : styles.receivedMessage
                                                ]}
                                            >
                                                <Text style={styles.messageText}>{msg.message}</Text>
                                                <Text style={styles.messageTime}>
                                                    {new Date(msg.timestamp).toLocaleTimeString('id-ID')}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </Card>

                        {/* Message Input */}
                        <Card style={styles.card}>
                            <TextInput
                                style={styles.messageInput}
                                placeholder="Ketik pesan..."
                                value={messageText}
                                onChangeText={setMessageText}
                                multiline
                            />
                            <Button
                                title="Kirim Pesan"
                                variant="primary"
                                onPress={handleSendMessage}
                                disabled={!messageText.trim() || !selectedUser}
                                style={styles.sendButton}
                            />
                        </Card>
                    </>
                )}

                {/* Video Call Interface */}
                {activeTab === 'video' && (
                    <Card style={styles.card}>
                        <Text style={styles.cardTitle}>Video Call</Text>
                        {isVideoCallActive ? (
                            <View style={styles.videoContainer}>
                                <View style={styles.videoPlaceholder}>
                                    <Text style={styles.videoIcon}>📹</Text>
                                    <Text style={styles.videoText}>
                                        Video Call Aktif
                                    </Text>
                                    <Text style={styles.videoSubtext}>
                                        dengan {users.find((u: any) => u.id === selectedUser)?.name}
                                    </Text>
                                </View>
                                <Button
                                    title="Akhiri Call"
                                    variant="error"
                                    onPress={handleEndVideoCall}
                                    style={styles.endCallButton}
                                />
                            </View>
                        ) : (
                            <View style={styles.videoSetup}>
                                <View style={styles.videoPreview}>
                                    <Text style={styles.videoIcon}>📷</Text>
                                    <Text style={styles.videoPreviewText}>Kamera Siap</Text>
                                </View>
                                <Button
                                    title="Mulai Video Call"
                                    variant="primary"
                                    onPress={handleStartVideoCall}
                                    disabled={!selectedUser}
                                    style={styles.startCallButton}
                                />
                            </View>
                        )}
                    </Card>
                )}

                {/* Collaboration Stats */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Statistik Kolaborasi</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{chatMessages.length}</Text>
                            <Text style={styles.statLabel}>Total Pesan</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{users.length}</Text>
                            <Text style={styles.statLabel}>Kontak</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {notifications.filter((n: any) => n.type === 'chat').length}
                            </Text>
                            <Text style={styles.statLabel}>Notifikasi</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Video Call</Text>
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
    userList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    userButton: {
        marginRight: 8,
        marginBottom: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    tabButton: {
        flex: 1,
    },
    chatContainer: {
        minHeight: 200,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    messagesList: {
        gap: 8,
    },
    messageItem: {
        padding: 12,
        borderRadius: 8,
        maxWidth: '80%',
    },
    sentMessage: {
        backgroundColor: '#007bff',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 14,
        color: '#333',
    },
    messageTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    messageInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        minHeight: 80,
        fontSize: 14,
    },
    sendButton: {
        marginTop: 8,
    },
    videoContainer: {
        alignItems: 'center',
    },
    videoPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    videoIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    videoText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    videoSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    endCallButton: {
        marginTop: 8,
    },
    videoSetup: {
        alignItems: 'center',
    },
    videoPreview: {
        width: '100%',
        height: 150,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    videoPreviewText: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    startCallButton: {
        marginTop: 8,
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