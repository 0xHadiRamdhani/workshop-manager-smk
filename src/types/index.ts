// Core Types for Workshop Manager App

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'mentor' | 'admin';
    avatar?: string;
    specialization?: string;
    phone: string;
    createdAt: Date;
}

export interface Student extends User {
    role: 'student';
    studentId: string;
    class: string;
    semester: number;
    skills: Skill[];
    projects: Project[];
    attendance: Attendance[];
}

export interface Mentor extends User {
    role: 'mentor';
    mentorId: string;
    expertise: string[];
    schedule: Schedule[];
    students: string[]; // student IDs
    rating: number;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    description: string;
    curriculumCode: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    type: 'individual' | 'group';
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    startDate: Date;
    endDate: Date;
    students: string[];
    mentorId: string;
    vehicleId?: string;
    tasks: Task[];
    scrumBoard: ScrumBoard;
    grade?: number;
    feedback?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    assignee: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
    estimatedHours: number;
    actualHours?: number;
}

export interface ScrumBoard {
    id: string;
    sprints: Sprint[];
    currentSprint: number;
}

export interface Sprint {
    id: string;
    name: string;
    duration: number; // days
    startDate: Date;
    endDate: Date;
    goals: string[];
    tasks: Task[];
    retrospective?: string;
}

export interface Vehicle {
    id: string;
    licensePlate: string;
    brand: string;
    model: string;
    year: number;
    owner: string;
    contact: string;
    serviceHistory: ServiceRecord[];
    currentIssues: Issue[];
    qrCode: string;
}

export interface ServiceRecord {
    id: string;
    date: Date;
    description: string;
    issues: Issue[];
    partsUsed: PartUsage[];
    laborHours: number;
    totalCost: number;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    assignedStudents: string[];
    mentorId: string;
}

export interface Issue {
    id: string;
    description: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in-progress' | 'resolved';
    diagnosis?: string;
    solution?: string;
    estimatedTime?: number;
}

export interface Part {
    id: string;
    name: string;
    partNumber: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    minStock: number;
    location: string;
    supplier: string;
    image?: string;
}

export interface PartUsage {
    partId: string;
    quantity: number;
    unitPrice: number;
}

export interface Schedule {
    id: string;
    mentorId: string;
    day: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    maxStudents: number;
    currentStudents: number;
}

export interface Attendance {
    id: string;
    studentId: string;
    date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
    checkInTime?: Date;
    checkOutTime?: Date;
    qrCode: string;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    createdAt: Date;
    data?: any;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: Date;
    type: 'text' | 'image' | 'video' | 'file';
    read: boolean;
}

export interface VideoCall {
    id: string;
    callerId: string;
    receiverId: string;
    status: 'calling' | 'answered' | 'ended' | 'missed';
    startTime?: Date;
    endTime?: Date;
    duration?: number;
}

export interface Curriculum {
    id: string;
    name: string;
    code: string;
    description: string;
    competencies: Competency[];
    duration: number; // weeks
    level: '1' | '2' | '3' | '4';
}

export interface Competency {
    id: string;
    code: string;
    name: string;
    description: string;
    indicators: string[];
    assessmentCriteria: string[];
}

export interface Assessment {
    id: string;
    studentId: string;
    competencyId: string;
    projectId: string;
    score: number;
    maxScore: number;
    criteria: AssessmentCriteria[];
    feedback: string;
    assessedBy: string;
    date: Date;
}

export interface AssessmentCriteria {
    criterion: string;
    score: number;
    maxScore: number;
    feedback?: string;
}

export interface Report {
    id: string;
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    title: string;
    date: string;
    status: 'draft' | 'approved' | 'rejected';
    data: {
        totalStudents: number;
        activeProjects: number;
        completedServices: number;
        inventoryAlerts: number;
        mentorSessions: number;
    };
    summary: {
        performance: string;
        issues: string[];
        recommendations: string[];
    };
}

export interface Analytics {
    totalStudents: number;
    activeProjects: number;
    completionRate: number;
    averageScore: number;
    attendanceRate: number;
    inventoryAlerts: number;
    pendingServices: number;
}

export interface InventoryAlert {
    id: string;
    partId: string;
    type: 'low-stock' | 'expired' | 'damaged';
    message: string;
    severity: 'low' | 'medium' | 'high';
    createdAt: Date;
    resolved: boolean;
}