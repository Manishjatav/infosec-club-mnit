import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    title: string;
    content: string;
    published: boolean;
    tags: Array<string>;
    publishedAt: Time;
    author: string;
    imageUrl?: string;
}
export interface ContactMessage {
    subject: string;
    name: string;
    read: boolean;
    email: string;
    message: string;
}
export type Time = bigint;
export interface Event {
    title: string;
    date: Time;
    description: string;
    imageUrl?: string;
    registrationOpen: boolean;
    location: string;
    eventType: string;
}
export interface TeamMember {
    bio: string;
    sortOrder: bigint;
    name: string;
    role: string;
    githubUrl?: string;
    imageUrl?: string;
    linkedinUrl?: string;
}
export interface EventRegistration {
    eventId: string;
    branch: string;
    name: string;
    year: bigint;
    email: string;
}
export interface GalleryItem {
    imageUrl?: string;
    caption: string;
    blobId?: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(item: GalleryItem): Promise<void>;
    addTeamMember(member: TeamMember): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(post: BlogPost): Promise<void>;
    createEvent(event: Event): Promise<void>;
    deleteBlogPost(id: string): Promise<void>;
    deleteEvent(id: string): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllRegistrations(): Promise<Array<EventRegistration>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEvents(): Promise<Array<Event>>;
    getGallery(): Promise<Array<GalleryItem>>;
    getPublishedBlogPosts(): Promise<Array<BlogPost>>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markMessageRead(id: string): Promise<void>;
    registerForEvent(reg: EventRegistration): Promise<void>;
    removeGalleryItem(id: string): Promise<void>;
    removeTeamMember(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(message: ContactMessage): Promise<void>;
    updateBlogPost(id: string, post: BlogPost): Promise<void>;
    updateEvent(id: string, event: Event): Promise<void>;
    updateTeamMember(id: string, member: TeamMember): Promise<void>;
}
