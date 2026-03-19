import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export type Time = bigint;
export interface CommunityRequest {
    id: bigint;
    status: RequestStatus;
    message: string;
    timestamp: bigint;
    requesterName: string;
}
export interface Stats {
    activePlans: bigint;
    pendingRequests: bigint;
    pageVisits: bigint;
    totalRequests: bigint;
}
export interface MCPlan {
    id: string;
    features: Array<string>;
    name: string;
    description: string;
    isActive: boolean;
    price: string;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export enum RequestStatus {
    pending = "pending",
    done = "done",
    seen = "seen"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrUpdatePlan(id: string, name: string, description: string, price: string, features: Array<string>, isActive: boolean): Promise<void>;
    deletePlan(id: string): Promise<void>;
    generateInviteCode(): Promise<string>;
    getActivePlans(): Promise<Array<MCPlan>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getAllRequests(): Promise<Array<CommunityRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getPageVisits(): Promise<bigint>;
    getStats(): Promise<Stats>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    incrementVisits(): Promise<void>;
    initDefaultPlans(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    submitRequest(name: string, message: string): Promise<void>;
    updateRequestStatus(id: bigint, status: RequestStatus): Promise<void>;
}
