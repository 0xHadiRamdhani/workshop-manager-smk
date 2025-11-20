import { create } from 'zustand';
import {
    Analytics,
    Assessment,
    Attendance,
    ChatMessage,
    InventoryAlert,
    Mentor,
    Notification,
    Part,
    Project,
    Report,
    Schedule,
    Student,
    User,
    Vehicle
} from '../types';

interface AppState {
    // User Management
    currentUser: User | null;
    students: Student[];
    mentors: Mentor[];

    // Project & Service Management
    projects: Project[];
    vehicles: Vehicle[];
    services: any[];

    // Inventory Management
    parts: Part[];
    inventoryAlerts: InventoryAlert[];

    // Scheduling & Attendance
    schedules: Schedule[];
    attendance: Attendance[];

    // Communication
    notifications: Notification[];
    chatMessages: ChatMessage[];

    // Assessment & Analytics
    assessments: Assessment[];
    analytics: Analytics | null;
    reports: Report[];

    // UI State
    loading: boolean;
    error: string | null;
    activeTab: string;

    // Actions
    setCurrentUser: (user: User | null) => void;
    setStudents: (students: Student[]) => void;
    setMentors: (mentors: Mentor[]) => void;
    setProjects: (projects: Project[]) => void;
    setVehicles: (vehicles: Vehicle[]) => void;
    setParts: (parts: Part[]) => void;
    setSchedules: (schedules: Schedule[]) => void;
    setAttendance: (attendance: Attendance[]) => void;
    setNotifications: (notifications: Notification[]) => void;
    setChatMessages: (messages: ChatMessage[]) => void;
    setAssessments: (assessments: Assessment[]) => void;
    setAnalytics: (analytics: Analytics) => void;
    setReports: (reports: Report[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setActiveTab: (tab: string) => void;

    // CRUD Operations
    addProject: (project: Project) => void;
    updateProject: (projectId: string, updates: Partial<Project>) => void;
    deleteProject: (projectId: string) => void;

    addVehicle: (vehicle: Vehicle) => void;
    updateVehicle: (vehicleId: string, updates: Partial<Vehicle>) => void;

    addPart: (part: Part) => void;
    updatePart: (partId: string, updates: Partial<Part>) => void;
    deletePart: (partId: string) => void;

    addNotification: (notification: Notification) => void;
    markNotificationRead: (notificationId: string) => void;

    addChatMessage: (message: ChatMessage) => void;
    addAttendance: (attendance: Attendance) => void;
    addAssessment: (assessment: Assessment) => void;
    addReport: (report: Report) => void;

    // Inventory Management
    addInventoryAlert: (alert: InventoryAlert) => void;
    resolveInventoryAlert: (alertId: string) => void;

    // Service Management
    updateServiceStatus: (serviceId: string, status: string) => void;
}

export const useStore = create<AppState>((set: any, get: any) => ({
    // Initial State
    currentUser: null,
    students: [],
    mentors: [],
    projects: [],
    vehicles: [],
    services: [],
    parts: [],
    inventoryAlerts: [],
    schedules: [],
    attendance: [],
    notifications: [],
    chatMessages: [],
    assessments: [],
    analytics: null,
    reports: [],
    loading: false,
    error: null,
    activeTab: 'dashboard',

    // Actions
    setCurrentUser: (user: User | null) => set({ currentUser: user }),
    setStudents: (students: Student[]) => set({ students }),
    setMentors: (mentors: Mentor[]) => set({ mentors }),
    setProjects: (projects: Project[]) => set({ projects }),
    setVehicles: (vehicles: Vehicle[]) => set({ vehicles }),
    setParts: (parts: Part[]) => set({ parts }),
    setSchedules: (schedules: Schedule[]) => set({ schedules }),
    setAttendance: (attendance: Attendance[]) => set({ attendance }),
    setNotifications: (notifications: Notification[]) => set({ notifications }),
    setChatMessages: (messages: ChatMessage[]) => set({ chatMessages: messages }),
    setAssessments: (assessments: Assessment[]) => set({ assessments }),
    setAnalytics: (analytics: Analytics) => set({ analytics }),
    setReports: (reports: Report[]) => set({ reports }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setActiveTab: (tab: string) => set({ activeTab: tab }),

    // CRUD Operations
    addProject: (project: Project) => set((state: AppState) => ({
        projects: [...state.projects, project]
    })),

    updateProject: (projectId: string, updates: Partial<Project>) => set((state: AppState) => ({
        projects: state.projects.map(p =>
            p.id === projectId ? { ...p, ...updates } : p
        )
    })),

    deleteProject: (projectId: string) => set((state: AppState) => ({
        projects: state.projects.filter(p => p.id !== projectId)
    })),

    addVehicle: (vehicle: Vehicle) => set((state: AppState) => ({
        vehicles: [...state.vehicles, vehicle]
    })),

    updateVehicle: (vehicleId: string, updates: Partial<Vehicle>) => set((state: AppState) => ({
        vehicles: state.vehicles.map(v =>
            v.id === vehicleId ? { ...v, ...updates } : v
        )
    })),

    addPart: (part: Part) => set((state: AppState) => ({
        parts: [...state.parts, part]
    })),

    updatePart: (partId: string, updates: Partial<Part>) => set((state: AppState) => ({
        parts: state.parts.map(p =>
            p.id === partId ? { ...p, ...updates } : p
        )
    })),

    deletePart: (partId: string) => set((state: AppState) => ({
        parts: state.parts.filter(p => p.id !== partId)
    })),

    addNotification: (notification: Notification) => set((state: AppState) => ({
        notifications: [notification, ...state.notifications]
    })),

    markNotificationRead: (notificationId: string) => set((state: AppState) => ({
        notifications: state.notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        )
    })),

    addChatMessage: (message: ChatMessage) => set((state: AppState) => ({
        chatMessages: [...state.chatMessages, message]
    })),

    addAttendance: (attendance: Attendance) => set((state: AppState) => ({
        attendance: [...state.attendance, attendance]
    })),

    addAssessment: (assessment: Assessment) => set((state: AppState) => ({
        assessments: [...state.assessments, assessment]
    })),

    addReport: (report: Report) => set((state: AppState) => ({
        reports: [report, ...state.reports]
    })),

    // Inventory Management
    addInventoryAlert: (alert: InventoryAlert) => set((state: AppState) => ({
        inventoryAlerts: [alert, ...state.inventoryAlerts]
    })),

    resolveInventoryAlert: (alertId: string) => set((state: AppState) => ({
        inventoryAlerts: state.inventoryAlerts.map(alert =>
            alert.id === alertId ? { ...alert, resolved: true } : alert
        )
    })),

    // Service Management
    updateServiceStatus: (serviceId: string, status: string) => set((state: AppState) => ({
        services: state.services.map(s =>
            s.id === serviceId ? { ...s, status } : s
        )
    }))
}));