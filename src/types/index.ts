// src/types/index.ts

export interface EventDetails {
    title: string;
    date: string;
    venue: string;
    theme: string;
    description: string;
}

export interface Organizer {
    name: string;
    role: string;
    contact: string;
}

export interface Audience {
    demographics: string[];
    interests: string[];
}

export interface ProgrammeItem {
    time: string;
    activity: string;
    speaker?: string;
}

export interface RegistrationFormData {
    name: string;
    email: string;
    phone: string;
    organization?: string;
    interests: string[];
}

export interface CountdownProps {
    targetDate: Date;
}